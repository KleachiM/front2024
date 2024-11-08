import { splitStringIfValid } from "./functions";

describe('Split string', () => {
    it ('should split string', () => {
        const input: string = '+ 2 2';
        const expected: Array<string> = ['+', '2', '2'];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});

describe('Split empty string', () => {
    it ('should return empty', () => {
        const input: string = '+ 2';
        const expected: Array<string> = [];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});

describe('Split string with brackets', () => {
    it ('should split', () => {
        const input: string = '(+ 2 2)';
        const expected: Array<string> = ['+', '2', '2'];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});

describe('Split string with recursion brackets', () => {
    it ('should split', () => {
        const input: string = '+ (- 3 1) (* 3 3)';
        const expected: Array<string> = ['+', '-', '3', '1', '*', '3', '3'];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});

describe('Split string with operand2 after brackets', () => {
    it ('should split', () => {
        const input: string = '+ (- 3 1) 3';
        const expected: Array<string> = ['+', '-', '3', '1', '3'];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});

describe('Split string with operand1 before brackets', () => {
    it ('should split', () => {
        const input: string = '+ 3 (- 3 1)';
        const expected: Array<string> = ['+', '3', '-', '3', '1'];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});

describe('Split string with nested brackets', () => {
    it ('should split', () => {
        const input: string = '+ 3 (- (+ 2 1) 1)';
        const expected: Array<string> = ['+', '3', '-', '+', '2', '1', '1'];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});

describe('Split string with wrong nested brackets', () => {
    it ('should return empty', () => {
        const input: string = '+ 3 ((- (+ 2 1)) 1)';
        const expected: Array<string> = [];
        const result = splitStringIfValid(input);
        expect(expected).toEqual(result); 
    });
});