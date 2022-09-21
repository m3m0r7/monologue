import { prisma } from '@/graphql/context';
import { MutationResolvers } from '@/@types/resolvers-types';
import dayjs from "dayjs";

export const updateEntry: MutationResolvers['updateEntry'] = async (
  parent,
  args,
  context,
  info
) => {
  return await prisma.entry.update({
    where: {
      id: args.id
    },
    data: {
      ...(args.title ? {title: args.title} : {}),
      ...(args.text ? {text: args.text} : {}),
      ...(args.eyecatch ? {eyecatch: args.eyecatch} : {}),
      tags: {
        deleteMany: {},
        create: args.tags.map((tag) => ({
          tag: {
            create: {
              name: tag.name,
            },
          }
        })),
      },
    },
    include: {
      tags: {
        include: {
          tag: true,
        }
      },
    },
  });
};
