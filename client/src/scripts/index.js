import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Modal } from 'antd';

let errorTimeout = null;
const token = localStorage.getItem('token');

const client = new ApolloClient({
	uri: '/graphql',
	headers: {
		authorization: token ? `Bearer ${token}` : "",
	},
	credentials: 'include',
	onError: ({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			clearTimeout(errorTimeout);
			errorTimeout = setTimeout(() => {
				const error = graphQLErrors[0].message;
				Modal.warning({
					title: error,
				});
			}, 500);
		}
		if (networkError) {
			console.log(networkError);
		}
	},
});

import Loading from './components/Loading';
import Page404 from './pages/404';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import '../styles/main.scss';

const App = () => {
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route path="/signup" component={SignUp} />
						<Route path="/profile" component={Profile} />
						<Route component={Page404} />
					</Switch>
				</Suspense>
			</BrowserRouter>
		</ApolloProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
