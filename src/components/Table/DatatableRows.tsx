import { ReactElement } from "react";
import { TableRow, TableRowCell } from "../../types/types";

interface Props {
	rows: TableRow[];
	rowClick(row: TableRow): void;
}

export default function DatatableRows({ rows, rowClick }: Props) {
	const createRow = (row: TableRow) => {
		return (
			<tr className="record-row has-data" key={row.id} onClick={() => rowClick(row)}>
				{row.cells.map((rowCell: TableRowCell) => {
					return <td key={`${row.id}-rowCell`}>{rowCell.text.toString()}</td>;
				})}
			</tr>
		);
	};

	const mapRows = (): ReactElement[] | ReactElement => {
		const temp: ReactElement[] = [];

		rows.forEach((row: TableRow) => {
			temp.push(createRow(row));
		});

		return temp;
	};

	return rows && rows.length > 0 ? (
		mapRows()
	) : (
		<tr className="record-row">
			<td>No records.</td>
		</tr>
	);
}
