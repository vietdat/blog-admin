import React, { useEffect, useState } from 'react';
import {  Layout } from 'antd';
import TopMenu from './components/TopMenu';
import TopLeft from './components/TopLeft';
import TopContent from './components/TopContent';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const GET_USERS = gql`
	query GetUsers {
		users {
			_id
			firstName
			lastName
			email
		}
	}
`;

const HomePage = () => {
	
	const [users, setUsers] = useState([]);
	const { refetch } = useQuery(GET_USERS, {
		variables: {
		},
		onCompleted: (data) => {
			console.log(data.users)			
			setUsers(data.users);
		},		
	});
	
	useEffect(() => {
	
		
	refetch()		
	}, []);
	
	const dataUser = users.map(user => {
		return  <TopContent 
					key = {user._id}
					firstName = {user.firstName}
					lastName = {user.lastName}
					email = {user.email}
					typeName = {user.__typename}
				/>
	});

    return (
		<div>
			<Layout >
                <TopLeft/>            
                <Layout>                                                                 
                    <TopMenu/>                   
                    {dataUser}				      
                </Layout>
            </Layout> 
		</div>
	);
}
HomePage.propTypes = {};
export default HomePage;
