(function (window) {
    'use strict';

    var document = window.document,
        body = document.body,
        docEl = document.documentElement,
        on = window.addEventListener || window.attachEvent,
        moveEvent = (on === window.attachEvent) ? 'onmousemove' : 'mousemove',
        requestAnimFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) { window.setTimeout(callback, 1000 / 60); },
        mousePosition = { x: 0, y: 0 },
        eve;

    function updateMousePosition() {
        if (!eve) return;
        
        mousePosition.x = eve.pageX || (eve.clientX + body.scrollLeft + docEl.scrollLeft);
        mousePosition.y = eve.pageY || (eve.clientY + body.scrollTop + docEl.scrollTop);
        
        eve = undefined;
    }

    on(moveEvent, function (e) { eve = e || window.event; });

    (function updateLoop() {
        requestAnimFrame(updateLoop);
        updateMousePosition();
    }());

    function isNear(element, distance = 100) {
        var rect = element.getBoundingClientRect(),
            area = {
                top: rect.top - distance,
                right: rect.right + distance,
                bottom: rect.bottom + distance,
                left: rect.left - distance
            },
            percentageX = 0,
            percentageY = 0;

        if (mousePosition.x >= area.left && mousePosition.x <= area.right &&
            mousePosition.y >= area.top && mousePosition.y <= area.bottom) {

            if (mousePosition.x >= rect.left && mousePosition.x <= rect.right &&
                mousePosition.y >= rect.top && mousePosition.y <= rect.bottom) {
                return 'inside';
            }

            if (mousePosition.x >= area.left && mousePosition.x < rect.left) {
                percentageX = ((mousePosition.x - area.left) / (rect.left - area.left)) * 100;
            } else if (mousePosition.x > rect.right && mousePosition.x <= area.right) {
                percentageX = ((area.right - mousePosition.x) / (area.right - rect.right)) * 100;
            }

            if (mousePosition.y >= area.top && mousePosition.y < rect.top) {
                percentageY = ((mousePosition.y - area.top) / (rect.top - area.top)) * 100;
            } else if (mousePosition.y > rect.bottom && mousePosition.y <= area.bottom) {
                percentageY = ((area.bottom - mousePosition.y) / (area.bottom - rect.bottom)) * 100;
            }

            return [Math.floor(percentageX), Math.floor(percentageY)];
        }
        return false;
    }

    if (typeof window.define === 'function' && window.define.amd) {
        window.define('is-near', [], function () { return isNear; });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = isNear;
    } else {
        window.isNear = isNear;
    }
}(this));
