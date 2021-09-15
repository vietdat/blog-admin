import gql from 'graphql-tag';

export const SIGN_UP = gql`
	mutation signUpMutation(
		$input: UserInput!
	) {
		signUp(
			input: $input
		) {
			_id
			firstName
			lastName
			email
			token
		}
	}
`;
export const LOGIN = gql`
mutation logInMutation(
	$input: UserInput!
) {
	logIn(
		input: $input
	) {
		_id
		email
		token
	}
}
`;