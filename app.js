var app = new Vue({
    el: '#app',
    data: {
        urlInput: "https://cdn.jsdelivr.net/gh/Sciencmine/mdpreview@latest/example.md",
        source: "",
        compiled: "",
		options: {
			showSource: false,
			shouldSanitize: true,
			showControl: true,
			showCredit: true
		},
		statusCode: 200,
        langs: [
            {
                displayName: "English",
                url: "./"
            },
            {
                displayName: "简体中文",
                url: "zh-cn"
            },
            {
                displayName: "繁體中文",
                url: "zh-tw"
            }
        ],
        langChoice: ""
    },
    methods: {
        loadMd: function () {
            superagent.get(app.urlInput).end(function (error, response) {
                if (error !== null) {
                    alert(error);
                    return;
                }

				if (response.statusCode !== 200) {
                    alert("Error " + response.statusCode + "\n\n" + response.text);
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
        changeLang: function () {
            for (var i = 0; i < this.langs.length; i++) {
                if (this.langs[i].displayName === this.langChoice) {
                    window.location.href = this.langs[i].url;
                    return;
                }
            }
            alert("Unknown Language!");
        },
        loadQuery: function () {
            if (window.location.search.length > 1) {
                var searchList = window.location.search;
                searchList[0] = "&";

                var i = 0, j;
                for (var parseFinished = false; !parseFinished && i >= 0;) {
                    j = searchList.indexOf("=", i);
                    if (j === -1) {
                        alert("Error parsing queries!");
                        break;
                    }

                    var key = searchList.substr(i + 1, j - i - 1);
					console.log("key:" + key);

                    i = searchList.indexOf("&", j);
                    if (i === -1) {
                        parseFinished = true;
                        i = searchList.length;
                    }
                    
                    switch (key) {
                        case "source":
                            app.options.showSource = (searchList.substr(j + 1, i - j - 1) === "true");
                            break;
                        case "sanitize":
                            app.options.shouldSanitize = (searchList.substr(j + 1, i - j - 1) === "true");
                            break;
						case "control":
						    app.options.showControl = (searchList.substr(j + 1, i - j - 1) === "true");
							break;
						case "credit":
							app.options.showCredit = (searchList.substr(j + 1, i - j - 1) === "true");
							break;
                        case "url":
                            i = "hasUrl";
                            break;
                        default:
                            alert("Unknown query key: " + key);
                            return;
                    }
                }

                if (i === "hasUrl") {
                    app.urlInput = unescape(searchList.substr(j + 1));
                    app.loadMd();
                }
            }
        }
    }
});
