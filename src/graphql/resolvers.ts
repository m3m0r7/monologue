// @see: https://zenn.dev/youichiro/articles/9e028d0a3b45e3
import { addEntry } from "@/graphql/resolvers/mutation/addEntry";
import { getEntries } from "@/graphql/resolvers/query/getEntries";

export const resolvers = {
  Mutation: {
    addEntry,
  },
  Query: {
    getEntries,
  }
}
