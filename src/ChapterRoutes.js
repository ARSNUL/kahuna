import Admin from './containers/Admin';

const allRoutes = [
	{
		id: 'admin',
		path: '/admin',
		component: Admin,
	}];


export default function chapterRoutes() {
	const enabledRoutes = [];
	enabledRoutes.push(allRoutes[0]);
	return enabledRoutes;
}
