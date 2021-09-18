import React, { useEffect } from 'react';
import TopMenu from '../components/TopMenu';
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
	const { refetch } = useQuery(GET_USERS, {
		variables: {
		},
		onCompleted: (data) => {
			console.log('data ', data);
		}
	});

	useEffect(() => {
		refetch();
	}, [])

    return (
		<div>
			<TopMenu />
		</div>
	);
}

export default HomePage;
