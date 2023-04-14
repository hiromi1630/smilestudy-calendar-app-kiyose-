type EventObjectDoGet = {
  queryString: string;
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
  pathInfo: string;
  contextPath: '';
  contentLength: number;
};

function doGet(e: EventObjectDoGet) {
  return HtmlService.createTemplateFromFile('index.html')
    .evaluate()
    .setTitle(HTML_TITLE)
    .setFaviconUrl(HTML_FAVICON_URL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, minimal-ui');
}
