import React from 'react';
import { Button, Row, Content, Checkbox, Col, Layout } from 'antd';
import PropTypes from 'prop-types';
import {
    formSubmit,
    agreeTerm,
    setAgreeTerm,
    isValidate,
    setIsValidate
} from '../pages/SignUp';
import Form from '../components/forms/Form';
import Input from '../components/forms/Input';

const Login = () => {
    document.title = 'Login - SurveySaurus';
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
                                            >   <p style={{ fontWeight: 'bold', fontSize: 12 }}>
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
                                                    Don&rsquo;t have an account? <a>Create an Account.</a>
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

export default Login;