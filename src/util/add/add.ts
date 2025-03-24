const DEFAULT_DELIMITER = /,|\n/

export function add(input: string): number {
    let inputString = input;
    let delimeter = DEFAULT_DELIMITER
    if(inputString.startsWith('//')) {
        const [customDelimiter, customString] = inputString.split('\n')
        delimeter = new RegExp(customDelimiter.slice(2))
        inputString = customString
    }

    return inputString.split(delimeter).reduce((acc, num) => {
        return acc + Number(num)
    }, 0)
}