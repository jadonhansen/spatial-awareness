import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { Place } from "../../types/types";
import Marker from "./Marker";
import "../../styles/map.scss";

interface Props {
	places: Place[];
	markerClick?(place: Place): void;
	children?: React.ReactNode;
}

export default function Map({ children, places, markerClick }: Props) {
	const [mapPlaces, setMapPlaces] = useState<Place[]>([]);
	const [mapZoom, setMapZoom] = useState<number>(3);
	const [mapCenter, setMapCenter] = useState<GoogleMapReact.Coords>({
		lat: 10.99835602,
		lng: 77.01502627,
	});

	useEffect(() => {
		if (places.length === 1) {
			setMapZoom(13);
			setMapCenter({ lat: places[0].coordinates.lat, lng: places[0].coordinates.lon });
		}
		setMapPlaces(places);
	}, [places]);
	return (
		<div id="google-map">
			<GoogleMapReact
				bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
				center={mapCenter}
				zoom={mapZoom}
				yesIWantToUseGoogleMapApiInternals
				resetBoundsOnResize
			>
				{mapPlaces.map((place: Place) => {
					return (
						<Marker
							key={`${String(place.coordinates.lat)}-${String(place.coordinates.lon)}`}
							markerClick={markerClick}
							lat={place.coordinates.lat}
							lng={place.coordinates.lon}
							place={place}
						/>
					);
				})}
			</GoogleMapReact>
			{children && <div>{children}</div>}
		</div>
	);
}
