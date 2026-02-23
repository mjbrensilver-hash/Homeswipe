#!/usr/bin/env bash
# Setup script to run OSRM backend for the entire USA.
# WARNING: The USA OSM extract is very large and requires substantial disk (tens of GB)
# and CPU/memory to process. Only run this if you have the resources.
# Usage: chmod +x bin/setup_osrm_usa.sh && ./bin/setup_osrm_usa.sh

set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p data/osrm-usa
cd data/osrm-usa

# Use user-provided North America / US PBF URL (can be extremely large)
# Default to the user's provided URL for a full North America extract; you can
# replace this with a smaller per-country/state extract if desired.
PBF_URL="https://download.geofabrik.de/north-america-latest.osm.pbf"
PBF_NAME="${PBF_URL##*/}"

if [ ! -f "$PBF_NAME" ]; then
  echo "Downloading PBF: $PBF_NAME (this can be many GB)..."
  curl -L -o "$PBF_NAME" "$PBF_URL"
fi

# Prepare working dir
mkdir -p work

# Extract & contract
# Extract & contract into the work directory. This may take many hours and
# require substantial RAM/disk. We keep filenames generic so you can reuse the
# script with different PBFs.
if [ ! -f work/osrm_dataset.osrm ]; then
  echo "Extracting and contracting OSRM dataset (this may take hours)..."
  docker run --rm -v "$(pwd)":/data osrm/osrm-backend osrm-extract -p /opt/car.lua /data/$PBF_NAME
  docker run --rm -v "$(pwd)":/data osrm/osrm-backend osrm-contract /data/${PBF_NAME%.osm.pbf}.osrm
  # Move contracted files to work/ with a stable basename
  mkdir -p work
  for f in ${PBF_NAME%.osm.pbf}.*; do
    mv -f "$f" work/ || true
  done
  # Ensure there is an .osrm file named 'osrm_dataset.osrm' pointing to the dataset
  if [ -f "work/${PBF_NAME%.osm.pbf}.osrm" ]; then
    mv -f "work/${PBF_NAME%.osm.pbf}.osrm" work/osrm_dataset.osrm || true
  fi
fi

# Start OSRM routed server on port 5000
echo "Starting OSRM routed for USA on port 5000"
docker run -d --name osrm-usa -p 5000:5000 -v "$(pwd)/work":/data osrm/osrm-backend osrm-routed /data/osrm_dataset.osrm

echo "OSRM USA container started. Use http://localhost:5000 for routing queries."

echo "Notes:"
echo "- Expect to require >50GB disk depending on extract and profile."
echo "- If you only need regional routing, prefer per-state extracts to reduce resource needs."
