import Zoo from '../animations/Zoo'

var dataBrowserOperatorCss = $('link[data-browser-operator-css]');
if (dataBrowserOperatorCss.length == 0) {
    $('head').append('<link rel="stylesheet" href="#" data-browser-operator-css >');
}
var $playAnimationTitle = $("#play-animation-title");

export default function BrowserOperator(animationName, state) {
    var zoo = new Zoo();
    this.state = state;
    this.codeAnimationName = animationName;
    this.animationName = animationName;
    this.zoo = zoo;
    this.zoo.init(state);

    this.runAnimation = function () {
        this["do" + this.animationName]();
        //extra
        $playAnimationTitle.html(this.animationName);
    }

    this.doVelocity = function () {
        this.clearNoRunAnimate(this.animationName);
        var performer = this.zoo.getAnimal(this.animationName);
        if (performer.$performer)
            performer.$performer.velocity("stop");
        performer.run();
    }

    this.doParticles = function () {
        var performer = this.zoo.getAnimal(this.animationName);
        performer.run();
    }

    this.clearNoRunAnimate = function (animationName) {
        this.zoo.animals.forEach(function (v, k) {
            if (k !== animationName) {
                if(v.stop)
                    v.stop();     
            }
        });
    }
}
