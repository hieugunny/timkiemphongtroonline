import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';

const Map = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    mapStyle: "https://tiles.goong.io/assets/goong_map_dark.json",
  });
  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      goongApiAccessToken={'WQn7rvnLKagQXtXBUjGcnHwk2IkinldC4ezhWsD7'}
      className=''
    />
  );  
}
export default Map
