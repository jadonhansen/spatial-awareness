import React from "react";

interface Props {
	rowCount: number;
	limit: number;
	totalCount: number;
	currentPage: number;
	totalPages: number;
	paginate(pageNumber: number, limit: number): void;
}

// TODO remove below
/* eslint @typescript-eslint/no-unused-vars: 0 */

export default function PaginationOptions({ rowCount, limit, totalCount, currentPage, totalPages, paginate }: Props) {
	const limitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		paginate(1, Number(event.target.value));
	};

	const goToPreviousPage = (currentPage: number) => {
		// TODO calculate if possible
		paginate(currentPage - 1, limit);
	};

	const goToNextPage = (currentPage: number) => {
		// TODO calculate if possible
		paginate(currentPage + 1, limit);
	};

	return (
		<nav aria-label="Table pagination navigation">
			<ul className="pagination">
				<li className="rows-per-page">
					<label htmlFor="rowsPerPage">Rows per page</label>
					<select value={limit} onChange={limitChange} className="rows-select">
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
