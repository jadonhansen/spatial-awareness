import React, { ReactElement } from "react";
import { TableColumn } from "../../types/types";

interface Props {
	columns: TableColumn[];
	sortColumn(column: TableColumn): void;
}

export default function DatatableColumns({ columns, sortColumn }: Props) {
	const mapColumns = (): ReactElement[] => {
		const temp: ReactElement[] = [];

		columns.forEach((col: TableColumn, index: number) => {
			temp.push(
				<th className="table-header" key={`th-${index}`}>
					<div
						onClick={() => {
							sortColumn(col);
						}}
					>
						<i className={`sortable-icon ${col.sortDirection}`}></i>
						{col.label}
					</div>
				</th>,
			);
		});

		return temp;
	};

	return columns && columns.length > 0 ? (
		<tr>{mapColumns()}</tr>
	) : (
		<tr>
			<th>Please provide column data.</th>
		</tr>
	);
}
