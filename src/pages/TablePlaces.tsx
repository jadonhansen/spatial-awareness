import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getInitialList, paginateTableData, searchForPlace } from "../api/api";
import { Pagination, Place, PlaceRecords, SortBy, SortDirection, TableRow } from "../types/types";
import PlaceModal from "../components/PlaceModal";
import "../styles/basePage.scss";
import "../styles/tablePlaces.scss";
// import { mockTable } from "./mockData";

const tableColumns = [
	{
		label: "Name",
		field: "name",
		sortDirection: undefined,
	},
	{ label: "Category", field: "category", sortDirection: undefined },
	{
		label: "Description",
		field: "description",
		sortDirection: undefined,
	},
	{
		label: "Address",
		field: "address",
		sortDirection: undefined,
	},
];

export default function TablePlaces() {
	// component state
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState(true);
	const [placeModalData, setPlaceModalData] = useState<Place | undefined>();
	// form state
	const [searchStr, setSearchStr] = useState<string | undefined>();
	// table state
	const defaultLimit = 10;
	const [tableRows, setTableRows] = useState<TableRow[]>([]);
	const [paginationData, setPaginationData] = useState<Pagination>({
		limit: defaultLimit,
		page: 1,
		totalItems: 0,
		totalPages: 1,
	});

	useEffect(() => {
		initialData();
	}, []);

	const initialData = async () => {
		const { data, error } = await getInitialList(defaultLimit);

		if (error) setError(`An error occurred, "${JSON.stringify(error)}", please try again.`);
		else mapTableData(data);

		// mapTableData(mockTable);

		setLoading(false);
	};

	const mapTableData = (data: PlaceRecords) => {
		setPaginationData({
			limit: data.meta.limit,
			page: data.meta.page,
			totalPages: data.meta.totalPages,
			totalItems: data.meta.totalItems,
		});

		let rows: TableRow[] = [];

		rows = data.data.map((place): TableRow => {
			return {
				cells: [
					{
						text: place.name,
						field: place.name,
					},
					{
						text: place.category,
						field: place.category,
					},
					{
						text: place.description,
						field: place.description,
					},
					{
						text: place.address,
						field: place.address,
					},
				],
			};
		});

		setTableRows(rows);
	};

	const paginateTable = async (pageNumber: number, limit: number, columnSort: SortBy | undefined, sortDirection: SortDirection) => {
		if (loading) return;

		setLoading(true);

		const { data, error } = await paginateTableData(pageNumber, limit, columnSort, sortDirection);

		if (error) setError(`An error occurred, "${JSON.stringify(error)}", please try again.`);
		else mapTableData(data);

		setLoading(false);
	};

	const searchBtnClick = async () => {
		setError(undefined);
		if (loading || !searchStr || searchStr?.trim().length <= 0) return;

		setLoading(true);

		const { data, error } = await searchForPlace(searchStr, 1, defaultLimit);

		if (error) setError(`An error occurred, "${JSON.stringify(error)}", please try again.`);
		else mapTableData(data);

		setLoading(false);
	};

	return (
		<div id="table-places-page" className="page">
			{placeModalData && <PlaceModal place={placeModalData} closeModal={() => setPlaceModalData(undefined)} />}

			<h1>Available Places</h1>

			<div className="search-section">
				<input type="text" placeholder="Name" onChange={(e) => setSearchStr(e.target.value.trim())} />
				<button onClick={searchBtnClick} disabled={loading || !searchStr || searchStr?.trim().length <= 0}>
					Search
				</button>
			</div>

			{loading && <p className="loading">Loading places...</p>}
			{error && <p className="error-message">{error}</p>}

			<Table columns={tableColumns} rows={tableRows} pagination={paginationData} paginate={paginateTable} />
		</div>
	);
}
