const DEFAULT_DELIMITER = /,|\n/
const BRACKED_CONTENT_REGEX = /\[([^\]]+)\]/g
const NUMBER_LIMIT = 1000

function _escapeRegExpString(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function _processCustomDelimeter(customDelimiter: string): RegExp {
    if(customDelimiter.startsWith('[')) {
        const delimiterMatches = customDelimiter.match(BRACKED_CONTENT_REGEX) as string[];
        const delimiters = delimiterMatches.map(d => d.slice(1, -1));
        return new RegExp(delimiters.map(d => _escapeRegExpString(d)).join("|")); // Combine into regex  
    }
    return new RegExp(_escapeRegExpString(customDelimiter))
}

export function add(input: string): number {
    let inputString = input;
    let delimeter = DEFAULT_DELIMITER
    if(inputString.startsWith('//')) {
        const [customDelimiter, customString] = inputString.split('\n')
        delimeter = _processCustomDelimeter(customDelimiter.slice(2))
        inputString = customString
    }

    const splitData = inputString.split(delimeter)
    const invalidData: Array<string | number>  = [];
    const cleanedNumbers: number[] = [];
    splitData.forEach((item) => {
        const itemParsed = Number(item);
        if(isNaN(itemParsed) || itemParsed < 0) {
            invalidData.push(item)
        } else if(itemParsed <= NUMBER_LIMIT) {
            cleanedNumbers.push(itemParsed)
        }
    })
    

    if(invalidData.length) 
        throw new Error(`invalid input: ${invalidData.join(', ')}`)

    return cleanedNumbers.reduce((acc, num) => acc + num, 0)
}