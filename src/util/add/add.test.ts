import { add } from "./add"

describe('math', () => {
    // #1 Adds numbers and handles edge cases
    test('handles empty string',() => {
        expect(add('')).toBe(0)
    })

    test('handles addition of two numbers',() => {
        expect(add('1,2')).toBe(3)
    })

    // #2 Adds numbers and handles edge cases
    test('handles addition of n numbers',() => {
        expect(add('1,2,3')).toBe(6)
    })

    test('handles addition of more n numbers',() => {
        expect(add('1,2,3,4')).toBe(10)
    })
    
    // #3 Allows new lines as seperator
    test('handles new line as string separator',() => {
        expect(add(`1\n2,3`)).toBe(6)
    })
})