import React, { useState } from 'react';
import { Row, Col, Layout } from 'antd';
import { UserOutlined, MailOutlined, } from '@ant-design/icons';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from '../components/Loading';

const { Content } = Layout;

const GET_PROFILE = gql`
	{
		_user(id: "me") {
			_id
			firstName
			lastName
			email
		}
	}
`;

const Profile = () => {
	document.title = 'Profile - SurveySaurus';

	const [user, setUser] = useState({});

	const { loading } = useQuery(GET_PROFILE, {
		onCompleted: (data) => {
			console.log(data._user )
			if (!data || !data._user || !data._user._id) {
				return history.push('/')
			}

			setUser(data._user);
		},
	});

	if (loading) {
		return <Loading />;
	}

	return (
		<Layout>
			<Content className="profile" align="center">
					<Row align="center" justify="center">
						<Col span={8} flex>
							<h2>
								Profile
							</h2>
						</Col>
					</Row>
					<Row align="center" justify="center">
						<Col span={8} flex>
							<UserOutlined /> Name: {user.firstName + ' ' + user.lastName}
						</Col>
					</Row>
					<Row align="center" justify="center">
						<Col span={8} flex>
							<MailOutlined /> Email: {user.email}
						</Col>
					</Row>
				</Content>
		</Layout>
	);
};

Profile.propTypes = {};
export default Profile;
