import { ApiResponse, Category, Place, PlaceRecords, SortBy, SortDirection } from "../types/types";

const baseUrl = import.meta.env.VITE_BASE_URL;
const isDebug = import.meta.env.DEV;

const fetchOptions: RequestInit = {
	method: "GET",
	mode: "cors",
	headers: {
		"Content-Type": "text/plain",
	},
};

// SHARED REST CALLS

export async function getPlaceById(id: string): Promise<ApiResponse<Place, Error>> {
	const res = await fetch(`${baseUrl}/places/${id}`, fetchOptions);

	if (res.ok) {
		const textData = await res.text();
		const data = JSON.parse(textData);
		if (isDebug) console.log("getPlaceById()", data);
		return { data, error: undefined };
	} else {
		if (isDebug) console.error("getPlaceById() error", res);
		const error = new Error(res.statusText);
		return { data: undefined, error };
	}
}

export async function getPlaces(
	name: string | undefined,
	page: number,
	limit: number,
	filter?: Category,
	sortBy?: SortBy,
	sortDirection?: SortDirection,
): Promise<ApiResponse<PlaceRecords, Error>> {
	let finalUrl = `${baseUrl}/places?page=${page}&limit=${limit}`;

	if (name) finalUrl += `&search=${name}`;
	if (filter) finalUrl += `&category=${filter}`;
	if (sortBy || sortDirection) finalUrl += `&sortBy=${sortBy}&sortDirection=${sortDirection}`;

	const res = await fetch(finalUrl, fetchOptions);

	if (res.ok) {
		const textData = await res.text();
		const data = JSON.parse(textData);
		if (isDebug) console.log("searchForPlace()", data);
		return { data, error: undefined };
	} else {
		if (isDebug) console.error("searchForPlace() error", res);
		const error = new Error(res.statusText);
		return { data: undefined, error };
	}
}

// TABLE REST CALLS

export async function getInitialList(limit: number): Promise<ApiResponse<PlaceRecords, Error>> {
	const finalUrl = `${baseUrl}/places?page=1&limit=${limit}`;
	const res = await fetch(finalUrl, fetchOptions);

	if (res.ok) {
		const textData = await res.text();
		const data = JSON.parse(textData);
		if (isDebug) console.log("getInitialList()", data);
		return { data, error: undefined };
	} else {
		if (isDebug) console.error("getInitialList() error", res);
		const error = new Error(res.statusText);
		return { data: undefined, error };
	}
}

// TEST/DEBUG REST CALLS

export async function pingServer(): Promise<ApiResponse<string, Error>> {
	const res = await fetch(`${baseUrl}/ping`, fetchOptions);

	if (res.ok) {
		const data = await res.text();
		if (isDebug) console.log("testServer()", data);
		return { data, error: undefined };
	} else {
		if (isDebug) console.error("testServer() error", res);
		const error = new Error(res.statusText);
		return { data: undefined, error };
	}
}
