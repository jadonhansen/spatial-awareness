import React from "react";

interface Props {
	rowCount: number;
	limit: number;
	totalCount: number;
	currentPage: number;
	totalPages: number;
	paginate(pageNumber: number, limit: number): void;
}

export default function PaginationOptions({ rowCount, limit, totalCount, currentPage, totalPages, paginate }: Props) {
	const limitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		paginate(1, Number(event.target.value));
	};

	const goToPreviousPage = (currentPage: number) => {
		if (currentPage - 1 > 0) paginate(currentPage - 1, limit);
	};

	const goToNextPage = (currentPage: number) => {
		if (currentPage + 1 <= totalPages) paginate(currentPage + 1, limit);
	};

	const getResultsInfo = () => {
		const start = currentPage === 1 ? 1 : limit * (currentPage - 1) + 1;
		const end = totalPages === 1 ? totalCount : start + rowCount - 1;

		return `Showing results ${start} to ${end} of ${totalCount}`;
	};

	return (
		totalCount > 0 && (
			<nav aria-label="Table pagination navigation">
				<div className="results-info">
					<p>{getResultsInfo()}</p>
				</div>

				<div className="pagination">
					<label htmlFor="rows-per-page">Rows per page</label>
					<select id="rows-per-page" value={limit} onChange={limitChange} className="rows-select">
						<option>5</option>
						<option>10</option>
						<option>20</option>
						<option>50</option>
						<option>100</option>
					</select>
					{currentPage - 1 > 0 && (
						<span aria-label="Previous" onClick={() => goToPreviousPage(currentPage)}>
							&lsaquo;
						</span>
					)}
					<p className="current">
						Page {currentPage} of {totalPages}
					</p>
					{currentPage + 1 <= totalPages && (
						<span aria-label="Next" onClick={() => goToNextPage(currentPage)}>
							&rsaquo;
						</span>
					)}
				</div>
			</nav>
		)
	);
}
