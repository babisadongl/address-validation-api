import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema, root } from './schema';

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

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`GraphQL proxy server running on http://localhost:${PORT}/graphql`);
});