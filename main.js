if (module.hot) {
    module.hot.accept();
}
/*css*/
import "./src/css/normalize.css"
import "./src/css/plugins/waves.min.css"
import "./src/css/simple-effect-layout.css"
import "./src/css/browser-container.css"
import "./src/css/editor-container.css"
import "./src/css/hover.css"
import "./src/css/utils.css"

/*解析器、滚动条、游览器效果*/
import State from "./src/js/state/State"
import ParseExecutor from "./src/js/parse/ParseExecutor"
import BrowserOperator from "./src/js/stage/BrowserOperator"

import ScrollBarOperator from "./src/js/dom_event/ScrollBarOperator"
import AnimationButtonOperator from "./src/js/dom_event/AnimationButtonOperator"
import TaskIconOperator from "./src/js/dom_event/TaskIconOperator"
import SidebarAnimationOperator from "./src/js/dom_event/SidebarAnimationOperator"
import EditWriter from "./src/js/stage/EditWriter"
import PopHeadingEffect from "./src/js/dom_event/effect/PopHeadingEffect"

var state = new State();
state.wight.setStatus(state.wight.CHROME_OPEN | state.wight.VSCODE_OPEN);

/*html解析*/
var parseExecutor = new ParseExecutor("Particles");
var parseText = parseExecutor.runParseText();

/*滚动条*/
var scrollBarOperator = new ScrollBarOperator({
    selector: "#code-edit",
    beCovered: "#mCSB_1_container",
    wrapHeight: $("#code-edit").innerHeight(),
});

/*背景效果*/
var popHeadingEffect = new PopHeadingEffect();

/*游览器绘制动画*/
var browserOperator = new BrowserOperator(parseExecutor.action, state),
    animationButtonOperator = new AnimationButtonOperator({
        state,
        browserOperator,
        popHeadingEffect
    });

/*任务栏*/
new TaskIconOperator(state, popHeadingEffect);

/*打字效果*/
var writer = new EditWriter({
    parseText,
    browserOperator,
    scrollBarOperator,
    animationButtonOperator,
    state,
});

/*侧边栏*/
var sidebarAnimationOperator = new SidebarAnimationOperator({
    parseExecutor,
    browserOperator,
    scrollBarOperator,
    writer,
    state
});
sidebarAnimationOperator.initWavesButtons();
sidebarAnimationOperator.switchAnimationButtons();

/**
 * init
 */
writer.performance();
// browserOperator.runAnimation();
// animationButtonOperator.history.push(browserOperator.animationName);
// animationButtonOperator.historyIndex++;






