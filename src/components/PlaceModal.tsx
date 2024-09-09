import { Place } from "../types/types";
import { prettyCategory } from "../helpers/helpers";
import "../styles/placeModal.scss";
import Map from "./Map";

interface Props {
	place: Place;
	showMap?: boolean;
	closeModal(): void;
}

export default function PlaceModal({ place, showMap, closeModal }: Props) {
	return (
		<div id="place-modal">
			<div className="modal-content">
				<div className="header">
					<div>
						<h2>{place.name}</h2>
						<p>{prettyCategory(place.category)}</p>
					</div>
					<button className="close-btn" onClick={closeModal}>
						X
					</button>
				</div>
				<div className="section">
					<div className={showMap ? "info-section" : "info-section column"}>
						<div className="col-left">
							<p className="sub-heading">About this place</p>
							<p>{place.description}</p>
						</div>
						<div className="col-right">
							<p className="sub-heading">Address</p>
							<p>{place.address}</p>
						</div>
					</div>
					{showMap && (
						<div className="map-section">
							<Map places={[place]} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
