import { createHash } from "crypto";
import { join } from "path";
import { tmpdir } from "os";
import { writeFile } from "fs";
import { promisify } from "util";

const promisifywirtefile = promisify(writeFile);

export const writeTempFile = async (filename: string, html: string) => {
  const hashFileName = createHash("md5").update(filename).digest("hex") + ".html";
  const filepath = join(tmpdir(), hashFileName);
  await promisifywirtefile(filepath, html);
  return filepath;
};
