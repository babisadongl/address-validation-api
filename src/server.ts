import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema, root } from './schema';
import config from './config.ts'

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for testing
  }),
);

app.listen(config.PORT, () => {
  console.log(`GraphQL proxy server running on http://localhost:${config.PORT}/graphql`);
});