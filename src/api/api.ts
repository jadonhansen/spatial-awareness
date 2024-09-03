import { ApiResponse, Category, Place, SortBy, SortDirection } from "../types/types";

const baseUrl = import.meta.env.VITE_BASE_URL;
const isDebug = import.meta.env.DEV;

const fetchOptions: RequestInit = {
	method: "GET",
	mode: "no-cors",
};

export async function getPlaceById(id: string): Promise<ApiResponse<Place, Error>> {
	const res = await fetch(`${baseUrl}/places/${id}`, fetchOptions);

	if (res.ok) {
		const data = await res.json();
		if (isDebug) console.log("getPlaceById()", data);
		return { data, error: undefined };
	} else {
		if (isDebug) console.error("getPlaceById() error", res);
		const error = new Error(res.statusText);
		return { data: undefined, error };
	}
}

export async function searchForPlace(
	name: string,
	page: number,
	limit: number,
	filter?: Category,
	sortBy?: SortBy,
	sortDirection?: SortDirection,
): Promise<ApiResponse<string[], Error>> {
	const finalUrl = `${baseUrl}/places/search=${name}&page=${page}&limit=${limit}&filter[category]=${filter}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
	const res = await fetch(finalUrl, fetchOptions);

	if (res.ok) {
		const data = await res.json();
		if (isDebug) console.log("searchForPlace()", data);
		return { data, error: undefined };
	} else {
		if (isDebug) console.error("searchForPlace() error", res);
		const error = new Error(res.statusText);
		return { data: undefined, error };
	}
}

export async function pingServer(): Promise<ApiResponse<string, Error>> {
	const res = await fetch(`${baseUrl}/ping`, fetchOptions);

	if (res.ok) {
		const data = await res.json();
		if (isDebug) console.log("testServer()", data);
		return { data, error: undefined };
	} else {
		if (isDebug) console.error("testServer() error", res);
		const error = new Error(res.statusText);
		return { data: undefined, error };
	}
}
