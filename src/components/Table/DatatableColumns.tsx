import { ReactElement } from "react";
import { SortDirection, TableColumn } from "../../types/types";

interface Props {
	columns: TableColumn[];
	sortColumn(column: TableColumn): void;
	sortedColumn: string | undefined;
	sortDirection: SortDirection;
}

export default function DatatableColumns({ columns, sortDirection, sortedColumn, sortColumn }: Props) {
	const mapColumns = (): ReactElement[] => {
		const temp: ReactElement[] = [];

		columns.forEach((col: TableColumn, key: number) => {
			temp.push(
				<th className="table-header" key={`th-${key}`}>
					<div
						className="col-header"
						onClick={() => {
							sortColumn(col);
						}}
					>
						{sortedColumn === col.field && sortDirection === "asc" && <span className="sortable-icon">&#x25b4;</span>}
						{sortedColumn === col.field && sortDirection === "desc" && <span className="sortable-icon">&#x25be;</span>}
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
			<th className="table-header">Please provide column data.</th>
		</tr>
	);
}
