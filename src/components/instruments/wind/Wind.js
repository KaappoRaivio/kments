import React from 'react';

import NumberDisplay from "../../numberdisplay/NumberDisplay.js"
import Needle from "./Needle"
import Svghelper, {LineDivisions} from "../../misc/svghelpers";

import "./wind.css"


const Wind = (props) => {
    const center = {x: props.width / 2, y: props.height / 2};
    const radius = Math.round(props.width / 2.1);
    const radiusPercent = radius / (props.width / 2) * 100 / 2;

    const colors = {
        ...props.colors,
        ...getAdditionalColors(props.darkMode)
    };

    const parentStyle = {
        width: props.width,
        height: props.height,
        fill: colors.background,
    };

    console.log(props.angleApparent, props.angleTrue, colors, radiusPercent)

    return (
        <div className="wind" style={parentStyle}>
            <div className="wind-speed-display-wrapper">
                <NumberDisplay
                    value={props.speed?.value}
                    suffix=""
                    units={props.speed?.meta?.units}
                    width={props.width / 1.5}
                    height={props.height * 0.25}
                    upperBound={99}
                    decimalPlaces={1}
                    label={`Wind speed (${props.speedQuality})`}
                    colors={colors}
                    darkMode={props.darkMode}
                    displayScale={props.displayScale}
                    centerLabel={true}
                />
            </div>


            <svg className="wind-svg" width={props.width} height={props.height}>
                <circle
                    cx={center.x}
                    cy={center.y}
                    r={radius}
                    strokeWidth={radius * 0.01}
                />

                <g>
                    {Svghelper.getSector(center.x, center.y, radius, 0.025 * props.width, -props.closeHaulAngle, 0, colors.closeHaulRight)}}
                    {Svghelper.getSector(center.x, center.y, radius, 0.025 * props.width, props.closeHaulAngle, 0, colors.closeHaulLeft)}
                </g> : null

                <g fill={props.colors.primary} strokeWidth={radius * 0.01}>
                    <LineDivisions radius={radius} center={center} divisions={props.divisions} rotateText={false} />
                </g>
            </svg>
            {/*<Needle angle={1} radius={radiusPercent} color={"red"} animate={props.animate}/>*/}
            {/*<Needle angle={2} radius={radiusPercent} color={"orange"} animate={props.animate}/>*/}
            <Needle angle={props.angleApparent.value} radius={radiusPercent} color={colors.accent1} animate={props.animate}/>
            <Needle angle={props.angleTrue.value} radius={radiusPercent} color={colors.accent2} animate={props.animate}/>

        </div>
    )
}

const getAdditionalColors = (darkMode) => {
    if (darkMode) {
        return {
            closeHaulRight: "rgba(0, 200, 0, 0)",
            closeHaulLeft: "rgba(255, 150, 125, 0)",
        }
    } else {
        return {
            closeHaulRight: "rgba(0, 200, 0, 0.75)",
            closeHaulLeft: "rgba(255, 150, 125, 0.75)",
        }
    }
};

export default Wind;