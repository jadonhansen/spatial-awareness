import React from "react";

interface Props {
	rowCount: number;
	totalCount: number;
	currentPage: number;
	totalPages: number;
	paginate(pageNumber: number, limit: number): void;
}

// TODO remove below
/* eslint @typescript-eslint/no-unused-vars: 0 */

export default function PaginationOptions({ rowCount, totalCount, currentPage, totalPages, paginate }: Props) {
	const showRowsSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		// Number(event.target.value);
		// paginate();
	};

	const goToPreviousPage = (currentPage: number) => {
		// paginate();
	};

	const goToNextPage = (currentPage: number) => {
		// paginate();
	};

	return (
		<nav aria-label="Table pagination navigation">
			<ul className="pagination">
				<li className="rows-per-page">
					<label htmlFor="rowsPerPage">Rows per page</label>
					<select value={rowCount} onChange={showRowsSelectChange} className="rows-select">
						<option>5</option>
						<option>10</option>
						<option>20</option>
						<option>50</option>
						<option>100</option>
					</select>
				</li>

				<li className="previous">
					<a onClick={() => goToPreviousPage(currentPage)}>
						<span aria-label="Previous" className="fa fa-angle-left"></span>
					</a>
				</li>
				<p className="current">
					Page {currentPage} of {totalPages}
				</p>
				<li className="next">
					<a onClick={() => goToNextPage(currentPage)}>
						<span aria-label="Next" className="fa fa-angle-right"></span>
					</a>
				</li>
			</ul>
		</nav>
	);
}
