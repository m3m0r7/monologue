import { prisma } from '@/graphql/context';
import { QueryResolvers } from "@/@types/resolvers-types";
import { Entry, NullableEntry } from "@/@types/Entry";
import dayjs from "dayjs";

export const getEntries: QueryResolvers['getEntries'] = async (
  parent,
  args,
  context,
  info
) => {
  const entries = await prisma.entry.findMany({
    include: {
      tags: {
        include: {
          tag: true,
        }
      },
    },
    where: {
      ...(args.conditionalEntries?.keyword ? {
        text: {
          search: args.conditionalEntries?.keyword
        },
        title: {
          search: args.conditionalEntries?.keyword
        },
      } : {}),
      ...(args.conditionalEntries?.entryIds ? {
        id: {
          in: args.conditionalEntries?.entryIds
            .filter((id): id is NonNullable<typeof id> => id !== null),
        },
      } : {}),
      ...(args.conditionalEntries?.tags ? {
        tags: {
          some: {
            tag: {
              name: {
                in: args.conditionalEntries?.tags,
              },
            },
          },
        }
      } : {}),
    },
    orderBy: [
      {
        ...(args.conditionalEntries?.sort === 'Recently' || !args.conditionalEntries?.sort ? { publishedAt: "desc" } : {}),
        ...(args.conditionalEntries?.sort === 'Oldest' ? { publishedAt: "asc" } : {}),
      },
      {
        ...(args.conditionalEntries?.sort === 'Recently' || !args.conditionalEntries?.sort ? { id: "desc" } : {}),
        ...(args.conditionalEntries?.sort === 'Oldest' ? { id: "asc" } : {}),
      },
    ],
  });

  return entries.map<NullableEntry>(entry => {
    return {
      ...entry,
      publishedAt: dayjs(entry.publishedAt),
    };
  });
};
