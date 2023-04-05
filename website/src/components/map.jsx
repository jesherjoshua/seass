// import React from 'react'

// import 'leaflet/dist/leaflet.css';
// import {MapContainer, TileLayer} from 'react-leaflet';

// import styles from './maps.module.css';

// const Map = () => {
//   return (
//     <MapContainer className={styles.map} center={[52.505,-0.09]} zoom={1.5} scrollWheelZoom={true}>
//         <TileLayer 
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//     </MapContainer>
    
//   )
// }


// export default Map;

// import React from 'react';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import HeatmapLayer from 'react-leaflet-heatmap-layer';
// import styles from './maps.module.css';

// const Map = () => {
//   const data = [
//     [52.505, -0.09, 1], // latitude, longitude, intensity
//     [52.508, -0.11, 0.8],
//     [52.503, -0.1, 0.6],
//     [52.51, -0.12, 0.4],
//     [52.505, -0.11, 0.2],
//     [52.507, -0.1, 0.1],
//   ];

//   return (
//     <MapContainer className={styles.map} center={[52.505, -0.09]} zoom={1.5} scrollWheelZoom={true}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <HeatmapLayer points={data} />
//     </MapContainer>
//   );
// };

// export default Map;


// import React, { useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import {HeatmapLayer} from 'react-leaflet-heatmap-layer';
// import 'leaflet.heat';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import styles from './maps.module.css';

// const Map = () => {
//   const [heatmapData, setHeatmapData] = useState([]);
//   const API_URL = 'https://us-central1-augmented-axe-380213.cloudfunctions.net/seass_bigquery';

//   useEffect(() => {
//     // Fetch your heatmap data here
//     const fetchHeatmapData = async () => {
//       // const response = await fetch(`${API_URL}`);
//       // const data = await response.json();
//       const data = [
//         [51.5,-0.09],
//         [51.5,-0.1],
//         [51.5,-0.11],
//       ];
//       setHeatmapData(data);
//     };

//     fetchHeatmapData();
//   }, []);

//   return (
//     <MapContainer className={styles.map} center={[52.505,-0.09]} zoom={1.5} scrollWheelZoom={true}>
//       <TileLayer 
//         attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {heatmapData.length > 0 && (
//         <HeatmapLayer
//           points={heatmapData}
//           longitudeExtractor={(p) => p[1]}
//           latitudeExtractor={(p) => p[0]}
//           intensityExtractor={(p) => 1}
//           radius={20}
//           blur={15}
//           maxZoom={1}
//           minOpacity={0.5}
//         />
//       )}
//     </MapContainer>
//   );
// };

// export default Map;





// import React, { useEffect, useState } from 'react';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet.heat';
// import { MapContainer, TileLayer } from 'react-leaflet';
// import styles from './maps.module.css';

// const Map = () => {
//   const [map, setMap] = useState(null);

//   useEffect(() => {
//     const heatmapData = [      [51.505, -0.09],
//       [51.506, -0.10],
//       [51.507, -0.11],
//       [51.508, -0.12],
//       [51.509, -0.13],
//       [51.510, -0.14],
//       [51.511, -0.15],
//       [51.512, -0.16],
//       [51.513, -0.17],
//       [51.514, -0.18]
//     ];

//     const heatmapLayer = L.heatLayer(heatmapData, {
//       radius: 50,
//       blur: 50,
//       maxZoom: 18,
//       minOpacity: 1,
//     });

//     if (map) {
//       heatmapLayer.addTo(map);
//     }

//     return () => {
//       if (map) {
//         heatmapLayer.remove();
//       }
//     }
//   }, [map]);

//   const handleMapCreate = (map) => {
//     setMap(map);
//   };

//   return (
//     <MapContainer className={styles.map} center={[52.505,-0.09]} zoom={13} scrollWheelZoom={true} whenCreated={handleMapCreate}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//     </MapContainer>
//   );
// };

// export default Map;



import React, { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from './maps.module.css';

const Map = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const heatmapData = [
      [51.5, -0.09, 1],
      [51.5, -0.1, 0.5],
      [51.5, -0.11, 0.2],
    ];

    const heatmapLayer = L.heatLayer(heatmapData, {
      radius: 20,
      blur: 15,
      maxZoom: 18,
      minOpacity: 1,
      gradient: {
        0.4: 'blue',
        0.03: 'lime',
        1: 'red',
      },
    });

    if (map) {
      map.on('load', () => {
        heatmapLayer.addTo(map);
      })
    }

    return () => {
      if (map) {
        heatmapLayer.remove();
      }
    };
  }, [map]);

  const handleMapCreate = (map) => {
    setMap(map);
  };

  return (
    <MapContainer
      className={styles.map}
      center={[52.505, -0.09]}
      zoom={13}
      scrollWheelZoom={true}
      whenCreated={handleMapCreate}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;



