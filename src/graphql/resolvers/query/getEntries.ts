import { prisma } from '@/graphql/context';
import { QueryResolvers } from "@/@types/resolvers-types";

export const getEntries: QueryResolvers['getEntries'] = async (
  parent,
  args,
  context,
  info
) => {
  return await prisma.entry.findMany({
    orderBy: {
      publishedAt: "desc",
    },
  });
};
