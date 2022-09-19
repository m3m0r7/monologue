// @see: https://zenn.dev/youichiro/articles/9e028d0a3b45e3
import { addEntry } from "@/graphql/resolvers/mutation/addEntry";

export const resolvers = {
  Mutation: {
    addEntry: addEntry
  },
  Query: {
    entries: () => {
      return [
        {
          id: 1,
        },
        {
          id: 1,
        },
        {
          id: 1,
        },
      ]
    }
  }
}
