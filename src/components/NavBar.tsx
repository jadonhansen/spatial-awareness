import { Link } from "react-router-dom";
import mapDark from "../assets/map-dark.svg";
import tableDark from "../assets/table-dark.svg";
import themeDark from "../assets/sun-light.svg";
import { Theme } from "../types/types";
import "../styles/navbar.scss";

export default function NavBar() {
	const switchTheme = () => {
		const currentTheme = document.documentElement.getAttribute("theme");

		if (currentTheme) {
			const newTheme: Theme = currentTheme === "dark" ? "light" : "dark";

			document.documentElement.setAttribute("theme", newTheme);
			localStorage.setItem("theme", newTheme);
		}
	};

	return (
		<header id="navbar">
			<nav>
				<Link className="mr" to={"/"}>
					<img className="table-icon" src={tableDark} />
					Places
				</Link>
				<Link className="mr" to={"/map-places"}>
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
