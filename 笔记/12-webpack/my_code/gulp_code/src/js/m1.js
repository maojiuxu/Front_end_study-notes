// 一些小的封装
// 数组去重
export function uniqArr(arr) {
    return Array.from(new Set(arr));
}

// 求和
const sum = (a, b) => a + b;

export default { // 此时导出的是一个对象，import的时候接受的是一个对象，使用时必须是 xxx.sum
    sum
}


