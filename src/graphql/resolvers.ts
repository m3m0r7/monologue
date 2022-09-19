// @see: https://zenn.dev/youichiro/articles/9e028d0a3b45e3
export const resolvers = {
  Mutation: {
    addEntry: () => {
      return {
        id: 1,
      };
    },
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
