import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Message";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
  },

  async resolve(parent: any, args: any) {
    const { name, username, password } = args;

    await Users.insert({ name, username, password });

    return args;
  },
};

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;

    const user = await Users.findOne({ username: username });

    if (!user) {
      throw new Error("USERNAME DOESN'T EXIST");
    }

    const userPassword = user?.password; //the question mark is just because we don't know who is the user; we are just trying to get a key from the user

    if (oldPassword === userPassword) {
      await Users.update({ username: username }, { password: newPassword });

      return {
        successful: true,
        message: "PASSOWRD UPDATED",
      };
    } else {
      throw new Error("Passwords do not match");
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    // const { id } = args;
    const id = args.id;

    await Users.delete(id);

    return {
      successful: true,
      message: "DELETE WORKED",
    };
  },
};
