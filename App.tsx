import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/apollo/client';
import RootNavigator from './src/navigation';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RootNavigator />
      <Toast />
    </ApolloProvider>
  );
}
