# Alabama shapefile (location base)

This repository includes a helper script to download the Geofabrik Alabama shapefile and convert it to GeoJSON for use as a location/building base.

Usage:

```bash
chmod +x bin/build_alabama_location_base.sh
./bin/build_alabama_location_base.sh
```

The script will download the archive, extract it to `data/location/alabama/alabama-shp/`, and convert the first .shp found to `data/location/alabama/alabama_buildings.geojson` using `ogr2ogr` (GDAL). Install GDAL on Debian/Ubuntu with `sudo apt update && sudo apt install -y gdal-bin` if needed.

Notes:
- The archive may contain multiple layers; you can refine the ogr2ogr command to select a specific layer or apply attribute filtering.
- The produced GeoJSON can be used by the app or further processed into tiles or a database.