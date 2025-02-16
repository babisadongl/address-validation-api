"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.root = exports.schema = void 0;
const graphql_1 = require("graphql");
const axios_1 = __importDefault(require("axios"));
// Define the GraphQL schema
exports.schema = (0, graphql_1.buildSchema)(`
  scalar JSON

  type ValidationResult {
    success: Boolean
    data: JSON
  }

  type Query {
    validateAddress(postcode: String, suburb: String, state: String): ValidationResult
  }
`);
// Define resolvers
exports.root = {
    validateAddress: (_a) => __awaiter(void 0, [_a], void 0, function* ({ postcode, suburb, state, }) {
        try {
            console.log('Triggered!!');
            // const response = await axios.get(`https://gavg8gilmf.execute-api.ap-southeast-2.amazonaws.com/staging/postcode/search.json?q=2000&state=VIC`, {
            const response = yield axios_1.default.get(`https://gavg8gilmf.execute-api.ap-southeast-2.amazonaws.com/staging/postcode/search.json`, {
                params: { q: postcode || suburb, state: state },
                headers: {
                    Authorization: `Bearer 7710a8c5-ccd1-160f-70cf03e8-b2bbaf01`,
                },
            });
            if (response.data) {
                return {
                    success: true,
                    data: response.data
                };
            }
        }
        catch (error) {
            throw new Error('Failed to validate address');
        }
    }),
};
