import { gql } from 'apollo-server-micro'
import { readFileSync } from "fs";
import * as path from 'path'

export const typeDefs = (() => {
  const schemaStr = readFileSync(
    path.join(process.cwd(), 'src/graphql/schema.gql'),
    "utf8"
  );
  return gql`
    ${schemaStr}
  `;
})();
