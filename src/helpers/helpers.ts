import { NESWBounds } from "google-map-react";
import { Category, Coordinate, Place, Theme } from "../types/types";

export const prettyCategory = (category: Category): string => {
	const splitString = category.split("_").map((subStr: string) => {
		return subStr[0].toUpperCase() + subStr.substring(1);
	});

	return splitString.join().replace(",", " ");
};

// gets app theme. Prioritises theme from local storage
export const getTheme = (): Theme => {
	const theme = localStorage.getItem("theme");

	if (theme) {
		if (theme === "dark") return "dark";
		if (theme === "light") return "light";
	} else {
		const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
		if (prefersDarkTheme.matches) {
			return "dark";
		}

		const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
		if (prefersLightTheme.matches) {
			return "light";
		}
	}

	return "dark";
};

export const getBoundsFromPlaces = (places: Place[]): NESWBounds => {
	let northernMarker: Coordinate = { lat: 1, lon: 1 };
	let southernMarker: Coordinate = { lat: 1, lon: 1 };
	let westMarker: Coordinate = { lat: 1, lon: 1 };
	let eastMarker: Coordinate = { lat: 1, lon: 1 };

	places.forEach((place: Place) => {
		const coord = place.coordinates;

		if (northernMarker) {
			if (coord.lat > northernMarker.lat) northernMarker = coord;
		} else {
			northernMarker = coord;
		}

		if (southernMarker) {
			if (coord.lat < southernMarker.lat) southernMarker = coord;
		} else {
			southernMarker = coord;
		}

		if (westMarker) {
			if (coord.lat < westMarker.lat) westMarker = coord;
		} else {
			westMarker = coord;
		}

		if (eastMarker) {
			if (coord.lat < eastMarker.lat) eastMarker = coord;
		} else {
			eastMarker = coord;
		}
	});

	const bounds: NESWBounds = {
		nw: {
			lat: northernMarker.lat,
			lng: northernMarker.lon,
		},
		se: {
			lat: southernMarker.lat,
			lng: southernMarker.lon,
		},
		ne: {
			lat: eastMarker.lat,
			lng: eastMarker.lon,
		},
		sw: {
			lat: westMarker.lat,
			lng: westMarker.lon,
		},
	};

	return bounds;
};
