export const formValidation = (email, password, error, setError) => {
	setError({ email: '', password: '' });
	let validationSuccess = true;
	if (!email) {
		setError((error) => ({ ...error, email: 'Please enter valid email' }));
		validationSuccess = false;
	}
	if (!password) {
		setError((error) => ({
			...error,
			password: 'Please enter valid password',
		}));
		validationSuccess = false;
	}
	return validationSuccess;
};
