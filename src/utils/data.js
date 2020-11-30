export function arrayAverag(arr, num) {
    let resultArr = [];
    num = arr.length / num;
    for (var i = 0, len = arr.length; i < len; i += num) {
        resultArr.push(arr.slice(i, i + num));
    }
    return resultArr;
}
export function arrayCount(arr) {
    return eval(arr.join('+'))
}