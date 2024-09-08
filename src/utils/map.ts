interface Vendor {
  longitude: number;
  latitude: number;
}

interface GeoJsonFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const filterGeoJson = (data: Vendor[]): GeoJsonFeature[] =>
  data.map((vendor) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [vendor.longitude, vendor.latitude],
    },
  }));
