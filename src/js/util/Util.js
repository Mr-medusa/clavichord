function getViewport() {
    if (document.compatMode == "BackCompat") {
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    } else {
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
}

function amendParitclesSize() {
    $("#particles-js").attr("style", "");
    $("#particles-js").css("width", $(".content").innerWidth());
    $("#particles-js").css("height", $(".content").innerHeight());
    $("#particles-js canvas").attr("width", $(".content").innerWidth());
    $("#particles-js canvas").attr("height", $(".content").innerHeight());
}

export default {
    getViewport: getViewport,
    amendParitclesSize: amendParitclesSize
}