import React from "react";
import { Link } from "react-router-dom";
import mapDark from "../assets/map-dark.svg";
import tableDark from "../assets/table-dark.svg";
import "../styles/navbar.scss";

export default function NavBar() {
	return (
		<header id="navbar">
			<nav>
				<Link className="mr" to={"/tablePlaces"}>
					<img className="table-icon" src={tableDark} />
					Places
				</Link>
				<Link className="mr" to={"/"}>
					<img className="map-icon" src={mapDark} />
					Map Search
				</Link>
			</nav>
		</header>
	);
}
