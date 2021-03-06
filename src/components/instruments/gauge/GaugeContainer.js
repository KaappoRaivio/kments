import React from "react";
import Gauge from "./Gauge";
// import {camelCaseToSentenceCase, valueSkeleton} from "../DataStructures";
import { getByStringPath } from "delta-processor";

import PropTypes from "prop-types";
import { componentTypes } from "@data-driven-forms/react-form-renderer";
import validatorTypes from "@data-driven-forms/react-form-renderer/validator-types";

class GaugeContainer extends React.Component {
	static schema = [
		{
			component: componentTypes.TEXT_FIELD,
			name: "path",
			placeholder: "Path",
			validate: [
				{
					type: validatorTypes.MIN_LENGTH,
					threshold: 1,
				},
			],
		},
	];

	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,

		animate: PropTypes.bool,
		colors: PropTypes.object.isRequired,
		darkMode: PropTypes.bool.isRequired,
	};

	render() {
		const { path, width, animation, height, colors, darkMode, data } = this.props;

		const value = getByStringPath(path, data.vessels.self);

		return (
			<Gauge
				zones={value.meta.zones}
				width={width}
				height={height}
				colors={colors}
				darkMode={darkMode}
				displayScale={value.meta.displayScale}
				path={path}
				value={value.value}
				animation={animation}
				units={value.meta.units}
				label={value.meta.displayName}
				suffix={""}
				decimalPlaces={1}
			/>
		);
		// </NonNull>
	}
}

export default GaugeContainer;
