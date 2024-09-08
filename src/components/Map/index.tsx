import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Place } from "../../types/types";
import Marker from "./Marker";
import "../../styles/map.scss";

interface Props {
	places: Place[];
	children?: React.ReactNode;
}

export default function Map({ children, places }: Props) {
	const [mapZoom, setMapZoom] = useState<number>(3);
	const [mapCenter, setMapCenter] = useState<GoogleMapReact.Coords>({
		lat: 10.99835602,
		lng: 77.01502627,
	});

	return (
		<div id="google-map">
			<GoogleMapReact
				bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
				defaultCenter={mapCenter}
				defaultZoom={mapZoom}
				yesIWantToUseGoogleMapApiInternals
			>
				{places.map((place: Place, index: number) => {
					return <Marker key={index} lat={place.coordinates.lat} lng={place.coordinates.lon} place={place} />;
				})}
			</GoogleMapReact>
			{children && <div>{children}</div>}
		</div>
	);
}
