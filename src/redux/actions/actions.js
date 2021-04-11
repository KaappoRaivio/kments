export const SIGNALK_DELTA = 0;
export const updateSignalkState = content => {
	return { type: SIGNALK_DELTA, content };
};

export const UPDATE_LOGIN = 1;
export const updateUserLoggedIn = (username, loggedIn, code, apiKey) => {
	return { type: UPDATE_LOGIN, username, loggedIn, code, apiKey };
};

export const LOGOUT = 2;
export const logout = () => {
	return { type: LOGOUT };
};

export const DARK_MODE = 30;
export const darkMode = darkMode => {
	return { type: DARK_MODE, darkMode };
};

export const UPDATE_SETTINGS = 32;
export const updateSettings = settings => {
	return { type: UPDATE_SETTINGS, settings };
};

export const UPDATE_INSTRUMENT_LAYOUT = 60;
export const updateInstrumentLayout = newLayout => {
	return { type: UPDATE_INSTRUMENT_LAYOUT, layout: newLayout };
};

export const ADD_INSTRUMENT = 61;
export const addInstrument = (id, instrument) => {
	return { type: ADD_INSTRUMENT, id, instrument };
};

export const REMOVE_INSTRUMENT = 62;
export const removeInstrument = id => {
	return { type: REMOVE_INSTRUMENT, id };
};

export const UPDATE_CONNECTION_STATUS = 90;
export const updateConnectionStatus = newStatus => {
	return { type: UPDATE_CONNECTION_STATUS, status: newStatus };
};

export const ADD_INSTRUMENT_DIALOG_OPEN = 100;
export const addInstrumentDialogOpen = open => {
	return { type: ADD_INSTRUMENT_DIALOG_OPEN, open };
};
export const SETTINGS_PANE_OPEN = 101;
export const settingsPaneOpen = open => {
	return { type: SETTINGS_PANE_OPEN, open };
};

export const LAYOUT_EDITING_ENABLED = 102;
export const setLayoutEditingEnabled = enabled => {
	return { type: LAYOUT_EDITING_ENABLED, enabled };
};

export const APP_METADATA = 103;
export const setAppMetadata = (name, version, production) => {
	return { type: APP_METADATA, name, version, production };
};