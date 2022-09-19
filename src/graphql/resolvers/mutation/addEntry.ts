import { prisma } from '@/graphql/context';
import { MutationResolvers } from '@/@types/resolvers-types';
import dayjs from "dayjs";

export const addEntry: MutationResolvers['addEntry'] = async (
  parent,
  args,
  context,
  info
) => {
  return await prisma.entry.create({
    data: {
      title: args.title,
      text: args.text,
      eyecatch: args.eyecatch,
      publishedAt: dayjs().toDate(),
    }
  });
};
