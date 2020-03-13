# mdpreview
 A Web Page to Render Remote Markdown File

## Query Syntax
+ `source`: `bool`, default: `false`, whether source code should be displayed
+ `sanitize`: `bool`, default: `true`, whether compiled markdown should be sanitized
+ `control`: `bool`, default: `true`, whether to display control area
+ `credit`: `bool`, default: `true`, whether to display credit area
+ `lang`: `string`, default: `en_us`, language to be displayed, current available language: `en_us`, `zh_cn`, `zh_tw`
+ `hlStyle`: `string`, default: `github-gist`, highlight style to be used, see `Hightlight Styles` for more information
+ `hlLevel`: `number`, default: `1`, level of language support for highlight, note that higher levels introduce loading delay, available levels: `1`, `2`, `3`
+ `url`: `string`, markdown file to be loaded, this value should be a escaped URL and **MUST BE THE LAST KEY**

## Highlight Styles
Available Styles:
`a11y-dark`, `a11y-light`, `agate`, `an-old-hope`, `androidstudio`, `arduino-light`, `arta`, `ascetic`, `atelier-cave-dark`, `atelier-cave-light`, `atelier-dune-dark`, `atelier-dune-light`, `atelier-estuary-dark`, `atelier-estuary-light`, `atelier-forest-dark`, `atelier-forest-light`, `atelier-heath-dark`, `atelier-heath-light`, `atelier-lakeside-dark`, `atelier-lakeside-light`, `atelier-plateau-dark`, `atelier-plateau-light`, `atelier-savanna-dark`, `atelier-savanna-light`, `atelier-seaside-dark`, `atelier-seaside-light`, `atelier-sulphurpool-dark`, `atelier-sulphurpool-light`, `atom-one-dark-reasonable`, `atom-one-dark`, `atom-one-light`, `brown-paper`, `brown-papersq`, `codepen-embed`, `color-brewer`, `darcula`, `dark`, `darkula`, `default`, `docco`, `dracula`, `far`, `foundation`, `github-gist`, `github`, `gml`, `googlecode`, `gradient-dark`, `grayscale`, `gruvbox-dark`, `gruvbox-light`, `hopscotch`, `hybrid`, `idea`, `ir-black`, `isbl-editor-dark`, `isbl-editor-light`, `kimbie.dark`, `kimbie.light`, `lightfair`, `magula`, `mono-blue`, `monokai-sublime`, `monokai`, `night-owl`, `nord`, `obsidian`, `ocean`, `paraiso-dark`, `paraiso-light`, `pojoaque`, `purebasic`, `qtcreator_dark`, `qtcreator_light`, `railscasts`, `rainbow`, `routeros`, `school-book`, `shades-of-purple`, `solarized-dark`, `solarized-light`, `sunburst`, `tomorrow-night-blue`, `tomorrow-night-bright`, `tomorrow-night-eighties`, `tomorrow-night`, `tomorrow`, `vs`, `vs2015`, `xcode`, `xt256`, `zenburn`

## Credits
[Vue](https://vuejs.org)
[Marked](https://marked.js.org)
[DOMPurify](https://cure53.de/purify)
[Superagent](https://visionmedia.github.io/superagent/)
[Highlight.js](https://highlightjs.org)
[Typora](https://typora.io)
