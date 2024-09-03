import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";

export default function NavBar() {
	return (
		<header className="navbar">
			<nav>
				<Link className="mr" to={"/"}>
					Map Search
				</Link>
				<Link className="mr" to={"/tablePlaces"}>
					Places
				</Link>
			</nav>
		</header>
	);
}
