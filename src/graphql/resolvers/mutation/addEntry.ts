import { prisma } from '@/graphql/context';
import { MutationResolvers } from '@/@types/resolvers-types';
import dayjs from "dayjs";

export const addEntry: MutationResolvers['addEntry'] = async (
  parent,
  args,
  context,
  info
) => {
  const entry = await prisma.entry.create({
    data: {
      title: args.title,
      text: args.text,
      eyecatch: args.eyecatch,
      publishedAt: dayjs().toDate(),
    }
  });

  Promise.all(args.tags.map(async (tag) => {
    const createdTag = await prisma.tag.create({
      data: {
        name: tag.name,
      },
    });
    return prisma.entryTag.create({
      data: {
        entryId: entry.id,
        tagId: createdTag.id,
      }
    });
  }));

  return entry;
};
