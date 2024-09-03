import React, { useEffect, useState } from "react";
import { pingServer } from "../api/api";
import Map from "../components/Map";
import "../styles/basePage.scss";

// TODO implement search UI, API call and state here
export default function MapPlaces() {
	const [testError, setTestError] = useState(false);

	useEffect(() => {
		testServer();
	}, []);

	const testServer = async () => {
		const { error } = await pingServer();
		if (error) setTestError(true);
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
