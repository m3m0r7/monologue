import { prisma } from '@/graphql/context';
import { QueryResolvers } from "@/@types/resolvers-types";
import { Pager } from "@/@types/Pager";
import { Entry } from "@/@types/Entry";
import { TagsOnEntries } from "@/@types/TagsOnEntries";
import { Tag } from "@/@types/Tag";
import dayjs from "dayjs";

export const getEntry: QueryResolvers['getEntry'] = async (
  parent,
  args,
  context,
  info
) => {
  const entry = await prisma.entry.findFirst({
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

  if (!entry) {
    return null;
  }

  const [result]: [Pager] = await prisma.$queryRaw`
    select
        (select min(id) from Entry where id > ${args.id} limit 1) as next,
        (select max(id) from Entry where id < ${args.id} limit 1) as prev
    from Entry
  `;

  return {
    ...entry,
    publishedAt: dayjs(entry.publishedAt),
    pager: result,
  };
};
