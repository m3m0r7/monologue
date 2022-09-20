import { prisma } from '@/graphql/context';
import { QueryResolvers } from "@/@types/resolvers-types";

export const getEntries: QueryResolvers['getEntries'] = async (
  parent,
  args,
  context,
  info
) => {
  return await prisma.entry.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        }
      },
    },
    where: (args.conditionalEntries?.keyword ? {
      text: {
        search: args.conditionalEntries?.keyword
      },
      title: {
        search: args.conditionalEntries?.keyword
      },
    } : {}),
    orderBy: {
      ...(args.conditionalEntries?.sort === 'Recently' ? { publishedAt: "desc" } : {}),
      ...(args.conditionalEntries?.sort === 'Oldest' ? { publishedAt: "asc" } : {}),
    },
  });
};
