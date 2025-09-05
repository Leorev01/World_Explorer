import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/apollo/client';
import RootNavigator from './src/navigation';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
    </ApolloProvider>
  );
}
