import React, { useEffect, useState } from "react";
import { pingServer, searchForPlace } from "../api/api";
import Map from "../components/Map";
import "../styles/basePage.scss";
import { Category, Place } from "../types/types";

// TODO remove below
/* eslint @typescript-eslint/no-unused-vars: 0 */

export default function MapPlaces() {
	// component state
	const [testError, setTestError] = useState(false);
	const [searchError, setSearchError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);
	const [mapReady, setMapReady] = useState(false);
	const [places, setPlaces] = useState<Place[] | undefined>();
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

		if (error) setSearchError("An error occurred, please try again.");
		else if (data.data.length > 0) setPlaces(data.data);
		else setSearchError("No places found!");

		setLoading(false);
	};

	return (
		<div className="page">
			<h1>MapPlaces</h1>

			<Map>
				<div>Search UI here</div>
				<div>{testError && "Server is offline at the moment."}</div>
			</Map>
		</div>
	);
}
