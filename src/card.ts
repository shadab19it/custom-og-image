import { IncomingMessage, ServerResponse } from "http";

function getCss() {
  return `
  /* http://meyerweb.com/eric/tools/css/reset/
    v2.0 | 20110126
    License: none (public domain)
  */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  * {
    box-sizing: border-box;
  }
  body {
    background: #95adbe;
    height: 100vh;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    padding: 20px;
  }
  .container {
    position: relative;
    height: calc(100vh - 40px);
    padding: 20px;
    background: #f8f8f8;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  }
  .title {
    font-size: 8em;
    line-height: 1.05em;
    height: 3.15em;
    overflow: hidden;
    color: #313131;
  }
  .author {
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: 20px;
    font-size: 3em;
    color: #525252;
  }
  .author-image {
    width: 1.5em;
    border-radius: 50%;
    margin-bottom: -9px;
  }
  .website {
    position: absolute;
    bottom: 0px;
    right: 0px;
    padding: 20px;
    font-size: 2em;
    color: #525252;
  }
  `;
}

export default async (_req: IncomingMessage, res: ServerResponse) => {
  const cardInfo = {
    title: "Gigahex job borad",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    author: "Shadab",
    website: "datafever.io",
  };
  const template = `
    <!DOCTYPE html>
<html>
  <meta charset="utf-8">
  <title>Generated Image</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed&display=swap" rel="stylesheet">
  <style>
    ${getCss()}
  </style>
  <body>
    <div class="container">
      <div class="title">${cardInfo.title}</div>
      <div class="author">
        <img src="${cardInfo.image}" class="author-image" />
        ${cardInfo.author}
      </div>
      <div class="website">${cardInfo.website}</div>
    </div>
  </body>
</html>
`;
  try {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(template);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, an error occured.</p>");
  }
};
