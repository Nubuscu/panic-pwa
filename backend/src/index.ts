import * as ff from "@google-cloud/functions-framework";
import { buildSchema } from "graphql";

import { createHandler } from "graphql-http/lib/use/express";
import fs from "node:fs";

const rawSchema = fs.readFileSync("dist/schema.gql", "utf-8");
const schema = buildSchema(rawSchema);

// The root provides a resolver function for each API endpoint
const root = {
  hello() {
    return "Hello world!";
  },
};

const handler = createHandler({ schema: schema, rootValue: root });
ff.http("TypescriptFunction", (req, res) => handler(req, res, () => {}));
