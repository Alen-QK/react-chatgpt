export const UtB = (str) => {
    return window.btoa(unescape(encodeURIComponent(str)));
};

export const BtU = (str) => {
    return decodeURIComponent(escape(window.atob(str)));
};