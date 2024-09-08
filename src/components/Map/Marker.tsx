import { CategoryEmoji, Place } from "../../types/types";

interface Props {
	lat: number;
	lng: number;
	place: Place;
}

export default function Marker({ place }: Props) {
	return <div className="map-marker">{CategoryEmoji.get(place.category)}</div>;
}
