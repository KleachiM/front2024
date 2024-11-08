const operations: Array<string> = ['+', '-', ':', '*'];

export function getTwo(): number {
    return 2;
}

export function splitStringIfValid(stringToValidate: string): Array<string>
{
    const splittedString: Array<string> = [];
    let bracketsCount = 0;
    
    enum parserState {
        start, stop, error,
        operation, operand1, operand2,
        bracketOpen, bracketClose,
    }

    let state = parserState.start;
    for(let char of stringToValidate)
    {
        if (/\s/.test(char))
            continue;

        if (state === parserState.start){
            if (operations.indexOf(char) > -1){
                splittedString.push(char);
                state = parserState.operation;
                continue;
            }
            if (char === "("){
                state = parserState.bracketOpen;
                bracketsCount++;
                continue;
            }
            state = parserState.error;
            break;
        }

        if (state === parserState.operation){
            if (!isNaN(parseInt(char))){
                state = parserState.operand1;
                splittedString.push(char);
                continue;
            }
            if (char === "("){
                state = parserState.bracketOpen;
                bracketsCount++;
                continue;
            }
            state = parserState.error;
            break;
        }

        if (state === parserState.operand1){
            if (!isNaN(parseInt(char))){
                state = parserState.operand2;
                splittedString.push(char);
                continue;
            }
            if (char === "("){
                state = parserState.bracketOpen;
                bracketsCount++;
                continue;
            }
            if (operations.indexOf(char) > -1){
                splittedString.push(char);
                state = parserState.operation;
                continue;
            }
            state = parserState.error;
            break;
        }

        if (state === parserState.operand2){
            if (char === ")"){
                state = parserState.bracketClose;
                bracketsCount--;
                if (bracketsCount < 0)
                    break;
                continue;
            }
            state = parserState.error;
            break;
        }

        if (state === parserState.bracketOpen){
            if (char === "("){
                bracketsCount++;
                continue;
            }
            if (operations.indexOf(char) > -1){
                splittedString.push(char);
                state = parserState.operation;
                continue;
            }
            state = parserState.error;
            break;
        }

        if (state === parserState.bracketClose) {
            if (char === ")"){
                bracketsCount--;
                if (bracketsCount < 0)
                    break;
                continue;
            }
            if (!isNaN(parseInt(char))){
                state = parserState.operand2;
                splittedString.push(char);
                continue;
            }
            if (char === "("){
                bracketsCount++;
                state = parserState.bracketOpen;
                continue;
            }
            state = parserState.error;
            break;
        }
    }

    if (bracketsCount !== 0)
    {
        console.log(`Неправильное количество скобок: ${bracketsCount}`)
        return [];
    }

    if (state === parserState.operand2 || state === parserState.bracketClose)
        state = parserState.stop;

    if (state !== parserState.stop){
        console.log("Ошибка при разборе строки")
        return [];
    }

    return splittedString;
}


// function splitStringIfValid(stringToValidate: string): Array<string>
// {
//     const splittedString: Array<string> = [];
//     let bracketsCount = 0;
//     for(let char of stringToValidate)
//     {
//         if (/\s/.test(char))
//             continue;

//         console.log(`char is: ${char}`);
//         if (char === '(')
//         {
//             bracketsCount++;
//             splittedString.push(char);
//             continue;
//         }

//         if (char === ')')
//         {
//             bracketsCount--;
//             if (bracketsCount < 0)
//                 break;
//             splittedString.push(char);
//             continue;
//         }

//         if (bracketsCount < 0)
//             break;

//         if (isNaN(parseInt(char, 10)))
//         {
//             if (operations.indexOf(char) > -1)
//             {
//                 splittedString.push(char);
//                 continue;
//             }
//             console.log(`Недопустимый символ ${char}`);
//             return [];
//         }
        
//         splittedString.push(char);
//     }
//     if (bracketsCount !== 0)
//     {
//         console.log("Неправильное количество скобок")
//         return [];
//     }
//     return splittedString;
// }