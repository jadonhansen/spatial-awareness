import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Theme } from "./types/types";
import { getTheme } from "./helpers/helpers";

function App() {
	useEffect(() => {
		const theme = getTheme();
		setTheme(theme);

		// listens for device theme changes
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
			setTheme(event.matches ? "dark" : "light");
		});
	}, []);

	const setTheme = (theme: Theme) => {
		document.documentElement.setAttribute("theme", theme);
		localStorage.setItem("theme", theme);
	};

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}

export default App;
