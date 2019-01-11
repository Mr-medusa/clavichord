function Parser(html, css, js) {
    this.html = html;
    this.css = css;
    this.js = js;

    this.sum = 0;

    /*html*/
    this.regHtml = new RegExp("<(\(?:\/?|!)\\s*\\w+)|(\\s*\\w+)(?=\\s*=)|(\".*\")|(\\s*>)|(\\n|\\r)", "g");

    //css
    this.regCss = new RegExp("(\\s*.+)(?=\\s*{)|(.+(?=\s*:\s*))|(\n|\r)", "g");

    //js
    this.regFunctionName = "(\\w+\\s*)(?=\\(.*\\))";
    this.regKeyWord = "(var|let|const|function|new|this|return|undefined|null|switch|case|break|continue)";
    this.regNumber = "(\\d+)(?=[^\"])";
    this.regJsonKey = "(\\w+\\s*(?=:))";
    this.regSemicolon = "(;)+";
    this.regString = '(\\/\\/.+)|(\\/\\*(?:\\s|.)*?\\*\\/)|("[^"]*")';

    /*构建单元行样式*/
    this.liPrefix = function (num) {
        return '<li ln="' + num + '"><span class="code">';
    }
    this.liSufix = '</span></li>'
}

Parser.prototype = {
    constructor: Parser,
    init: function () {
        this.html = this.html.innerHTML;
        this.css = this.css.innerHTML;
        this.js = this.js.innerHTML;
    },
    parseCss: function () {
        var me = this;
        var res = me.css.replace(me.regCss, function (match, group1, group2, group3) {
            if (group1)
                return me.styleHandler.handleCssSelector(group1);
            if (group2)
                return me.styleHandler.handleCssKey(group2)
            if (group3)  //保留换行
                return group3
        });
        return this.parseNewlineForArr(res);
    },
    parseHtml: function () {
        var me = this;
        var res = me.html.replace(this.regHtml, function (match, group1, group2, group3, group4, group5) {
            if (group1)
                return me.styleHandler.escapeLt + group1;
            if (group2)
                return me.styleHandler.handleHtmlProperties(group2);
            if (group3)
                return me.styleHandler.handleHtmlString(group3);
            if (group4)
                return me.styleHandler.escapeGt;
            if (group5)
                return group5;
        });
        return this.parseNewlineForArr(res);
    },
    parseJs: function () {
        var jsRes = this.parseJsHelper(this.js);
        var res = this.parseNewlineForArr(jsRes, this.sum);
        return res;
    },

    styleHandler: {
        /*css*/
        handleCssSelector: function (str) {
            return '<span class="css-selector"> ' + str + ' </span>';
        },
        handleCssKey: function (str) {
            return '<span class="css-key"> ' + str + ' </span>';
        },
        handleCssVal: function (str) {
            return '<span class="css-val"> ' + str + ' </span>';
        },
        //转义
        escapeLt: '<span class="label">&lt;',
        escapeGt: '&gt;</span>',
        handleHtmlProperties: function (str) {
            return '<span class="properties">' + str + '</span>';
        },
        handleHtmlString: function (str) {
            return '<span class="html-string">' + str + '</span>';
        },
        /*js*/
        handleKeyword: function (str) {
            return '<span class="keyword">' + str + '</span>';
        },
        handleFunctionName: function d(str) {
            return ' <span class="function-name">' + str + '</span>';
        },
        handleNumber: function (str) {
            return '<span class="number">' + str + '</span>';
        },
        handleJsonKey: function (str) {
            return '<span class="json-key">' + str + '</span>';
        },
        handleSemicolon: function (str) {
            return '<span class="semicolon">' + str + '</span>';
        },
        handleJsString: function (str) {
            return '<span class="string">' + str + '</span>';
        },
    },

    parseJsHelper: function (js) {
        var me = this;
        var regJoin = this.regFunctionName + '|' + this.regKeyWord + '|' + this.regNumber + '|' + this.regJsonKey + '|' + this.regSemicolon + "|" + this.regString;
        return js.replace(new RegExp(regJoin, "g"), function (match, group1, group2, group3, group4, group5, group6, group7, group8) {
            if (group1)
                return me.styleHandler.handleFunctionName(group1);
            if (group2)
                return me.styleHandler.handleKeyword(group2);
            if (group3)
                return me.styleHandler.handleNumber(group3);
            if (group4)
                return me.styleHandler.handleJsonKey(group4);
            if (group5)
                return me.styleHandler.handleSemicolon(group5);
            if (group6)
                return me.styleHandler.handleJsString(group6);
            if (group7) {
                //查看是否有换行，从新构建
                var starNotes = group7.split(/\n|\r/);
                var resStartNotes = [];
                for (var i = 0; i < starNotes.length; i++) {
                    resStartNotes[i] = me.styleHandler.handleJsString(starNotes[i]);
                }
                return resStartNotes.join("\n");
            }
            if (group8)
                return me.styleHandler.handleJsString(group8);
        })
    },

    parseNewlineForStr: function (text, num) {
        return this.liPrefix(num) + text + this.liSufix;
    },
    parseNewlineForArr: function (text) {
        var me = this;
        var res = "";
        var texts = text.split(/\r|\n/);
        for (var i = 0; i < texts.length; i++) {
            this.sum++;
            var temp = me.liPrefix(this.sum) + texts[i] + me.liSufix;
            res += temp;
        }
        return res;
    },

}

export default Parser


