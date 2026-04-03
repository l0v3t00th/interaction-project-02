(function () {
    var STAGE_W = 1665;
    var STAGE_H = 738;
    var VIEWPORT_PAD = 20;

    function fitStageToViewport() {
        var scaler = document.getElementById("stage-scaler");
        var stage = document.getElementById("stage");
        if (!scaler || !stage) return;
        var vw = window.innerWidth - VIEWPORT_PAD;
        var vh = window.innerHeight - VIEWPORT_PAD;
        if (vw < 1) vw = 1;
        if (vh < 1) vh = 1;
        var s = Math.min(vw / STAGE_W, vh / STAGE_H);
        stage.style.transform = "scale(" + s + ")";
        scaler.style.width = STAGE_W * s + "px";
        scaler.style.height = STAGE_H * s + "px";
    }

    window.addEventListener("resize", fitStageToViewport);
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", fitStageToViewport);
    } else {
        fitStageToViewport();
    }
})();

document.addEventListener("DOMContentLoaded", function () {
    var windows = document.querySelectorAll(".window");

    windows.forEach(function (win) {
        var tooltip = win.querySelector(".tooltip");
        if (!tooltip) return;

        var gifImg = tooltip.querySelector(".tooltip-gif");
        var textEl = tooltip.querySelector("p");
        var desc = win.getAttribute("data-tooltip") || "";
        textEl.textContent = desc;

        var gifUrl = gifImg ? gifImg.getAttribute("data-gif") : "";

        function placeTooltip(clientX, clientY) {
            var offsetX = 14;
            var offsetY = 14;
            var x = clientX + offsetX;
            var y = clientY + offsetY;
            var tw = tooltip.offsetWidth || 220;
            var th = tooltip.offsetHeight || 160;
            if (x + tw > window.innerWidth - 8) {
                x = clientX - tw - offsetX;
            }
            if (y + th > window.innerHeight - 8) {
                y = clientY - th - offsetY;
            }
            tooltip.style.left = Math.max(8, x) + "px";
            tooltip.style.top = Math.max(8, y) + "px";
        }

        win.addEventListener("mouseenter", function (e) {
            if (gifImg && gifUrl) {
                gifImg.src = gifUrl;
            }
            tooltip.classList.add("is-visible");
            placeTooltip(e.clientX, e.clientY);
        });

        win.addEventListener("mouseleave", function () {
            tooltip.classList.remove("is-visible");
            if (gifImg) {
                gifImg.removeAttribute("src");
            }
        });
    });
});
