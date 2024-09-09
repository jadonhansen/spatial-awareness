import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Theme } from "./types/types";

function App() {
	useEffect(() => {
		getTheme();

		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
			setTheme(event.matches ? "dark" : "light");
		});
	}, []);

	const getTheme = () => {
		const theme = localStorage.getItem("theme");

		if (theme) {
			if (theme === "dark") setTheme("dark");
			if (theme === "light") setTheme("light");
			return;
		} else {
			const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)");
			if (prefersDarkTheme.matches) {
				setTheme("dark");
				return;
			}

			const prefersLightTheme = window.matchMedia("(prefers-color-scheme: light)");
			if (prefersLightTheme.matches) {
				setTheme("light");
				return;
			}
		}

		setTheme("dark");
	};

	const setTheme = (theme: Theme) => {
		document.documentElement.setAttribute("theme", theme);
	};

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
}

export default App;
