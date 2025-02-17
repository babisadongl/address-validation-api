import { buildSchema } from 'graphql';
import axios from 'axios';
import { GraphQLJSON } from 'graphql-type-json';
import config from './config.ts'

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
        const response = await axios.get(config.LOCATION_API, {
        params: { q: postcode || suburb, state: state },
        headers: {
          Authorization: config.AUTH_TOKEN,
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