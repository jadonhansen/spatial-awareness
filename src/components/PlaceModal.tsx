import React from "react";
import { Place } from "../types/types";
import { prettyCategory } from "../helpers/helpers";
import "../styles/placeModal.scss";

interface Props {
	place: Place;
	closeModal(): void;
}

export default function PlaceModal({ place, closeModal }: Props) {
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
					<div className="info-section">
						<div className="col-left">
							<p className="sub-heading">About this place</p>
							<p>{place.description}</p>
						</div>
						<div className="col-right">
							<p className="sub-heading">Address</p>
							<p>{place.address}</p>
						</div>
					</div>
					<div className="map-section">
						<p>Map</p>
					</div>
				</div>
			</div>
		</div>
	);
}
