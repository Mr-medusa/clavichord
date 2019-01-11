export default function (params) {
    this.params = params;
    this.performance = function (text) {
        var me = this;
        var state = me.params.state;
        if (state.wight.hasStatus(state.wight.VSCODE_CLOSED | state.wight.CHROME_OPEN))
            me.params.browserOperator.runAnimation();

        KUTE.to(document.getElementById("paper"),
            {
                text: text || me.params.parseText
            },
            {
                easing: 'easingSinusoidalIn',
                textChars: 'all',
                duration: 3000,
                update: function () {
                    me.params.scrollBarOperator.growUp();
                },
                complete: function () {
                    if (!state.hasScroll) {
                        state.hasScroll = true;
                    }
                    if (state.isAutomationRunCode()) {
                        if (state.wight.hasStatus(state.wight.CHROME_OPEN)) {
                            me.params.browserOperator.runAnimation();
                            me.params.animationButtonOperator.history.push(me.params.browserOperator.animationName);
                            me.params.animationButtonOperator.historyIndex++;
                        }
                    }
                }
            }
        ).start();

    }
}