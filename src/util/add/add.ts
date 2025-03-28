const DEFAULT_DELIMITER = /,|\n/
const BRACKED_CONTENT_REGEX = /\[([^\]]+)\]/g
const NUMBER_LIMIT = 1000

type InputElementType = Array<string | number>

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

function _processInputValidity(inputArr: InputElementType): [number[], InputElementType] {
    const invalidCharacters: InputElementType = [];
    const cleanedNumbers: number[] = [];
    inputArr.forEach((item) => {
        const itemParsed = Number(item);
        if(isNaN(itemParsed) || itemParsed < 0) {
            invalidCharacters.push(item)
        } else if(itemParsed <= NUMBER_LIMIT) {
            cleanedNumbers.push(itemParsed)
        }
    })

    return [cleanedNumbers, invalidCharacters]
}

function _processOutput(cleanedNumbers: number[]) {
    const occuranceMap = cleanedNumbers.reduce((acc, num) => {
        if(!acc.get(num)) {
            acc.set(num, 1)
        } else {
            acc.set(num, acc.get(num) + 1)
        }
        return acc;
    }, new Map())
    
    const keys = Array.from(occuranceMap.keys())

    return keys.reduce((acc, num) => {
        const count = occuranceMap.get(num)
        if(count > 2) {
            acc = acc + (num **3)
        } else {
            acc = acc + num
        }

        return acc
    }, 0)
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
    const [cleanedNumbers, invalidData] = _processInputValidity(splitData)
    

    if(invalidData.length) 
        throw new Error(`invalid input: ${invalidData.join(', ')}`)

    return _processOutput(cleanedNumbers)
}
