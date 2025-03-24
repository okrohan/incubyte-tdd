import { add } from "./add"

describe('math', () => {
    // #1 Adds numbers and handles edge cases
    test('handles empty string',() => {
        expect(add('')).toBe(0)
    })

    test('handles addition of two numbers',() => {
        expect(add('1,2')).toBe(3)
    })

    test('handles addition of n numbers',() => {
        expect(add('1,2,3')).toBe(6)
    })
    
})