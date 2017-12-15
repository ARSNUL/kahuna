import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createResponsiveStateReducer } from 'redux-responsive';
// import locale from './locale';
// import pageTransition from './pageTransition';
// import modal from './modal';
// import homeSlider from './homeSlider';
import auth from './auth';

const rootReducer = combineReducers({
	// pageTransition,
	// modal,
	// homeSlider,
	authed: auth,
	routing: routerReducer,
	browser: createResponsiveStateReducer({
		phonePortrait: 320,
		phone: 568,
		tabletPortrait: 768,
		tablet: 1025,
		desktop: 1280,
		giant: 1600,
	}),
});

export default rootReducer;
