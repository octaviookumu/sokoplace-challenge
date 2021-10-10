import express, { response } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { schema, root } from "./api/schema";
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser'
import Access from './entity/access'
import cors from 'cors';

dotenv.config();
createConnection().then(async connection => {
  await Access.load(); // loads all entries in the access table into the access class
  const app = express();

  const corsOptions = {
    origin: process.env.CORS_ORIGIN!,
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmarTVs) choke on 204
  };
  app.use(cors(corsOptions))
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    process.env.GRAPHQL_PATH!,
    graphqlHTTP((request, response, graphQLParams) => ({
      schema: schema,
      rootValue: root,
      graphiql: true,
      context: {
        req: request,
        res: response,
      },
    }))
  );

  app.listen(parseInt(process.env.APP_PORT!));
  const link = `http://localhost:${process.env.APP_PORT!}${
    process.env.GRAPHQL_PATH
  }`;
  console.log(link);
}).catch(error => {console.log(error)})

