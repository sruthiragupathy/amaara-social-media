import { useSelector } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export const PrivateRoutes = ({ path, ...props }) => {
	const { token } = useSelector((state) => state.currentUser);
	return token ? (
		<Route exact {...props} path={path} />
	) : (
		<Navigate state={{ from: path }} replace to='/login' />
	);
};
