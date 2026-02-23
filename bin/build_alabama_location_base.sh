#!/usr/bin/env bash
# Download and prepare the Geofabrik Alabama shapefile and convert to GeoJSON
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p data/location/alabama
cd data/location/alabama

AL_URL="https://download.geofabrik.de/north-america/us/alabama-140101-free.shp.zip"
ZIPNAME="${AL_URL##*/}"

if [ ! -f "$ZIPNAME" ]; then
  echo "Downloading Alabama shapefile..."
  curl -L -o "$ZIPNAME" "$AL_URL"
fi

if [ ! -d "alabama-shp" ]; then
  mkdir -p alabama-shp
  echo "Extracting archive..."
  unzip -o "$ZIPNAME" -d alabama-shp
fi

# Find the first shapefile in the extracted folder
shp=$(find alabama-shp -maxdepth 2 -type f -iname '*.shp' | head -n1 || true)
if [ -z "$shp" ]; then
  echo "ERROR: No .shp file found in archive" >&2
  exit 1
fi

if ! command -v ogr2ogr >/dev/null 2>&1; then
  echo "ERROR: 'ogr2ogr' (GDAL) is required to convert shapefiles to GeoJSON." >&2
  echo "Install on Debian/Ubuntu: sudo apt update && sudo apt install -y gdal-bin" >&2
  echo "Alternatively run this script inside a container with GDAL available." >&2
  exit 2
fi

OUTFILE="alabama_buildings.geojson"
echo "Converting '$shp' -> '$OUTFILE' (GeoJSON)"
ogr2ogr -f GeoJSON "$OUTFILE" "$shp"

echo "Done. GeoJSON: $(pwd)/$OUTFILE"
echo "Note: adjust layer/filtering with ogr2ogr options if you only need building footprints or specific layers." 
