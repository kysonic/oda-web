export function uniq(arr: Array<any>): Array<any> {
    return arr.filter((v, i, a) => a.indexOf(v) === i);
}

export function method2(): boolean {
    return false;
}
