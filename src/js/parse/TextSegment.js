function TextSegment(text) {
    return TextSegment.prototype.init(text);
}

TextSegment.prototype = {
    constructor: TextSegment,
    init: function (text) {
        this.text = text;
        this.segments = [];
        this.amendS = 7;
        this.amendE = 8;
    },
    makeSegments: function () {
        var message = this.text;
        var pos = [0, 0];
        pos = this.handleSegment(message, "css", pos);
        pos = [pos[1], pos[1]];
        this.changeAmend();
        pos = this.handleSegment(message, "script", pos);
        this.segments.push({type: "html", segment: message.substring(pos[1])});
        return this.segments;
    },
    getHtmlSegment: function (css, pos) {
        var start = css.indexOf('<style>', pos[0]);
        var end = css.indexOf('<\/style>', pos[1]);
        return [start, end];
    },
    getJsSegment: function (js, pos) {
        var start = js.indexOf('<script>', pos[0]);
        var end = js.indexOf('<\/script>', pos[1]);
        while (end < start)
            end = js.indexOf('<\/script>', start);
        return [start, end];
    },
    handleSegment: function (message, type, pos) {
        var res = [0, 0];
        var subPos = pos;
        if (type === "css")
            pos = this.getHtmlSegment(message, pos);
        else if(type === "script")
            pos = this.getJsSegment(message, pos);
        while (pos[0] != -1) {
            pos = [pos[0] + this.amendS, pos[1] + this.amendE];
            res = pos;
            //subPos[0]=截取之后的位置 subPos[1]=下一次截取的位置
            subPos[1] = pos[0];

            var html = message.substring(subPos[0], subPos[1]);
            subPos[0] = pos[0];      //重置截取START
            subPos[1] = pos[1] - this.amendE;    //重置截取END
            this.segments.push({
                type: "html",
                segment: html
            });
            //构造css/js
            var css = message.substring(subPos[0], subPos[1]);
            subPos[0] = pos[1];
            this.segments.push({
                type: type,
                segment: css
            });

            html = message.substring(pos[1] - this.amendE, pos[1]);
            this.segments.push({
                type: "html",
                segment: html
            });

            if (type == "css")
                pos = this.getHtmlSegment(message, pos);
            else
                pos = this.getJsSegment(message, pos);
        }

        return res;
    },
    changeAmend: function () {
        this.amendS = 8;
        this.amendE = 9;
    }
}
TextSegment.prototype.init.prototype = TextSegment.prototype;

export default TextSegment;