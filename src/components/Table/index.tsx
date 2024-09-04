import React from "react";
import { Pagination, TableColumn, TableRow } from "../../types/types";
import DatatableRows from "./DatatableRows";
import DatatableColumns from "./DatatableColumns";
import PaginationOptions from "./PaginationOptions";

interface Props {
	pagination: Pagination;
	columns: TableColumn[];
	rows: TableRow[];
}

// TODO remove below
/* eslint @typescript-eslint/no-unused-vars: 0 */

export default function Table({ pagination, columns, rows }: Props) {
	const sortColumn = (column: TableColumn) => {};

	const paginate = (pageNumber: number, limit: number) => {};

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
							totalCount={pagination.totalItems}
							currentPage={pagination.page}
							totalPages={pagination.totalPages}
							paginate={paginate}
						/>
					</td>
				</tr>
			</tfoot>
		</table>
	);
}
