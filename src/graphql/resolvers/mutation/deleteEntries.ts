import { prisma } from '@/graphql/context';
import { MutationResolvers } from '@/@types/resolvers-types';

export const deleteEntries: MutationResolvers['deleteEntries'] = async (
  parent,
  args,
  context,
  info
) => {
  await prisma.tagsOnEntries.deleteMany({
    where: {
      entryId: {
        in: args.entryIds
          .filter((id): id is NonNullable<typeof id> => id !== null),
      },
    }
  });
  await prisma.entry.deleteMany({
    where: {
      id: {
        in: args.entryIds
          .filter((id): id is NonNullable<typeof id> => id !== null),
      },
    }
  });
  return true;
};
