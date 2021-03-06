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
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const Schema_1 = require("./Schema");
const Users_1 = require("./Entities/Users");
require("dotenv").config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    //mysql part of the project down below
    yield (0, typeorm_1.createConnection)({
        host: "rgnm2022.ciuaelh6mna8.us-east-1.rds.amazonaws.com",
        port: 3306,
        type: "mysql",
        database: "rgnm",
        username: "admincarl",
        password: "777GodIsMyProtection",
        logging: true,
        synchronize: true,
        entities: [Users_1.Users],
    });
    //express part of the project down below
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
        schema: Schema_1.schema,
        graphiql: true,
    }));
    app.listen(process.env.PORT || 3001, () => {
        console.log("server is running on port 3001");
    });
});
main().catch((err) => {
    console.log(err);
});
// Remember this without the /graphql route at the end of the link it won't work. So if you are working at your own localhost then you should end the link with a /graphql route to access the GraphiQL Interface and get used to it instead of the Apollo Server
