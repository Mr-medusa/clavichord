export default `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Particles</title>
    <style>
        html,body  {
            margin : 0;
            padding : 0;
            height: 100%;
            width: 100%;
            font : normal 75% Arial, Helvetica, sans-serif;
            background-color: #363636;
        }
        canvas  {
            display : block;
            vertical-align : bottom;
        }
        #particles-js  {
            position : absolute;
            width : 100%;
            height : 100%;
            background-color : #090a0e;
            background-size : cover;
        }
    </style>
<script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script>
</head>
<body>
<div id="particles-js"></div>
<script>
    /* ---- particles.js config ---- */
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 200,
                "density": {
                    "enable": true,
                    "value_area": 2000
                }
            },
            "color": {
                "value": "#75A5B7"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
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
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
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
                "grab": {
                    "distance": 240,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 200,
                    "size": 8,
                    "duration": 2,
                    "opacity": 1,
                    "speed": 1
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
</script>
</body>
</html>`