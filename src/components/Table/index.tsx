import React, { useState } from "react";
import { Pagination, SortDirection, TableColumn, TableRow } from "../../types/types";
import DatatableRows from "./DatatableRows";
import DatatableColumns from "./DatatableColumns";
import PaginationOptions from "./PaginationOptions";
import "../../styles/table.scss";

interface Props {
	pagination: Pagination;
	columns: TableColumn[];
	rows: TableRow[];
	rowClick(row: TableRow): void;
	paginate(pageNumber: number, limit: number, columnSort: string | undefined, sortDirection: SortDirection): Promise<void>;
}

export default function Table({ pagination, columns, rows, paginate, rowClick }: Props) {
	const [sortedColumn, setSortedColumn] = useState<string>();
	const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

	// sorting is the concern of the table component, so we keep the state stored inside
	const sortColumn = (column: TableColumn) => {
		let direction: SortDirection = "asc";
		let colField = sortedColumn;

		if (sortedColumn === column.field) {
			direction = sortDirection === "desc" ? "asc" : "desc";
			setSortDirection(direction);
		} else {
			colField = column.field;
			setSortedColumn(column.field);
			setSortDirection("asc");
		}

		paginate(pagination.page, pagination.limit, colField, direction);
	};

	const paginateAction = (pageNumber: number, limit: number) => {
		paginate(pageNumber, limit, sortedColumn, sortDirection);
	};

	return (
		<table id="data-table">
			<thead>
				<DatatableColumns
					columns={columns}
					sortColumn={sortColumn}
					sortDirection={sortDirection}
					sortedColumn={sortedColumn}
				/>
			</thead>
			<tbody>
				<DatatableRows rows={rows} rowClick={rowClick} />
			</tbody>
			<tfoot>
				<tr>
					<td colSpan={columns.length}>
						<PaginationOptions
							rowCount={rows.length}
							limit={pagination.limit}
							totalCount={pagination.totalItems}
							currentPage={pagination.page}
							totalPages={pagination.totalPages}
							paginate={paginateAction}
						/>
					</td>
				</tr>
			</tfoot>
		</table>
	);
}
