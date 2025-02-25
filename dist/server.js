"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const cors_1 = __importDefault(require("cors"));
const schema_1 = require("./schema");
const config_ts_1 = __importDefault(require("./config.ts"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.schema,
    rootValue: schema_1.root,
    graphiql: true, // Enable GraphiQL for testing
}));
app.listen(config_ts_1.default.PORT, () => {
    console.log(`GraphQL proxy server running on http://localhost:${config_ts_1.default.PORT}/graphql`);
});
