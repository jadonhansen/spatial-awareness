import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { searchForPlace } from "../api/api";
import { Category, Place } from "../types/types";
import "../styles/basePage.scss";

// TODO remove below
/* eslint @typescript-eslint/no-unused-vars: 0 */

export default function TablePlaces() {
	// component state
	const [searchError, setSearchError] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);
	const [places, setPlaces] = useState<Place[] | undefined>();
	// form state
	const [searchStr, setSearchStr] = useState<string | undefined>();
	const [category, setCategory] = useState<Category | undefined>();

	useEffect(() => {
		initialData();
	}, []);

	const initialData = async () => {
		// todo get initial set of data for the table
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
			<h1>TablePlaces</h1>

			{/* <Table /> */}
		</div>
	);
}
