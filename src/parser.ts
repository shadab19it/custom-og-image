import { IncomingMessage } from "http";
import { parse } from "url";

export const parseReqs = (req: IncomingMessage) => {
  const { query = {} } = parse(req.url || "", true);
  const { author, title, image, website } = query;

  if (Array.isArray(author)) {
    throw new Error("Author must be string");
  }
  if (Array.isArray(title)) {
    throw new Error("Title must be string");
  }
  if (Array.isArray(image)) {
    throw new Error("image must be string");
  }
  if (Array.isArray(website)) {
    throw new Error("WebSite must be string");
  }

  const parseReqs = {
    author,
    title,
    image,
    website,
  };

  console.log(JSON.stringify(parseReqs));

  return parseReqs;
};
