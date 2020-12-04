function extend(to, _from) {
    for (let key in _from) {
        to[key] = _from[key];
    }
    return to;
};

export function toObject(arr) {
    var res = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            extend(res, arr[i]);
        }
    }
    return res;
};

export function debounce(fn, delay) {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        }, delay)
    }
}
export function throttle(fn, delay) {
    let flag = false;
    return function () {
        if (flag) return;
        flag = true
        setTimeout(() => {
            fn.apply(this, arguments);
            flag = false
        }, delay)
    }
}