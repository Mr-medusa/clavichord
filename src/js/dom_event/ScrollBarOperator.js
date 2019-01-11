export default function (params) {
    this.$selector = $(params.selector);
    this.createMCustomScrollbar = function () {
        var that = this;
        this.$selector.mCustomScrollbar({
            axis: "y",
            autoDraggerLength: true,
            autoHideScrollbar: true,
            theme: "dark",
            scrollInertia: 700,
            autoHideScrollbar: false,
            autoExpandScrollbar: false,
            mouseWheel: {
                invert: false,
                deltaFactor: 300
            },
            scrollButtons: {enable: false}
        });
    }

    this.growUp = function () {
        var $beCovered = $(params.beCovered);
        var scrollTop = $beCovered.outerHeight() - params.wrapHeight;
        if (scrollTop > 0) {
            $beCovered.css("top", "-" + scrollTop + "px");
        }
    }

    /*init*/
    this.createMCustomScrollbar();
}
