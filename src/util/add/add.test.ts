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

    // #4 Supports custom delimiter 
    test('supports custom delimeter', () => {
        expect(add(`//;\n1;2`)).toBe(3)
    })

    // #5 Allow only valid inputs i.e postive numbers and zero for addn
    test('negative numbers should throw exception', () => {
        expect(() => add(`1,-2`)).toThrow(`invalid input: -2`)
        expect(() => add(`-2,-4`)).toThrow(`invalid input: -2, -4`)
    })

    test('characters in input should throw exception', () => {
        expect(() => add(`1,a`)).toThrow(`invalid input: a`)
        expect(() => add(`a,b`)).toThrow(`invalid input: a, b`)
    })

    // #6 Ignore numbers more than 1000
    test('numbers more than 1000 should be ignored', () => {
        expect(add(`1,2,10001, 1002`)).toBe(3)
    })

    // #7 Delimiters can be of any length
    test('delimiters can be of any length', () => {
        expect(add('//[***]\n1***2***3')).toBe(6)
    })

    // #8 Allow multiple delimiters
    test('allows multiple delimiters', () => {
        expect(add('//[*][%]\n1*2%3')).toBe(6)
    })

    // #8 Allow multiple delimiters of multiple char length
    test("supports multiple custom delimiters of any length", () => {
        expect(add("//[***][%%]\n1***2%%3")).toBe(6);
        expect(add("//;;;\n1;;;2;;;3")).toBe(6);
      });

    // #9 Duplicate numbers 
    test("duplicate elements occuring more than twice should be added as cube of the element", () => {
        expect(add("3,3,3,3")).toBe(27)
        expect(add("3,3,3,3,2")).toBe(29)
    });


})