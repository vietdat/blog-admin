import React from 'react';
import PropTypes from 'prop-types';
import { Form as FinalForm } from 'react-final-form';

const Form = props => {
	const { onSubmit, children } = props;

	return (
		<FinalForm onSubmit={onSubmit}>
			{innerProps => (
				<form noValidate onSubmit={innerProps.handleSubmit}>
					{children(innerProps)}
				</form>
			)}
		</FinalForm>
	);
};

Form.propTypes = {
	onSubmit: PropTypes.func,
	children: PropTypes.func
};

Form.defaultProps = {
	onSubmit: null,
	children: null
};

export default Form;
