/*
###############################################################################################

    Fixed & Modernized Version of "isNear"
    Original Code by "pazguille"
    Fixed by Skytro // Felix feat. ChatGPT (It was a mess, thank god we have AI nower days)

###############################################################################################
*/

const isNearEnabled = true;
const mousePosition = { x: 0, y: 0 };

let eve = null;

/**
 * Module dependencies
 */
const document = window.document,
      body = document.body,
      docEl = document.documentElement,
      moveEvent = 'mousemove',
      requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || 
          function (callback) { window.setTimeout(callback, 1000 / 60); };

// Update mouse position
function update() {
    if (!eve) return;

    mousePosition.x = eve.pageX || (eve.clientX + body.scrollLeft + docEl.scrollLeft);
    mousePosition.y = eve.pageY || (eve.clientY + body.scrollTop + docEl.scrollTop);

    eve = null;
}

// Capture mousemove event
window.addEventListener(moveEvent, (e) => { eve = e; });

// Update loop
(function updateLoop() {
    requestAnimFrame(updateLoop);
    update();
})();

// Check if mouse is near an element
function isNear(element, distance = 100) {
    const rect = element.getBoundingClientRect();
    const area = {
        top: rect.top - distance,
        right: rect.right + distance,
        bottom: rect.bottom + distance,
        left: rect.left - distance
    };

    if (
        mousePosition.x >= area.left && mousePosition.x <= area.right &&
        mousePosition.y >= area.top && mousePosition.y <= area.bottom
    ) {
        if (
            mousePosition.x >= rect.left && mousePosition.x <= rect.right &&
            mousePosition.y >= rect.top && mousePosition.y <= rect.bottom
        ) {
            return 'inside';
        }

        let percentageX = 0, percentageY = 0;

        // Calculate percentage from edges
        if (mousePosition.x >= area.left && mousePosition.x <= rect.left) {
            percentageX = ((mousePosition.x - area.left) / (rect.left - area.left)) * 100;
        } else if (mousePosition.x >= rect.right && mousePosition.x <= area.right) {
            percentageX = ((area.right - mousePosition.x) / (area.right - rect.right)) * 100;
        }

        if (mousePosition.y >= area.top && mousePosition.y <= rect.top) {
            percentageY = ((mousePosition.y - area.top) / (rect.top - area.top)) * 100;
        } else if (mousePosition.y >= rect.bottom && mousePosition.y <= area.bottom) {
            percentageY = ((area.bottom - mousePosition.y) / (area.bottom - rect.bottom)) * 100;
        }

        return [Math.floor(percentageX), Math.floor(percentageY)];
    }

    return false;
}
