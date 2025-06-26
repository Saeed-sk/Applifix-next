/**
 *
 * @param {string} text
 * @param {number} count
 * @return {string}
 */

export function textTrim(text: string, count: number): string {
    let hasMore = false;
    const words = text.trim().split(/\s+/);
    if (words.length > count) {
        hasMore = true;
    }
    const selected = words.slice(0, count);
    if (hasMore) {
        return selected.join(' ') + '...';
    }else{
        return selected.join(' ');
    }
}