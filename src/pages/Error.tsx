import React from "react";
import "../styles/error.scss";

export default function Error() {
	return (
		<div className="error">
			<h2>Oops! There was an error while rendering this page :(</h2>
			<p>Please try again!</p>
		</div>
	);
}
