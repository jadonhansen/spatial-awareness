import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { pingServer, searchForPlace } from "../api/api";
import { allCategories, Category, Place } from "../types/types";
import Map from "../components/Map";
import "../styles/mapPlaces.scss";
import { prettyCategory } from "../helpers/helpers";

export default function MapPlaces() {
	// component state
	const [testError, setTestError] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);
	const [places, setPlaces] = useState<Place[]>([]);
	// form state
	const [searchStr, setSearchStr] = useState<string | undefined>();
	const [category, setCategory] = useState<Category | undefined>();
	const NO_CATEOGORY = "Select a category";

	useEffect(() => {
		testServer();
	}, []);

	const testServer = async () => {
		const { error } = await pingServer();
		if (error) setTestError(true);
	};

	const searchBtnClick = () => {
		setError(undefined);
		if (testError || loading || (searchStr && searchStr?.trim().length <= 0) || (!searchStr && !category)) return;

		setLoading(true);
		search(searchStr, category);
	};

	const search = async (searchString: string | undefined, selectedCategory: Category | undefined) => {
		const { data, error } = await searchForPlace(searchString, 1, 1000, selectedCategory);

		if (error) setError("An error occurred, please try again.");
		else if (data.data.length > 0) setPlaces(data.data);
		else setError("No places found!");

		setLoading(false);
	};

	const updateCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;

		if (value === NO_CATEOGORY) setCategory(undefined);
		else if (allCategories.includes(value as Category)) setCategory(value as Category);
	};

	return (
		<div id="map-places-page">
			<Map places={places}>
				<div className="map-places-content">
					<h1>Find a Place</h1>

					<div className="search-section">
						<input type="text" placeholder="Name" value={searchStr} onChange={(e) => setSearchStr(e.target.value)} />
						<select id="category-select" value={category} onChange={updateCategory} className="rows-select">
							<option>{NO_CATEOGORY}</option>
							{allCategories.map((category: Category, index: number) => {
								return (
									<option key={index} value={category}>
										{prettyCategory(category)}
									</option>
								);
							})}
						</select>
						<button onClick={searchBtnClick} disabled={testError || loading}>
							Search
						</button>

						<ColorRing
							visible={loading}
							height="35"
							colors={[
								"rgb(140, 23, 140)",
								"rgb(140, 23, 140)",
								"rgb(140, 23, 140)",
								"rgb(140, 23, 140)",
								"rgb(140, 23, 140)",
							]}
						/>
						{error && <p className="error-message">{error}</p>}
						<div>{testError && "Server is offline at the moment."}</div>
					</div>
				</div>
			</Map>
		</div>
	);
}
