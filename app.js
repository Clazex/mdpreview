var app = new Vue({
    el: '#app',
    data: {
        urlInput: "https://cdn.jsdelivr.net/gh/Sciencmine/mdpreview@1/example.md",
        source: "",
        md: "",
        compiled: "",
        showSource: false,
        shouldSanitize: true,
        statusCode: 200
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
                app.loadSource();
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
        loadSource: function () {
            if (app.showSource) {
                app.md = marked("```markdown\n" + app.source + "\n```");
            } else {
                app.md = "";
            }
        }
    }
});