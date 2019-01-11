export default function ($browser) {
    this.$performer;
    this.run = function(){
        /**
         * init
         */
        $('link[data-browser-operator-css]').replaceWith('<link rel="stylesheet" href="assert/css/browser_operator/Velocity.css" data-browser-operator-css>');
        $browser.empty();
        $browser.append('<div id="browser-operator"></div>');
        var $browserOperator = $("#browser-operator");

        $browserOperator.append('<div id="velocity-container"></div>');
        this.$performer = $("#velocity-container");
        /**
         * doSomething
         */
        function r(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        var screenWidth = $browser.width(),
            screenHeight = $browser.height();

        var translateZMin = -725,
            translateZMax = 600;
        var circleCount = 150,circlesHtml = "";

        for (var i = 0; i < circleCount; i++) {
            circlesHtml += "<div class='velocity-circle'></div>";
        }

        var $circles = $(circlesHtml);
        this.$performer
            .css("perspective-origin", screenWidth / 2 + "px " + screenHeight / 2 + "px")
            .velocity(
                {
                    perspective: [215, 50],
                    opacity: [0.90, 0.55]
                }, {
                    duration: 800,
                    loop: 1,
                    delay: 3000
                });
        $circles
            .appendTo(this.$performer)
            .velocity({
                opacity: [
                    function () {
                        return Math.random()
                    },
                    function () {
                        return Math.random() + 0.1
                    }
                ],
                translateX: [
                    function () {
                        return "+=" + r(-screenWidth / 2.5, screenWidth / 2.5)
                    },
                    function () {
                        return r(0, screenWidth)
                    }
                ],
                translateY: [
                    function () {
                        return "+=" + r(-screenHeight / 2.75, screenHeight / 2.75)
                    },
                    function () {
                        return r(0, screenHeight)
                    }
                ],
                translateZ: [
                    function () {
                        return "+=" + r(translateZMin, translateZMax)
                    },
                    function () {
                        return r(translateZMin, translateZMax)
                    }
                ]
            }, {duration: 6000})
            .velocity("reverse", {easing: "easeOutQuad"})
            .velocity({opacity: 0}, 2000);
    }
}