# mdpreview
 A Web Page to Render Remote Markdown File

## Query Syntax
+ `source`: `bool`, whether source code should be displayed
+ `sanitize`: `bool`, whether compiled markdown should be sanitized
+ `control`: `bool`, whether to display control area
+ `credit`: `bool`, whether to display credit area
+ `url`: `string`, markdown file to be loaded, this value should be a escaped URL and **MUST BE THE LAST KEY**

Powered By:
[Vue](https://vuejs.org)
[Marked](https://marked.js.org)
[DOMPurify](https://cure53.de/purify)
[Superagent](https://visionmedia.github.io/superagent/)
[Typora](https://typora.io)
