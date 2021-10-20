import express, { response } from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
import { schema, root } from "./api/schema";
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser'
import Access from './entity/access'
import cors from 'cors';
import path from 'path'

dotenv.config();
createConnection()
  .then(async (connection) => {
    await Access.load();
    const app = express();
    // const corsOptions = {
    //   origin: process.env.CORS_ORIGIN!,
    //   credentials: true,
    //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    // };
    // app.use(cors(corsOptions));
    app.use(cors());
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

    app.use(express.static("public"));

    // whenever any route except /graphql is hit it redirects to react's index.html in public folder
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });

    app.listen(parseInt(process.env.APP_PORT!));
    console.log(
      `Server started`
    );
  })
  .catch((error) => {
    console.log(error);
  });



