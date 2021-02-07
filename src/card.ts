import { IncomingMessage, ServerResponse } from "http";
import { parseReqs } from "./parser";
import { getHtml } from "./template";
import { writeTempFile } from "./file";

export default async (req: IncomingMessage, res: ServerResponse) => {
  //   const cardInfo = {
  //     title: "Gigahex job borad",
  //     image:
  //       "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //     author: "Shadab",
  //     website: "datafever.io",
  //   };

  try {
    const parse = parseReqs(req);
    const template = getHtml(parse);
    const { title, author } = parse;

    const fileName = [title, author].join("-");

    const filePath = await writeTempFile(fileName, template);
    const fileUrl = `file:///${filePath}`;
    console.log(fileUrl);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(template);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, an error occured.</p>");
  }
};
