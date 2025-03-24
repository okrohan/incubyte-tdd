export function add(input: string): number {
    return input.split(',').reduce((acc, num) => {
        return acc + Number(num)
    }, 0)
}