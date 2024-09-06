import React, { ReactElement } from "react";
import { TableRow, TableRowCell } from "../../types/types";

interface Props {
	rows: TableRow[];
}

export default function DatatableRows({ rows }: Props) {
	const createRow = (row: TableRow, key: number) => {
		return (
			<tr className="record-row" key={key}>
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
