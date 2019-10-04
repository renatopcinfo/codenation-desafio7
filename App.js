import React from 'react';
import Main from './src/screens/Main';
import ApolloBoost from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloBoost({
  uri: 'https://graphql-pokemon.now.sh/',
});

export default App = () => {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
};