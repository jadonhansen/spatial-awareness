import React from "react";

interface Props {
	children?: React.ReactNode;
}

export default function Map({ children }: Props) {
	return (
		<div>
			Map
			{children && <div>{children}</div>}
		</div>
	);
}
