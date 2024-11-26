import { useRef } from 'react';
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';

import { LatLng } from 'leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

export const MapComponent = ({ geolocation }) => {
    const { lat, lng } = geolocation;
    const mapRef = useRef();
    const position = new LatLng(lat, lng);
    const icon = L.icon({
        iconUrl: '/marker-location.png',
        iconSize: [42, 42],
    });

    return (
        <MapContainer
            zoom={12}
            ref={mapRef}
            center={position}
            style={{ width: '100%', height: '40vh' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={icon}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
};
