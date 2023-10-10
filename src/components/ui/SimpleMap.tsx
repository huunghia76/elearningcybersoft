import React from "react";
import  GoogleMapReact  from 'google-map-react';

interface AnyReactComponentProps {
  lat: number;
  lng: number;
  text: string;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => (
  <div>{text}</div>
);

export function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.8538211,
      lng: 106.6252535,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "500px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} // Đặt khóa API Google Maps ở đây
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent lat={10.8538211} lng={106.6252535} text="Hello, World!" />
      </GoogleMapReact>
    </div>
  );
}
