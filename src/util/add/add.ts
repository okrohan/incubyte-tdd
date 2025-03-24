const SERPARTOR = /,|\n/

export function add(input: string): number {
    return input.split(SERPARTOR).reduce((acc, num) => {
        return acc + Number(num)
    }, 0)
}