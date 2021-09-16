import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col, Modal, Layout, Checkbox } from 'antd';
const { Content } = Layout;
import { useMutation } from '@apollo/react-hooks';
import Form from '../components/forms/Form';
import Input from '../components/forms/Input';
import { SIGN_UP } from '../mutations/userMutations';

const SignUp = () => {
	document.title = 'Register - SurveySaurus';

	const [agreeTerm, setAgreeTerm] = useState(false);
	const [isValidate, setIsValidate] = useState(false);

	const [signUp] = useMutation(SIGN_UP, {
		onCompleted: (data) => {
			if (data && data.signUp && data.signUp.token) {
				localStorage.setItem('token', data.signUp.token);

				Modal.info({
					content: 'Your account has been created successfully',
					onOk() {
						location.href = "/login";
					}
				});
			}
			console.log(data)
			Modal.error({ content: "Error" });
		},
	});

	const formSubmit = (values) => {
		if (values && values.email && values.password && values.firstName && values.lastName) {
			signUp({
				variables: {
					input: {
						email: values.email,
						password: values.password,
						firstName: values.firstName,
						lastName: values.lastName,
						hearFrom: values.hearFrom,
					},
				},
			});
		}
	};

	return (
		<div className="login">
			<Layout>
				<Content className="login__content" align="center">
					<Row align="center" justify="center">
						<Col span={8} flex>
							<h2 style={{ color: '#292d34', fontWeight: 600 }}>
								Welcome! Create an Account!
							</h2>
						</Col>
					</Row>
					<Row align="center" justify="center">
						<Col span={8} flex className="login__content__card">
							<h3 style={{ fontWeight: 400 }}>
								Account Admin
							</h3>
							<Form onSubmit={formSubmit}>
								{({ submitting }) => (
									<>
										<div style={{ display: 'flex' }}>
											<Input
												required={true}
												isValidate={isValidate}
												placeholder="First Name"
												name="firstName"
											/>
											<Input
												required={true}
												isValidate={isValidate}
												placeholder="Last Name"
												name="lastName"
											/>
										</div>
										<div style={{ display: 'flex' }}>
											<Input
												required={true}
												isValidate={isValidate}
												placeholder="Email"
												type="email"
												name="email"
											/>
										</div>
										<div style={{ display: 'flex' }}>
											<Input
												required={true}
												isValidate={isValidate}
												placeholder="Password"
												type="password"
												name="password"
											/>
										</div>
										<div style={{ display: 'flex' }}>
											<div style={{ width: '100%' }}>
												<span
													style={{
														verticalAlign: '-webkit-baseline-middle',
														fontWeight: 500
													}}
												>
													How did you hear about us?
												</span>
											</div>
											<Input
												type="select"
												name="hearFrom"
												options={[
													{
														label: 'Select...',
														value: ''
													},
													{
														label: 'Website',
														value: 'website'
													},
													{
														label: 'Facebook',
														value: 'Facebook'
													},
													{
														label: 'Google',
														value: 'Google'
													}
												]}
											/>
										</div>
										<Checkbox
											onChange={() => setAgreeTerm(!agreeTerm)}
											checked={agreeTerm}
											style={{
												marginTop: 10,
												width: '100%'
											}}
										>
											<span style={{ fontWeight: 'bold', fontSize: 12 }}>
												I agree to SurveySaurus <a href="https://facebook.com/">Terms of Services</a> and <a href="https://facebook.com/">Policy</a>
											</span>
										</Checkbox>
										<Button
											type="primary"
											htmlType="submit"
											disabled={submitting || !agreeTerm}
											style={{
												marginTop: 40
											}}
											onClick={() => setIsValidate(true)}
										>
											<span style={{ width: 130, fontWeight: 'bold'}}>SIGN UP</span>
										</Button>
										<div
												style={{
												marginTop: 20
											}}
										>
											<span style={{ fontWeight: 'bold', fontSize: 12 }}>
												Are you have an account? <a href = "/login" >Login Here.</a>
											</span>
										</div>
									</>
								)}
							</Form>
						</Col>
					</Row>
				</Content>
			</Layout>
		</div>
	);
};

SignUp.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(SignUp);
