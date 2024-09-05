import React, { useEffect, useState } from "react";
import { pingServer, searchForPlace } from "../api/api";
import { Category, Place } from "../types/types";
import Map from "../components/Map";
import "../styles/mapPlaces.scss";

// TODO remove below
/* eslint @typescript-eslint/no-unused-vars: 0 */

export default function MapPlaces() {
	// component state
	const [testError, setTestError] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);
	const [mapReady, setMapReady] = useState(false);
	const [markers, setMarkers] = useState<Place[] | undefined>();
	// form state
	const [searchStr, setSearchStr] = useState<string | undefined>();
	const [category, setCategory] = useState<Category | undefined>();

	useEffect(() => {
		testServer();
	}, []);

	const testServer = async () => {
		const { error } = await pingServer();
		if (error) setTestError(true);
	};

	const searchBtnClick = () => {
		if (loading || !searchStr || searchStr?.trim().length <= 0 || !category) return;

		setLoading(true);
		search(searchStr, category);
	};

	const search = async (searchString: string, selectedCategory: Category) => {
		const { data, error } = await searchForPlace(searchString, 1, 1000, selectedCategory);

		if (error) setError("An error occurred, please try again.");
		else if (data.data.length > 0) mapPlacesToMarkers(data.data);
		else setError("No places found!");

		setLoading(false);
	};

	const mapPlacesToMarkers = (places: Place[]) => {
		// todo create marker interface
		setMarkers(places);
	};

	return (
		<div id="map-places-page" className="page">
			<h1>Find a Place</h1>

			<div className="search-section">
				<input type="text" placeholder="Name" onChange={(e) => setSearchStr(e.target.value.trim())} />
				<button onClick={searchBtnClick} disabled={testError || loading || !searchStr || searchStr?.trim().length <= 0}>
					Search
				</button>
			</div>

			{loading && <p className="loading">Loading places...</p>}
			{error && <p className="error-message">{error}</p>}

			<Map>
				<div>{testError && "Server is offline at the moment."}</div>
			</Map>
		</div>
	);
}
