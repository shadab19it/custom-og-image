import { IncomingMessage, ServerResponse } from "http";
import { parseReqs } from "./parser";
import { getHtml } from "./template";
import { writeTempFile } from "./file";
import { getScreeShot } from "./chromiun";

// const isDev = process.env.NODE_ENV === "dev1";
const isDev = !process.env.AWS_REGION;

export default async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const parse = parseReqs(req);
    const template = getHtml(parse);
    const { title, author } = parse;

    const fileName = [title, author].join("-");

    const filePath = await writeTempFile(fileName, template);
    const fileUrl = `file:///${filePath}`;

    const file = await getScreeShot(fileUrl, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    res.setHeader("Cache-Control", "public,immutable,no-transform,s-max-age=21600,max-age=21600");
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, an error occured.</p>");
  }
};
