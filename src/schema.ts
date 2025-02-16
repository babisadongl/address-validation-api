import { buildSchema } from 'graphql';
import axios from 'axios';
import { GraphQLJSON } from 'graphql-type-json';

export const schema = buildSchema(`
  scalar JSON

  type ValidationResult {
    success: Boolean
    data: JSON
  }

  type Query {
    validateAddress(postcode: String, suburb: String, state: String): ValidationResult
  }
`);

export const root = {
  validateAddress: async ({
    postcode,
    suburb,
    state,
  }: {
    postcode: string;
    suburb: string;
    state: string;
  }) => {
    try {
        const response = await axios.get(`https://gavg8gilmf.execute-api.ap-southeast-2.amazonaws.com/staging/postcode/search.json`, {
        params: { q: postcode || suburb, state: state },
        headers: {
          Authorization: `Bearer 7710a8c5-ccd1-160f-70cf03e8-b2bbaf01`,
        },
      });
      if(response.data) {
        return {
          success: true,
          data: response.data
        }
      }
    } catch (error) {
      throw new Error('Failed to validate address');
    }
  },
};