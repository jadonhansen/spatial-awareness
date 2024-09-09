import { MapTypeStyle } from "google-map-react";

// API
export interface SuccessResponse<SuccessResponseData> {
	data: SuccessResponseData;
	error: undefined;
	headers?: Headers;
}

export type ErrorResponse<ErrorResponseData = undefined> = [ErrorResponseData] extends [undefined]
	? {
			data: undefined;
			error: Error;
			headers?: Headers;
		}
	: {
			data: undefined;
			error: ErrorResponseData | Error;
			headers?: Headers;
		};

export type ApiResponse<SuccessResponseData, ErrorResponseData = undefined> =
	| SuccessResponse<SuccessResponseData>
	| ErrorResponse<ErrorResponseData>;

// PLACE DATA
export interface PlaceRecords {
	meta: PageMeta;
	data: Place[];
}

export interface PageMeta {
	limit: number;
	page: number;
	totalPages: number;
	totalItems: number;
}

export interface Place {
	id: string;
	name: string;
	description: string;
	category: Category;
	companyId: string;
	address: string;
	coordinates: Coordinate;
}

export interface Coordinate {
	lat: number;
	lon: number;
}

export type SortDirection = "desc" | "asc";
export type SortBy = "name" | "category" | "description" | "address";

export const allCategories = ["food", "health", "service_station", "guest_house", "hotel"] as const;
type CategoryTuple = typeof allCategories;
export type Category = CategoryTuple[number];

export const CategoryEmoji = new Map<Category, string>([
	["food", "🍔"],
	["guest_house", "🏠"],
	["health", "💪"],
	["hotel", "🏨"],
	["service_station", "⛽"],
]);

// TABLE
export interface TableColumn {
	label: string;
	field: string;
}

export interface TableRow {
	id: string;
	cells: TableRowCell[];
}

export interface TableRowCell {
	text: string | number;
	field: string;
}

export interface Pagination {
	limit: number;
	page: number;
	totalPages: number;
	totalItems: number;
}

// APP
export type Theme = "light" | "dark";

// MAP
export const darkModeStyles: MapTypeStyle[] = [
	{ elementType: "geometry", stylers: [{ color: "#242f3e" }] },
	{ elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
	{ elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
	{
		featureType: "administrative.locality",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "poi.park",
		elementType: "geometry",
		stylers: [{ color: "#263c3f" }],
	},
	{
		featureType: "poi.park",
		elementType: "labels.text.fill",
		stylers: [{ color: "#6b9a76" }],
	},
	{
		featureType: "road",
		elementType: "geometry",
		stylers: [{ color: "#38414e" }],
	},
	{
		featureType: "road",
		elementType: "geometry.stroke",
		stylers: [{ color: "#212a37" }],
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [{ color: "#9ca5b3" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry",
		stylers: [{ color: "#746855" }],
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [{ color: "#1f2835" }],
	},
	{
		featureType: "road.highway",
		elementType: "labels.text.fill",
		stylers: [{ color: "#f3d19c" }],
	},
	{
		featureType: "transit",
		elementType: "geometry",
		stylers: [{ color: "#2f3948" }],
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [{ color: "#d59563" }],
	},
	{
		featureType: "water",
		elementType: "geometry",
		stylers: [{ color: "#17263c" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.fill",
		stylers: [{ color: "#515c6d" }],
	},
	{
		featureType: "water",
		elementType: "labels.text.stroke",
		stylers: [{ color: "#17263c" }],
	},
];
