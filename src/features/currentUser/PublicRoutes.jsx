import { useSelector } from 'react-redux';
import { Route, Navigate, useLocation } from 'react-router-dom';

export const PublicRoutes = ({ path, ...props }) => {
	const { token } = useSelector((state) => state.currentUser);
	const location = useLocation();

	return token ? (
		<Navigate
			state={{ from: path }}
			replace
			to={
				location.state?.from && !location.state?.from.includes(':')
					? location.state.from
					: '/'
			}
		/>
	) : (
		<Route {...props} path={path} />
	);
};
