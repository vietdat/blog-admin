import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import {
	EyeInvisibleOutlined,
	EyeOutlined,
	CaretDownOutlined
} from '@ant-design/icons';
import {
	composeValidators,
	requiredValidator,
	emailValidator,
	passwordValidatorForm,
} from '../../helpers/form-validators';

const getValidators = ({ type, required }) => {
	const validators = [];
	if (required) {
		validators.push(requiredValidator);
	}
	if (type === 'email') {
		validators.push(emailValidator);
	}

	if (type === 'password') {
		validators.push(passwordValidatorForm);
	}

	return validators;
};

const FormInput = (props) => {
	const { label, type, required, defaultValue, placeholder, isValidate, options = [] } = props;
	const [typePassword, setTypePassword] = useState(type);

	const renderInput = (input) => {
		const commonProps = {
			id: props.name,
			defaultValue,
			...input,
		};
		if (type === 'password') {
			return <div className="border">
				<input className="no-border" {...commonProps} type={typePassword} placeholder={placeholder} />
				<div
					class='border__eye'
					onClick={() => typePassword === 'password' ? setTypePassword('text') : setTypePassword('password')}
				>
					{
						typePassword === 'password' ?
						<EyeInvisibleOutlined style={{ verticalAlign: 'bottom' }}/>
						:
						<EyeOutlined style={{ verticalAlign: 'bottom' }}/>
					}
				</div>
				<label style={{ marginRight: 3 }}>{required && ' *'}</label>
			</div>
		} else if (type === 'select') {
			return <div className="border">
				<select className="no-border" type={type} placeholder={placeholder} {...commonProps} >
					{options.map(option => <option value={option.value}>{option.label}</option>)}
				</select>
				<div>
					<CaretDownOutlined style={{ verticalAlign: 'bottom' }}/>
				</div>
				<label style={{ marginRight: 3 }}>{required && ' *'}</label>
			</div>
		}
		return <div className="border">
			<input className="no-border" type={type} placeholder={placeholder} {...commonProps} />
			<label style={{ marginRight: 3 }}>{required && ' *'}</label>
		</div>
	};

	return (
		<Field
			validate={composeValidators(...getValidators(props))}
			name={props.name}
			{...props}
		>
			{({ input, meta }) => (
				<div className="input">
					{label && (
						<label htmlFor={props.name}>
							{label}
							{required && ' *'}
						</label>
					)}
					{renderInput(input)}
					{meta.error && (meta.modified || isValidate) && (
						<span className="input-error">{meta.error}</span>
					)}
				</div>
			)}
		</Field>
	);
};

FormInput.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	type: PropTypes.string,
	defaultValue: PropTypes.string,
	required: PropTypes.bool,
};

FormInput.defaultProps = {
	label: '',
	type: 'text',
	defaultValue: '',
	required: false,
};

export default FormInput;
