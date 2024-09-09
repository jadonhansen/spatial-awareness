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
	["health", "⚕️"],
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
