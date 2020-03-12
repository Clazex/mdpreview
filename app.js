var app = new Vue({
    el: '#app',
    data: {
        urlInput: "https://cdn.jsdelivr.net/gh/Sciencmine/mdpreview@latest/example.md",
        source: "",
        compiled: "",
        showSource: false,
        shouldSanitize: true,
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
            if (app.shouldSanitize) {
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
        }
    }
});