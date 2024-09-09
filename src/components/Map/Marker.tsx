import { CategoryEmoji, Place } from "../../types/types";

interface Props {
	lat: number;
	lng: number;
	place: Place;
	markerClick?(place: Place): void;
}

export default function Marker({ place, markerClick }: Props) {
	return (
		<div onClick={() => markerClick && markerClick(place)} className="map-marker">
			{CategoryEmoji.get(place.category)}
		</div>
	);
}
