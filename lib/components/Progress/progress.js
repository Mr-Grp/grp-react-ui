import React from 'react';
var Progress = function (props) {
    var percent = props.percent, _a = props.strokeHeight, strokeHeight = _a === void 0 ? 15 : _a, _b = props.showText, showText = _b === void 0 ? true : _b, styles = props.styles, _c = props.theme, theme = _c === void 0 ? 'primary' : _c;
    return (React.createElement("div", { className: "progress-bar", style: styles, "data-test": "progress" },
        React.createElement("div", { className: "progress-bar-outer", style: { height: "".concat(strokeHeight, "px") }, "data-test": "progress-outer" },
            React.createElement("div", { className: "progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") }, "data-test": "progress-inner" }, showText && React.createElement("span", { className: "inner-text", "data-test": "progress-inner-text" }, "".concat(percent, "%"))))));
};
export default Progress;
