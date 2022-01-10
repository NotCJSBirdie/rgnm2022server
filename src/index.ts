import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { createConnection } from "typeorm";
import { schema } from "./Schema";
import { Users } from "./Entities/Users";

require("dotenv").config();

const main = async () => {
  //mysql part of the project down below
  await createConnection({
    host: "rgnm2022.ciuaelh6mna8.us-east-1.rds.amazonaws.com",
    port: 3306,
    type: "mysql",
    database: "rgnm",
    username: "admincarl",
    password: "777GodIsMyProtection",
    logging: true,
    synchronize: true,
    entities: [Users],
  });

  //express part of the project down below
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(process.env.PORT || 3001, () => {
    console.log("server is running on port 3001");
  });
};

main().catch((err) => {
  console.log(err);
});

// Remember this without the /graphql route at the end of the link it won't work. So if you are working at your own localhost then you should end the link with a /graphql route to access the GraphiQL Interface and get used to it instead of the Apollo Server
