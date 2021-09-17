import React, {useState} from 'react';
import { Button, Row, Checkbox, Col, Layout, Modal } from 'antd';
const { Content } = Layout;
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Form from '../components/forms/Form';
import Input from '../components/forms/Input';
import { LOGIN } from '../mutations/userMutations';

const Login = () => {
    document.title = 'Login - SurveySaurus';

    const [agreeTerm, setAgreeTerm] = useState(false);
	const [isValidate, setIsValidate] = useState(false);

	const [logIn] = useMutation(LOGIN, {
		onCompleted: (data) => {
			if (data && data.logIn && data.logIn.token) {
				localStorage.setItem('token', data.logIn.token);

				Modal.info({
					content: 'Login successful',
					onOk() {
						location.href = "/homepage";
					}
				});
			}
			console.log(data)
			Modal.error({ content: "Error" });
		},
	});
    const formSubmit = (values) => {
		if (values && values.email && values.password) {
			logIn({
				variables: {
					input: {
						email: values.email,
						password: values.password,						
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
                                    Welcome Back!
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
                                            <Checkbox
                                                onChange={() => setAgreeTerm(!agreeTerm)}
                                                checked={agreeTerm}
                                                style={{
                                                    marginTop: 10,
                                                    width: '100%'
                                                }}
                                            >   <p style={{ fontWeight: 'bold', fontSize: 12, }}>
                                                    Remember Me
                                                </p>                                                
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
                                                <span style={{ width: 130, fontWeight: 'bold'}}>LOGIN</span>
                                            </Button>
                                            <div
                                                style={{
                                                    marginTop: 20
                                                }}
                                            >
                                                <span style={{ fontWeight: 'bold', fontSize: 12 }}>
                                                    Don&rsquo;t have an account? <a href= '/signup'>Create an Account.</a>
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

Login.propTypes = {
    history: PropTypes.object.isRequired,
};

export default withRouter(Login);