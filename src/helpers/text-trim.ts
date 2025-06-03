/**
 *
 * @param {string} text
 * @param {number} count
 * @return {string}
 */

export function textTrim(text: string, count: number) {
    const words = text.trim().split(/\s+/);
    const selected = words.slice(0, count);
    return selected.join(' ');
}