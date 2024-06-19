import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../assets/leaflet/leaflet.css";
import L from "leaflet";

// Fix default icon issue in Leaflet when using Webpack
import markerIcon2x from "../../assets/leaflet/images/marker-icon-2x.png";
import markerIcon from "../../assets/leaflet/images/marker-icon.png";
import markerShadow from "../../assets/leaflet/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapComponent({ customMarkers }: any) {
  return (
    <MapContainer
      zoomControl={false}
      center={[10.8993923, 76.9029521]}
      zoom={13}
      className="w-full aspect-video rounded-lg"
    >
      <TileLayer
        url="http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
      />
      {customMarkers.map((m: any, idx: number) => (
        <Marker key={idx} position={m.location}>
          <Popup>{m.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
