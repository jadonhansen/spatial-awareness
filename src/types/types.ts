// API RESPONSES
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

export type Category = "food" | "health" | "service_station" | "guest_house" | "hotel";
export type SortDirection = "desc" | "asc";
export type SortBy = "name" | "category" | "description" | "address";

// TABLE
// todo
