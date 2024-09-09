import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import Table from "../components/Table";
import { getInitialList, getPlaces } from "../api/api";
import { Pagination, Place, PlaceRecords, SortBy, SortDirection, TableRow } from "../types/types";
import PlaceModal from "../components/PlaceModal";
import { prettyCategory } from "../helpers/helpers";
import "../styles/tablePlaces.scss";

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
	const [currentPlaces, setCurrentPlaces] = useState<Place[]>([]);
	const [placeModalData, setPlaceModalData] = useState<Place | undefined>();
	const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
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

		setLoading(false);
	};

	const mapTableData = (data: PlaceRecords) => {
		setCurrentPlaces(data.data);

		setPaginationData({
			limit: data.meta.limit,
			page: data.meta.page,
			totalPages: data.meta.totalPages,
			totalItems: data.meta.totalItems,
		});

		let rows: TableRow[] = [];

		rows = data.data.map((place): TableRow => {
			return {
				id: place.id,
				cells: [
					{
						text: place.name,
						field: place.name,
					},
					{
						text: prettyCategory(place.category),
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

		setError(undefined);
		setLoading(true);

		const { data, error } = await getPlaces(
			!searchStr || searchStr?.trim() === "" ? undefined : searchStr?.trim(),
			pageNumber,
			limit,
			undefined,
			columnSort,
			sortDirection,
		);

		if (error) setError(`An error occurred, "${JSON.stringify(error)}", please try again.`);
		else mapTableData(data);

		setLoading(false);
	};

	const formSearch = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError(undefined);
		if (loading || !searchStr || searchStr?.trim().length <= 0) return;

		setLoading(true);

		const { data, error } = await getPlaces(searchStr, 1, defaultLimit);

		if (error) setError(`An error occurred, "${JSON.stringify(error)}", please try again.`);
		else mapTableData(data);

		setShowClearBtn(true);
		setLoading(false);
	};

	const clearSearch = () => {
		setError(undefined);
		setSearchStr("");
		setLoading(true);
		initialData();
		setShowClearBtn(false);
	};

	const onRowClick = (row: TableRow) => {
		const place = currentPlaces.filter((place) => place.id === row.id);
		if (place) setPlaceModalData(place[0]);
	};

	return (
		<div id="table-places-page" className="page">
			{placeModalData && <PlaceModal place={placeModalData} showMap closeModal={() => setPlaceModalData(undefined)} />}

			<h1>Available Places</h1>

			<div className="search-section">
				<form onSubmit={formSearch}>
					<input value={searchStr} type="text" placeholder="Name" onChange={(e) => setSearchStr(e.target.value.trim())} />
					<button type="submit" disabled={loading || !searchStr || searchStr?.trim().length <= 0}>
						Search
					</button>
				</form>
				{showClearBtn && (
					<button id="clear-button" onClick={clearSearch}>
						Clear
					</button>
				)}

				<ColorRing
					visible={loading}
					height="35"
					colors={["rgb(140, 23, 140)", "rgb(140, 23, 140)", "rgb(140, 23, 140)", "rgb(140, 23, 140)", "rgb(140, 23, 140)"]}
				/>
				{error && <p className="error-message">{error}</p>}
			</div>

			<Table
				columns={tableColumns}
				rows={tableRows}
				pagination={paginationData}
				paginate={paginateTable}
				rowClick={onRowClick}
			/>
		</div>
	);
}
