import { splitStringIfValid, calculateFromArr } from "./functions";
import { mainImpl } from "./calc";

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

// describe('Split string with wrong nested brackets', () => {
//     it ('should return empty', () => {
//         const input: string = '+ 3 ((- (+ 2 1)) 1)';
//         const expected: Array<string> = [];
//         const result = splitStringIfValid(input);
//         expect(expected).toEqual(result); 
//     });
// });

describe('Split two-digit number', () => {
    it ('+ 10 20 should return [+, 10, 20]', () => {
        const input = '+ 10 20';
        const expected: Array<string> = ['+', '10', '20'];
        const result = splitStringIfValid(input);
        expect(result).toEqual(expected);
    });
});

describe('Calculate empty arr', () => {
    it ('should return null', () => {
        const input = [];
        const res = calculateFromArr(input)
        expect(isNaN(res)).toBeTruthy;
    });
});

describe('Calculate simple + 2 2', () => {
    it ('should return 4', () => {
        const input = ['+', '2', '2'];
        const res = calculateFromArr(input);
        const expected = 4;
        expect(res).toEqual(expected);
    });
});

describe('Calculate normal', () => {
    it ('should return 4', () => {
        const input = ['+', '2', '-', '3', '1'];
        const res = calculateFromArr(input);
        const expected = 4;
        expect(res).toEqual(expected);
    });
});

describe('Calculate hard', () => {
    it ('should return 8', () => {
        const input = ['*', '+', '2', '2','-', '3', '1'];
        const res = calculateFromArr(input);
        const expected = 8;
        expect(res).toEqual(expected);
    });
});

describe('Main', () => {
    it ('+ 2 2 should return 4', () => {
        const input = '+ 2 2';
        const res = mainImpl(input);
        expect(res).toEqual(4);
    });
});

describe('Main bad input', () => {
    it ('+ 2  should return Nan', () => {
        const input = '+ 2';
        const res = mainImpl(input);
        expect(res).toEqual(NaN);
    });
});

describe('Main input with divide', () => {
    it ('/ 2 2  should return Nan', () => {
        const input = '/ 2 2';
        const res = mainImpl(input);
        expect(res).toEqual(1);
    });
});

describe('Main input with divide by zero', () => {
    it ('/ 2 0  should return Nan', () => {
        const input = '/ 2 0';
        const res = mainImpl(input);
        expect(res).toEqual(NaN);
    });
});

describe('Main with hard input', () => {
    it ('+ (- 8 (* 2 2)) 2  should return 6', () => {
        const input = '+ (- 8 (* 2 2)) 2';
        const res = mainImpl(input);
        expect(res).toEqual(6);
    });
});