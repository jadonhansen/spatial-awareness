import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import MapPlaces from "./pages/MapPlaces.tsx";
import TablePlaces from "./pages/TablePlaces.tsx";
import Error from "./pages/Error.tsx";
import "./index.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <TablePlaces />,
			},
			{
				path: "/map-places",
				element: <MapPlaces />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
