import React, { ReactElement } from "react";
import { TableRow, TableRowCell } from "../../types/types";

interface Props {
	rows: TableRow[];
	rowClick(row: TableRow): void;
}

export default function DatatableRows({ rows, rowClick }: Props) {
	const createRow = (row: TableRow, key: number) => {
		return (
			<tr className="record-row has-data" key={key} onClick={() => rowClick(row)}>
				{row.cells.map((rowCell: TableRowCell, i: number) => {
					return <td key={`${key}-rowCell-${i}`}>{rowCell.text.toString()}</td>;
				})}
			</tr>
		);
	};

	const mapRows = (): ReactElement[] | ReactElement => {
		const temp: ReactElement[] = [];

		rows.forEach((row: TableRow, index: number) => {
			temp.push(createRow(row, index));
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
