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
const config_ts_1 = __importDefault(require("./config.ts"));
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
exports.root = {
    validateAddress: (_a) => __awaiter(void 0, [_a], void 0, function* ({ postcode, suburb, state, }) {
        try {
            const response = yield axios_1.default.get(config_ts_1.default.LOCATION_API, {
                params: { q: postcode || suburb, state: state },
                headers: {
                    Authorization: config_ts_1.default.AUTH_TOKEN,
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
