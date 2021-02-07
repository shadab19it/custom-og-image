import chrome from "chrome-aws-lambda";
import { launch } from "puppeteer-core";

const exePath =
  process.platform === "win32"
    ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    : process.platform === "linux"
    ? "/usr/bin/google-chrome"
    : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

interface Options {
  args: string[];
  executablePath: string;
  headless: boolean;
}

const getOptions = (isDev: boolean) => {
  let options: Options;
  if (isDev) {
    options = {
      args: [],
      executablePath: exePath,
      headless: true,
    };
  } else {
    options = {
      args: chrome.args,
      executablePath: exePath,
      headless: chrome.headless,
    };
  }
  return options;
};

export const getScreeShot = async (url: string, isDev: boolean) => {
  const options = getOptions(isDev);
  const browsers = await launch(options);
  const page = browsers.newPage();
  (await page).setViewport({ width: 1200, height: 630 });
  (await page).goto(url);
  return (await page).screenshot({ type: "jpeg", quality: 100 });
};
