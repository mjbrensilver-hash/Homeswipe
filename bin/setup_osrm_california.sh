#!/usr/bin/env bash
# Setup script to run OSRM backend for California extracts (NorCal & SoCal).
# Usage: chmod +x bin/setup_osrm_california.sh && ./bin/setup_osrm_california.sh
# Requires Docker. Downloads PBFs and starts two OSRM routed containers on ports 5000 and 5001.

set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p data/osrm
cd data/osrm

# URLs (user provided)
NORCAL_URL="https://download.geofabrik.de/north-america/us/california/norcal-latest.osm.pbf"
SOCAL_URL="https://download.geofabrik.de/north-america/us/california/socal-latest.osm.pbf"

echo "Downloading PBFs (may be large)..."
if [ ! -f norcal-latest.osm.pbf ]; then
  curl -L -o norcal-latest.osm.pbf "$NORCAL_URL"
fi
if [ ! -f socal-latest.osm.pbf ]; then
  curl -L -o socal-latest.osm.pbf "$SOCAL_URL"
fi

# Prepare directories
mkdir -p norcal socal

# Extract & contract for NorCal
if [ ! -f norcal/norcal.osrm ]; then
  echo "Preparing NorCal OSRM dataset..."
  docker run --rm -v "$(pwd)/norcal":/data osrm/osrm-backend osrm-extract -p /opt/car.lua /data/../norcal-latest.osm.pbf
  docker run --rm -v "$(pwd)/norcal":/data osrm/osrm-backend osrm-contract /data/norcal-latest.osrm
  mv norcal-latest.osrm norcal/norcal.osrm || true
fi

# Extract & contract for SoCal
if [ ! -f socal/socal.osrm ]; then
  echo "Preparing SoCal OSRM dataset..."
  docker run --rm -v "$(pwd)/socal":/data osrm/osrm-backend osrm-extract -p /opt/car.lua /data/../socal-latest.osm.pbf
  docker run --rm -v "$(pwd)/socal":/data osrm/osrm-backend osrm-contract /data/socal-latest.osrm
  mv socal-latest.osrm socal/socal.osrm || true
fi

# Start OSRM routed servers
echo "Starting OSRM routed for NorCal on port 5000 and SoCal on port 5001"
# NorCal
docker run -d --name osrm-norcal -p 5000:5000 -v "$(pwd)/norcal":/data osrm/osrm-backend osrm-routed /data/norcal-latest.osrm
# SoCal
docker run -d --name osrm-socal -p 5001:5001 -v "$(pwd)/socal":/data osrm/osrm-backend osrm-routed /data/socal-latest.osrm

echo "OSRM containers started. Use http://localhost:5000 and http://localhost:5001 for routing queries."

echo "Note: If you prefer a single California dataset, consider downloading the full california-latest.osm.pbf and using that instead."
