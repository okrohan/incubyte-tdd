const DEFAULT_DELIMITER = /,|\n/
const NUMBER_LIMIT = 1000

export function add(input: string): number {
    let inputString = input;
    let delimeter = DEFAULT_DELIMITER
    if(inputString.startsWith('//')) {
        const [customDelimiter, customString] = inputString.split('\n')
        delimeter = new RegExp(customDelimiter.slice(2))
        inputString = customString
    }

    const inputNumbers = inputString.split(delimeter).map(numStr => Number(numStr)).filter(num => num <= NUMBER_LIMIT)
    const negativeNumbers = inputNumbers.filter(num => num < 0)
    
    if(negativeNumbers.length) 
        throw new Error(`negatives not allowed: ${negativeNumbers.join(', ')}`)

    return inputNumbers.reduce((acc, num) => acc + num, 0)
}