export const composeValidators = (...validators) => value =>
	validators.reduce((error, validator) => error || validator(value), undefined);

export const requiredValidator = value =>
	value ? undefined : 'Pleae input this field!';

export const emailValidator = value => {
	const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (value.match(emailFormat)) {
		return undefined;
	}
	return 'Please enter a valid email address.';
};

export const passwordValidatorForm = value => {
	if (value.length < 8) {
		return 'Password must contain at least 6 characters'
	}

	const matchNumber = value.match(
		/(1|2|3|4|5|6|7|8|9|0)/g
	);
	if (!matchNumber) {
		return 'Password must contain at least one number'
	}

	return undefined;
};
