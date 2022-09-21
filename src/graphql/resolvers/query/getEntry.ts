import { prisma } from '@/graphql/context';
import { QueryResolvers } from "@/@types/resolvers-types";
import { getEntries } from "@/graphql/resolvers/query/getEntries";

export const getEntry: QueryResolvers['getEntry'] = async (
  parent,
  args,
  context,
  info
) => {
  return await prisma.entry.findFirst({
    include: {
      tags: {
        include: {
          tag: true,
        }
      },
    },
    where: {
      id: args.id,
    },
  });
};
