import Util from "../util/Util"

export default function ($browser) {
    this.run = function () {
        /**
         * init
         */
        $('link[data-browser-operator-css]').replaceWith('<link rel="stylesheet" href="assert/css/browser_operator/Particles.css" data-browser-operator-css>');

        $("#particles-js").find("canvas").remove();

        if($("#particles-js")[0]){
            $("#particles-js").empty();
        }else{
            $browser.empty();
            $browser.append('<div id="particles-js"></div>');
        }


        Util.amendParitclesSize();

        setTimeout(function () {
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 5,
                        "density": {
                            "enable": true,
                            "value_area": 50
                        }
                    },
                    "color": {
                        "value": "#75A5B7"
                    },
                    "shape": {
                        "type": "circle",
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "opacity_min": 0.1,
                            "sync": true
                        }
                    },
                    "size": {
                        "value": 4,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 20,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 100,
                        "color": "#87bacc",
                        "opacity": 1,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 0.5,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": true,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "resize": true
                    },
                    "modes": {
                        "bubble": {
                            "distance": 150,
                            "size": 8,
                            "duration": 2,
                            "opacity": 1,
                            "speed": 1
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        },50)

    }
}