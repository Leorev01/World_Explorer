import { gql } from '@apollo/client';

export const GET_CONTINENTS = gql`
  query Continents {
    continents {
      code
      name
      countries { code currency languages { code } }
    }
  }
`;

export const GET_COUNTRIES = gql`
  query Countries {
    countries {
      code
      name
      emoji
      capital
      currency
      phone
      continent { code name }
      languages { code name native }
    }
  }
`;

export const GET_COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      native
      emoji
      capital
      currency
      phone
      continent { code name }
      languages { code name native }
    }
  }
`;

