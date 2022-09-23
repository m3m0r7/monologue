// @see: https://zenn.dev/youichiro/articles/9e028d0a3b45e3
import { addEntry } from "@/graphql/resolvers/mutation/addEntry";
import { getEntries } from "@/graphql/resolvers/query/getEntries";
import { GraphQLScalarType } from "graphql/type";
import { Kind } from "graphql/language";
import dayjs, { Dayjs } from "dayjs";
import { updateEntry } from "@/graphql/resolvers/mutation/updateEntry";
import { deleteEntries } from "@/graphql/resolvers/mutation/deleteEntries";
import { getEntry } from "@/graphql/resolvers/query/getEntry";

export const resolvers = {
  Mutation: {
    addEntry,
    updateEntry,
    deleteEntries,
  },
  Query: {
    getEntries,
    getEntry,
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    serialize(value: any) {
      return value.toString();
    },
    parseValue(value: any) {
      return dayjs(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return dayjs(parseInt(ast.value, 10));
      }
      return null;
    },
  })
}
