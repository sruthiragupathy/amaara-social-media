import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export const PublicRoutes = ({ path, ...props }) => {
	const { token } = useSelector((state) => state.currentUser);
	return token ? (
		<Navigate state={{ from: path }} replace to='/' />
	) : (
		<Route {...props} path={path} />
	);
};
