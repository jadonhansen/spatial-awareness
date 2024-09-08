import { Link } from "react-router-dom";
import mapDark from "../assets/map-dark.svg";
import tableDark from "../assets/table-dark.svg";
import themeDark from "../assets/sun-dark.svg";

import "../styles/navbar.scss";

export default function NavBar() {
	const switchTheme = () => {
		// TODO
		console.log("swithced theme");
	};

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
				<a onClick={switchTheme}>
					<img className="theme-icon" src={themeDark} />
				</a>
			</nav>
		</header>
	);
}
