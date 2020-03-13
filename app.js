var app = new Vue({
    el: '#app',
    data: {
        urlInput: "https://cdn.jsdelivr.net/gh/Sciencmine/mdpreview@latest/example.md",
        source: "",
        compiled: "",
        statusCode: 200,
        langChoice: "English",
		options: {
			showSource: false,
			shouldSanitize: true,
			showControl: true,
			showCredit: true
		},
        i18n: {},
        langs: [
            {
                displayName: "English",
                id: "en_us",
                content: {
                    title: "Markdown Preview",
                    language: "Language: ",
                    mdUrl: "Markdown File URL: ",
                    load: "Load",
                    source: "Show Source",
                    sanitize: "Sanitize HTML",
                    poweredBy: "Powered By: ",
                    connectionFailure: "Connection failed",
                    connectionError: "Error ",
                    langUnknown: "Unknown language!",
                    queryParseError: "Error when parsing queries!",
                    queryUnknownKey: "Unknown query key: "
                }
            },
            {
                displayName: "简体中文",
                id: "zh_cn",
                content: {
                    title: "Markdown 预览",
                    language: "语言：",
                    mdUrl: "Markdown 文件 URL：",
                    load: "加载",
                    source: "显示源代码",
                    sanitize: "净化 HTML",
                    poweredBy: "技术支持：",
                    connectionFailure: "连接失败",
                    connectionError: "错误 ",
                    langUnknown: "未知语言！",
                    queryParseError: "解析请求时出错！",
                    queryUnknownKey: "未知请求键值："
                }
            },
            {
                displayName: "繁體中文",
                id: "zh_tw",
                content: {
                    title: "Markdown 預覽",
                    language: "語言：",
                    mdUrl: "Markdown 檔案 URL：",
                    load: "加載",
                    source: "顯示源代碼",
                    sanitize: "淨化 HTML",
                    poweredBy: "技術支持：",
                    connectionFailure: "連接失敗",
                    connectionError: "錯誤 ",
                    langUnknown: "未知語言！",
                    queryParseError: "解析請求時出錯！",
                    queryUnknownKey: "未知請求鍵值："
                }
            }
        ]
    },
    methods: {
        loadMd: function () {
            superagent.get(app.urlInput).end(function (error, response) {
                if (error !== null) {
                    alert(app.i18n.connectionFailure + "\n" + error);
                    return;
                }

				if (response.statusCode !== 200) {
                    alert(app.i18n.connectionError + response.statusCode + "\n\n" + response.text);
                }

                app.statusCode = response.statusCode, app.source = response.text;
                app.compile();
            });
        },
        compile: function () {
            var markedProcessed = marked(app.source);
            if (app.options.shouldSanitize) {
                app.compiled = DOMPurify.sanitize(markedProcessed);
            } else {
                app.compiled = markedProcessed;
            }
        },
        string2bool: function (value) {
            return value === "true" || value === "1";
        },
        loadQuery: function () {
            if (window.location.search.length > 1) {
                var searchList = "&" + window.location.search.substr(1);

                var i = 0, j;
                for (var parseFinished = false; !parseFinished && i >= 0;) {
                    j = searchList.indexOf("=", i);
                    if (j === -1) {
                        alert(app.i18n.queryParseError);
                        break;
                    }

                    var key = searchList.substr(i + 1, j - i - 1);

                    i = searchList.indexOf("&", j);
                    if (i === -1) {
                        parseFinished = true;
                        i = searchList.length;
                    }
                    
                    switch (key) {
                        case "source":
                            app.options.showSource = string2bool(searchList.substr(j + 1, i - j - 1));
                            break;
                        case "sanitize":
                            app.options.shouldSanitize = string2bool(searchList.substr(j + 1, i - j - 1));
                            break;
						case "control":
						    app.options.showControl = string2bool(searchList.substr(j + 1, i - j - 1));
							break;
						case "credit":
							app.options.showCredit = string2bool(searchList.substr(j + 1, i - j - 1));
                            break;
                        case "lang":
                            var langId = searchList.substr(j + 1, i - j - 1);
                            var i = 0;

                            for (; i < app.langs.length; i++) {
                                if (app.langs[i].id === langId) {
                                    app.langChoice = app.langs[i].displayName;
                                    break;
                                }
                            }

                            if (i === app.langs.length) {
                                alert(app.i18n.langUnknown);
                            }
                            break;
                        case "url":
                            i = "hasUrl";
                            break;
                        default:
                            alert(app.i18n.queryUnknownKey + key);
                            return;
                    }
                }

                if (i === "hasUrl") {
                    app.urlInput = unescape(searchList.substr(j + 1));
                    app.loadMd();
                }
            }
        },
        loadi18n: function () {
            for (var i = 0; i < app.langs.length; i++) {
                if (app.langs[i].displayName === app.langChoice) {
                    app.i18n = app.langs[i].content;
                    document.title = app.i18n.title;
                    return;
                }
            }
            
            alert(app.i18n.langUnknown);
        },
        init: function () {
            for (var i = 0; i < app.langs.length; i++) {
                if (app.langs[i].displayName === app.langChoice) {
                    app.i18n = app.langs[i].content;
                    break;
                }
            }

            app.loadQuery();
            app.loadi18n();
        }
    }
});
