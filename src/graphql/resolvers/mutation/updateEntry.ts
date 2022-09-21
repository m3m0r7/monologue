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
    data: {
      ...(args.title ? {title: args.title} : {}),
      ...(args.text ? {text: args.text} : {}),
      ...(args.eyecatch ? {eyecatch: args.eyecatch} : {}),
      tags: {
        update: args.tags.map((tag) => ({
          tag: {
            update: {
              name: tag.name,
            },
          }
        })),
      },
    },
    include: {
      tags: true,
    },
  });
};
