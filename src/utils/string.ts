export function capitalizeFirst(s: string): string {
    return `${s.toString()[0].toUpperCase()}${s.slice(1)}`;
}

export function s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

export function uid(): string {
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export function cut(str: string, sub: string): string {
    return str.replace(sub, '');
}

export function toError(str: string): string {
    return str.replace(/\s/ig, '_').toUpperCase();
}
