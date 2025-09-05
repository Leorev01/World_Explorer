import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { favoriteCodesVar } from '../state/favourites';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://countries.trevorblades.com/' }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favoriteCodes: {
            read() { return favoriteCodesVar(); }
          }
        }
      },
      Country: { keyFields: ['code'] }
    }
  })
});
