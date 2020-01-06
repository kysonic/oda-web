import { uniq } from '@utils/array';

/**
 * Remove empty properties from object
 * @param obj
 * @returns {*}
 */
export function removeEmpty(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj).reduce((a, [k, v]) => (v ? { ...a, [k]: v } : a), {});
}

/**
 * Merge with array concat
 * @param obj1 - defined object
 * @param obj2 - object to merge in
 * @returns {Object}
 */
export function mergeWithArrayConcat(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
    return Object.entries(obj2).reduce((a, [k, v]) => {
        if (Array.isArray(a[k]) && Array.isArray(v)) {
            v = uniq(a[k].concat(v));
        }
        return { ...a, [k]: v };
    }, obj1);
}

/**
 * Assign with descriptors
 * @param target - target object
 * @param sources - objects to mix in
 * @returns {Object}
 */
export function assign(target: Record<string, any>, ...sources: Array<any>): Record<string, any> {
    sources.forEach((source) => {
        Object.defineProperties(target, Object.keys(source).reduce((descriptors: Record<string, any>, key: string) => {
            descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
            return descriptors;
        }, {}));
    });

    return target;
}

/**
 * Pick properties from object
 * @param target - target object
 * @param props - array of props to pick
 * @returns {Object}
 */
export function pick(target: Record<string, any>, props: Array<string>): Record<string, any> {
    return props.reduce((acc: Record<string, any>, prop: any) => {
        acc[prop] = target[prop];

        return acc;
    }, {});
}
