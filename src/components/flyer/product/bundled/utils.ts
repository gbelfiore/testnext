export function splitNumber(numberString: string): string[] {
    try {
        const final = parseFloat(numberString);
        if (isNaN(final)) {
            throw new Error('Not a number');
        }
        const finalStr = `${final}`
        const dotIndex = finalStr.indexOf('.');

        return dotIndex !== -1
            ? [finalStr.substring(0, dotIndex), finalStr.substring(dotIndex + 1)]
            : [finalStr];
    } catch (error) {
        return []
    }

}