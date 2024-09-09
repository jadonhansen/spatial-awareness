import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { pingServer, getPlaces } from "../api/api";
import { allCategories, Category, Place } from "../types/types";
import Map from "../components/Map";
import "../styles/mapPlaces.scss";
import { prettyCategory } from "../helpers/helpers";
import PlaceModal from "../components/PlaceModal";

export default function MapPlaces() {
	// component state
	const [testError, setTestError] = useState(false);
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);
	const [places, setPlaces] = useState<Place[]>([]);
	const [placeModalData, setPlaceModalData] = useState<Place | undefined>();
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

	const formSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError(undefined);
		if (testError || loading || (searchStr && searchStr?.trim().length <= 0) || (!searchStr && !category)) return;

		setLoading(true);
		search(searchStr, category);
	};

	const search = async (searchString: string | undefined, selectedCategory: Category | undefined) => {
		const { data, error } = await getPlaces(searchString, 1, 1000, selectedCategory);

		if (error) setError("An error occurred, please try again.");
		else if (data.data.length > 0) setPlaces(data.data);
		else {
			setPlaces([]);
			setError("No places found!");
		}

		setLoading(false);
	};

	const updateCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const value = event.target.value;

		if (value === NO_CATEOGORY) setCategory(undefined);
		else if (allCategories.includes(value as Category)) setCategory(value as Category);
	};

	return (
		<div id="map-places-page">
			{placeModalData && <PlaceModal place={placeModalData} closeModal={() => setPlaceModalData(undefined)} />}

			<Map places={places} markerClick={(place) => setPlaceModalData(place)}>
				<div className="map-places-content">
					<h1>Find a Place</h1>

					<div className="search-section">
						<form onSubmit={formSearch}>
							<input type="text" placeholder="Name" value={searchStr} onChange={(e) => setSearchStr(e.target.value)} />
							<select id="category-select" value={category} onChange={updateCategory} className="rows-select">
								<option>{NO_CATEOGORY}</option>
								{allCategories.map((category: Category) => {
									return (
										<option key={category} value={category}>
											{prettyCategory(category)}
										</option>
									);
								})}
							</select>
							<button type="submit" disabled={testError || loading}>
								Search
							</button>
						</form>

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
					</div>
					{error && <p className="error-message">{error}</p>}
					{testError && <p className="error-message">Server is offline at the moment.</p>}
					{places && places.length > 0 && (
						<p className="info-message">
							Showing {places.length} result{places.length == 1 ? "" : "s"}
							{places.length > 1 && " (you may need to zoom in if markers are overlapping)"}
						</p>
					)}
				</div>
			</Map>
		</div>
	);
}
