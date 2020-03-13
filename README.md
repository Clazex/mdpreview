# mdpreview
 A Web Page to Render Remote Markdown File

## Query Syntax
+ `source`: `bool`, default: `false`, whether source code should be displayed
+ `sanitize`: `bool`, default: `true`, whether compiled markdown should be sanitized
+ `control`: `bool`, default: `true`, whether to display control area
+ `credit`: `bool`, default: `true`, whether to display credit area
+ `lang`: `string`, default: `en_us`, language to be displayed, current available language: `en_us`, `zh_cn`, `zh_tw`
+ `url`: `string`, markdown file to be loaded, this value should be a escaped URL and **MUST BE THE LAST KEY**

Powered By:
[Vue](https://vuejs.org)
[Marked](https://marked.js.org)
[DOMPurify](https://cure53.de/purify)
[Superagent](https://visionmedia.github.io/superagent/)
[Highlight.js](https://highlightjs.org)
[Typora](https://typora.io)
