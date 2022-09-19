// @see: https://zenn.dev/youichiro/articles/9e028d0a3b45e3
import { addEntry } from "@/graphql/resolvers/mutation/addEntry";
import { getEntries } from "@/graphql/resolvers/query/getEntries";
import { GraphQLScalarType } from "graphql/type";
import { Kind } from "graphql/language";
import dayjs, { Dayjs } from "dayjs";

export const resolvers = {
  Mutation: {
    addEntry,
  },
  Query: {
    getEntries,
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    parseValue(value: any) {
      return dayjs(value);
    },
  })
}
