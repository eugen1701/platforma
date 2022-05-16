import React from "react";
import {Wrapper, Status} from "@googlemaps/react-wrapper";
import {Map} from '../../utils/Map';
import {Marker} from "../../utils/Marker";

const render = (status: Status) => {
    return <h1>{status}</h1>;
};


export const MapComponent:React.FC = () => {

    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);
    const [zoom, setZoom] = React.useState(3); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({ lat: 0,
        lng: 0,
    });
    const onIdle = (m: google.maps.Map) => {
        console.log("onIdle");
        setZoom(m.getZoom()!);
        setCenter(m.getCenter()!.toJSON());
    };
    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    return (
        <Wrapper apiKey={process.env.GOOGLE_API_MAP_KEY!} render={render}>
            <Map
                center={center}
                onClick={onClick}
                onIdle={onIdle}
                zoom={zoom}
                style={{ flexGrow: "1", height: "100%" }}
            >
                {clicks.map((latLng, i) => (
                    <Marker key={i} position={latLng} />
                ))}
            </Map>
        </Wrapper>
    );
}