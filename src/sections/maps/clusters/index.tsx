'use client';

import { memo, useRef } from 'react';
import Map, {
  Layer,
  MapRef,
  Source,
  LngLatLike,
  GeoJSONSource,
  MapLayerMouseEvent,
} from 'react-map-gl';
// components
//
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

// ----------------------------------------------------------------------

function MapClusters({ dataForMap, ...other }: any) {
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];

    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource('earthquakes') as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (error, zoom) => {
      if (error) {
        return;
      }
      console.log('feature', feature);

      if (feature?.geometry.type === 'Point') {
        mapRef.current?.easeTo({
          center: feature?.geometry.coordinates as LngLatLike | undefined,
          zoom: zoom && Number.isNaN(zoom) ? zoom : undefined,
          duration: 500,
        });
      }
    });
  };

  return (
    <Map
      initialViewState={{
        latitude: 27.717245,
        longitude: 85.323959,
        zoom: 2,
      }}
      interactiveLayerIds={[clusterLayer.id || '']}
      onClick={onClick}
      ref={mapRef}
      {...other}
    >
      <Source
        id="earthquakes"
        type="geojson"
        data={dataForMap}
        cluster
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  );
}

export default memo(MapClusters);
