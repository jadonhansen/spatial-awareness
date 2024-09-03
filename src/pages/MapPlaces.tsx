import React from "react";
import Map from "../components/Map";
import "../styles/basePage.scss";

export default function MapPlaces() {
	// TODO implement search UI, API call and state here

	return (
		<div className="page">
			<h1>MapPlaces</h1>

			<Map>
				<div>Search UI here</div>
			</Map>
		</div>
	);
}
