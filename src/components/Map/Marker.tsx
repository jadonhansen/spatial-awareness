import React from "react";
import { Place } from "../../types/types";

interface Props {
	lat: number;
	lng: number;
	place: Place;
}

export default function Marker({ lat, lng, place }: Props) {
	return (
		<div>
			{lat} {lng} {JSON.stringify(place)}
		</div>
	);
}
