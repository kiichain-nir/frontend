'use client';

import React from 'react';
import { UUID } from 'crypto';
import { useParams } from 'next/navigation';

import { mapboxBasicConfig } from 'src/config/map';
import { useBeneficiariesGeoData } from 'src/services/reports';

import { THEMES, ClusterMap, StyledMapContainer } from '../maps';

const BeneficiaryClusterMap = () => {
  const { uuid } = useParams();
  const geoData = useBeneficiariesGeoData({
    projectId: uuid as UUID,
  });
  console.log('geoData', geoData);
  return (
    <div>
      {/* @ts-ignore */}
      <StyledMapContainer>
        <ClusterMap {...mapboxBasicConfig} mapStyle={THEMES.light} dataForMap={geoData.data} />
      </StyledMapContainer>
    </div>
  );
};

export default BeneficiaryClusterMap;
