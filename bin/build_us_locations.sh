#!/usr/bin/env bash
# Build a US locations JSON from a full North America PBF (Geofabrik)
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p data/locations
cd data/locations

PBF_URL="https://download.geofabrik.de/north-america-latest.osm.pbf"
PBFNAME="${PBF_URL##*/}"

if [ ! -f "$PBFNAME" ]; then
  echo "Downloading PBF (this is large; many GB)..."
  curl -L -o "$PBFNAME" "$PBF_URL"
fi

if ! command -v ogr2ogr >/dev/null 2>&1; then
  echo "ERROR: 'ogr2ogr' (GDAL) is required to extract places from the PBF." >&2
  echo "Install on Debian/Ubuntu: sudo apt update && sudo apt install -y gdal-bin" >&2
  exit 2
fi

echo "Extracting place points (city, town, village, hamlet) to GeoJSON..."
# Use OGR's OSM driver to read 'points' layer and filter by place tag
ogr2ogr -f GeoJSON places.geojson "$PBFNAME" points -where "place IN ('city','town','village','hamlet')"

echo "Converting places.geojson -> us_locations.json (name, state, lat, lon, population)"
if ! command -v python3 >/dev/null 2>&1; then
  echo "ERROR: python3 is required" >&2
  exit 3
fi

python3 ../../tools/geojson_to_locations.py places.geojson us_locations.json

echo "Done: data/locations/us_locations.json"
echo "Note: state inference is best-effort (addr:state / is_in tags). Review the output for completeness."
