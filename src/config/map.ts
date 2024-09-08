import { MapBoxProps } from 'src/components/map';

export const mapboxBasicConfig: MapBoxProps = {
  mapboxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_API || '',
  minZoom: 1,
  scrollZoom: false,
};
