import React, { useState } from "react";
import { Pagination, SortDirection, TableColumn, TableRow } from "../../types/types";
import DatatableRows from "./DatatableRows";
import DatatableColumns from "./DatatableColumns";
import PaginationOptions from "./PaginationOptions";

interface Props {
	pagination: Pagination;
	columns: TableColumn[];
	rows: TableRow[];
	paginate(pageNumber: number, limit: number, columnSort: string | undefined, sortDirection: SortDirection): Promise<void>;
}

export default function Table({ pagination, columns, rows, paginate }: Props) {
	const [sortedColumn, setSortedColumn] = useState<string>();
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

	// sorting is the concern of the table component, so we keep the state stored inside
	const sortColumn = (column: TableColumn) => {
		const direction = !column.sortDirection ? "asc" : column.sortDirection === "asc" ? "desc" : "asc";
		setSortDirection(direction);
		setSortedColumn(column.field);

		paginate(pagination.page, pagination.limit, column.field, direction);
	};

	const paginateAction = (pageNumber: number, limit: number) => {
		paginate(pageNumber, limit, sortedColumn, sortDirection);
	};

	return (
		<table>
			<thead>
				<DatatableColumns columns={columns} sortColumn={sortColumn} />
			</thead>
			<tbody>
				<DatatableRows rows={rows} />
			</tbody>
			<tfoot>
				<tr>
					<td>
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
