const initialState = {
	lang: window.localeConfig.languageId,
	strings: window.localeStrings,
	assets: window.localeAssets,
	config: window.localeConfig,
};

export default function locale(state = initialState, action) {
	switch (action.type) {
		default:
			return initialState;
	}
}
