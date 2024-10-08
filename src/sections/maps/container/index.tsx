import { FC } from 'react';
import styled from '@emotion/styled';

export const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

// @ts-ignore
export const StyledMapContainer: FC = styled('div')(() => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: 8,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// @ts-ignore
export const StyledMapWrapper: FC = styled.div`
  & .mapboxgl-ctrl-logo,
  .mapboxgl-ctrl-bottom-right {
    display: none;
  }
`;
