import React, { useEffect, useState } from "react";
import LayoutModel from "../../models/LayoutModel";
import WebSocketModel from "../../models/WebSocketModel";
import DeltaAssembler from "delta-processor";
import { useDispatch, useSelector } from "react-redux";
import { updateConnectionStatus, updateSignalkState } from "../../redux/actions/actions";
import PropTypes from "prop-types";
import LayoutManager from "../../models/LayoutModel";
import { changeInstrumentLayout } from "../../redux/actions/applicationData";

const useSignalkState = (address, HTTPServerRoot) => {
	const dispatch = useDispatch();

	const socketManagerStatus = useSelector(state => state.connection.status);
	const signalkState = useSelector(store => store.signalkState);

	useEffect(() => {
		const deltaAssembler = new DeltaAssembler(HTTPServerRoot, fullState => dispatch(updateSignalkState(fullState)), undefined, 1000);
		const websocketManager = new WebSocketModel(
			address,
			delta => deltaAssembler.onDelta(delta),
			newStatus => dispatch(updateConnectionStatus(newStatus))
		);
		websocketManager.open();
	}, [HTTPServerRoot, address, dispatch]);

	return { signalkState, connectionStatus: socketManagerStatus };
};

const useInstrumentLayoutManager = (appName, appVersion, endpoint, isProduction, username) => {
	const dispatch = useDispatch();
	const instruments = useSelector(state => state.instrumentLayout);

	useEffect(() => {
		console.log("Getting instruments");
		LayoutManager.getInstruments(username, appName, appVersion, isProduction, endpoint).then(instruments => {
			dispatch(changeInstrumentLayout(instruments));
		});
	}, [appName, appVersion, dispatch, endpoint, isProduction, username]);

	return { instruments };
};

const SignalkDataManager = ({ children }) => {
	const { appName, appVersion, isProduction } = useSelector(state => state.appState.meta);
	const endpoint = useSelector(state => state.settings.connection.address.http);
	const username = useSelector(state => state.login.username);

	const { instruments } = useInstrumentLayoutManager(appName, appVersion, endpoint, isProduction, username);

	const { ws, http } = useSelector(state => state.settings.connection.address);
	const { signalkState, connectionStatus } = useSignalkState(ws, http);

	return React.Children.map(children, child => {
		if (React.isValidElement(child)) {
			return React.cloneElement(child, { instruments, signalkState, connectionStatus });
		} else {
			return child;
		}
	});
};

SignalkDataManager.propTypes = {
	children: PropTypes.element.isRequired,
};

export default SignalkDataManager;
