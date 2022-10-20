const square = document.querySelector(`.square`);
const body = document.querySelector(`body`);
const text = document.querySelector(".square>p");
const dimensions = {
    left: 0,
    top: 0,
    bottom: body.clientHeight,
    right: body.clientWidth,
    defaultWidthElem: square.style.width,
    defaultHeightElem: square.style.height,
    canJump: true,
}
const showText = () => {
    text.style.display = 'inline';
    setTimeout(() => hideText(), 2000);
}
const hideText = () => {
    text.style.display = 'none';
}
const moveLeft = () => {
    if (dimensions.left + 10 > parseInt(square.style.left)) {
        square.style.left = (parseInt(square.style.left) + 20) + `px`
        showText();
    } else square.style.left = (parseInt(square.style.left) - 10) + `px`
}
const moveTop = () => {
    if (dimensions.top + 10 > parseInt(square.style.top)) {
        square.style.top = (parseInt(square.style.top) + 20) + `px`
        showText();
    } else square.style.top = (parseInt(square.style.top) - 10) + `px`
}
const moveRight = () => {
    if (dimensions.right < parseInt(square.style.left) + square.offsetWidth + 10) {
        square.style.left = (parseInt(square.style.left) - 20) + `px`
        showText();
    } else square.style.left = (parseInt(square.style.left) + 10) + `px`
}
const moveDown = () => {
    if (dimensions.bottom < parseInt(square.style.top) + square.offsetHeight + 10) {
        square.style.top = (parseInt(square.style.top) - 20) + `px`
        showText();
    } else square.style.top = (parseInt(square.style.top) + 10) + `px`
}
const squat = () => {
    if ((parseInt(square.style.width) * 1.25 + parseInt(square.style.left)) < body.clientWidth) {
        square.style.width = (parseInt(square.style.width) * 1.25) + `px`;
        square.style.height = (parseInt(square.style.height) * 0.4) + `px`;
        document.addEventListener(`keyup`, evt => {
            undoSquat();
        })
    } else showText();
};
const undoSquat = () => {
    square.style.width = parseInt(dimensions.defaultWidthElem) + `px`;
    square.style.height = parseInt(dimensions.defaultHeightElem) + `px`;
};
const jump = () => {
    if ((parseInt(square.style.top) - 10) < 0)
        return showText();
    if (dimensions.canJump === true) {
        dimensions.canJump = false
        square.style.top = (parseInt(square.style.top) - 10) + `px`;
        setTimeout(undoJump, 500);
    }
};
const undoJump = () => {
    square.style.top = (parseInt(square.style.top) + 10) + `px`;
    dimensions.canJump = true;
};
const EVENTS = {
    37: moveLeft,
    38: moveTop,
    39: moveRight,
    40: moveDown,
    17: squat,
    32: jump
}
document.addEventListener(`keydown`, evt => {
    EVENTS[evt.keyCode] && EVENTS[evt.keyCode]();
})