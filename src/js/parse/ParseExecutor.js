import Parser from "./Parser"
import TextSegment from "./TextSegment"

import Velocity from "./text/Velocity";
import Particles from "./text/Particles";

var players = {Velocity, Particles}

function handleSegments(segments) {
    var parseRes = "";
    var parser = new Parser();
    segments.forEach(function (segment) {
        switch (segment.type) {
            case "html":
                parser.html = segment.segment;
                parseRes += parser.parseHtml();
                break;
            case "css":
                parser.css = segment.segment;
                parseRes += parser.parseCss();
                break;
            case "script":
                parser.js = segment.segment;
                parseRes += parser.parseJs();
                break;
        }
    });
    return parseRes;
}

function ParseExecutor(action) {
    this.action = action;

    this.cacheActions = new Map();

    this.runParseText = function ParseText(action = this.action) {
        if (this.cacheActions.get(action)) {
            return this.cacheActions.get(action);
        }
            
        var Segment = new TextSegment(players[action]);
        var delicious = handleSegments(Segment.makeSegments());

        this.cacheActions.set(action, delicious);

        return delicious;
    }
}

export default ParseExecutor