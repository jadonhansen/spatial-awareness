import React, { useEffect, useState } from "react";
import GoogleMapReact, { fitBounds } from "google-map-react";
import { Place } from "../../types/types";
import Marker from "./Marker";
import "../../styles/map.scss";
import { getBoundsFromPlaces } from "../../helpers/helpers";

interface Props {
	places: Place[];
	markerClick?(place: Place): void;
	children?: React.ReactNode;
}

export default function Map({ children, places, markerClick }: Props) {
	const [mapPlaces, setMapPlaces] = useState<Place[]>([]);
	const [mapZoom, setMapZoom] = useState<number | undefined>();
	const [mapCenter, setMapCenter] = useState<GoogleMapReact.Coords | undefined>();

	useEffect(() => {
		if (places.length === 1) {
			setMapZoom(13);
			setMapCenter({ lat: places[0].coordinates.lat, lng: places[0].coordinates.lon });
		} else {
			setBounds(places);
		}

		setMapPlaces(places);
	}, [places]);

	const setBounds = (places: Place[]) => {
		const bounds = getBoundsFromPlaces(places);

		const size = {
			width: window.innerWidth, // Map width in pixels
			height: window.innerHeight, // Map height in pixels
		};

		const { center, zoom } = fitBounds(bounds, size);

		setMapZoom(zoom);
		setMapCenter(center);
	};

	const onMapChange = (mapValue: GoogleMapReact.ChangeEventValue) => {
		setMapCenter(mapValue.center);
		setMapZoom(mapValue.zoom);
	};

	return (
		<div id="google-map">
			<GoogleMapReact
				defaultCenter={{
					lat: 10.99835602,
					lng: 77.01502627,
				}}
				defaultZoom={3}
				bootstrapURLKeys={{ key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY }}
				center={mapCenter}
				zoom={mapZoom}
				yesIWantToUseGoogleMapApiInternals
				resetBoundsOnResize
				onChange={onMapChange}
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
