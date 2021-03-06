import React from "react";

import Compass from "./Compass";
import { mod } from "mathjs";

class CompassContainer extends React.Component {
	constructor(props) {
		super(props);

		this.divisions = [
			{
				numberOfLines: 12,
				lineLength: 0.075,
				renderText: true,
				textProvider: i => mod(180 - (360 / 12) * i, 360),
				angleProvider: i => ((2 * Math.PI) / 12) * i,
				fontSize: 8,
			},
			{
				numberOfLines: 36,
				lineLength: 0.05,
				textProvider: i => "",
				angleProvider: i => ((2 * Math.PI) / 36) * i,
			},
			{
				numberOfLines: 144,
				lineLength: 0.025,
				textProvider: i => "",
				angleProvider: i => ((2 * Math.PI) / 144) * i,
			},
		];
	}

	render() {
		const heading =
			this.props?.data?.vessels?.self?.navigation?.courseOverGroundTrue ||
			this.props?.data?.vessels?.self?.navigation?.courseOverGroundMagnetic;

		return (
			<Compass
				width={this.props.width}
				height={this.props.height}
				heading={heading}
				animation={this.props.animation}
				colors={this.props.colors}
				divisions={this.divisions}
			/>
		);
	}
}

export default CompassContainer;
