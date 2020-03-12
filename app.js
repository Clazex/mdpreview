var app = new Vue({
    el: '#app',
    data: {
        urlInput: "https://cdn.jsdelivr.net/gh/Sciencmine/mdpreview@master/example.md",
        source: "",
        md: "",
        compiled: "",
        showSource: false,
        shouldSanitize: true,
        statusCode: 200
    },
    methods: {
        loadMd: function () {
            superagent.get(app.urlInput).end(function (err, res) {
                app.statusCode = res.statusCode, app.source = res.text;
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