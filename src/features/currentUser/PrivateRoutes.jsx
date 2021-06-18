import { useSelector } from 'react-redux';
import { Route, Navigate, useLocation } from 'react-router-dom';

export const PrivateRoutes = ({ path, ...props }) => {
	const { token } = useSelector((state) => state.currentUser);
	const location = useLocation();
	return token ? (
		<Route exact {...props} path={path} />
	) : (
		<Navigate state={{ from: location.pathname }} replace to='/login' />
	);
};
