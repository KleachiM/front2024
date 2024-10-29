const operations: Array<string> = ['+', '-', ':', '*'];

const eq: string = " (+ 2 2) ";
main(eq);

function splitStringIfValid(stringToValidate: string): Array<string>
{
    const splittedString: Array<string> = [];
    let bracketsCount = 0;
    for(let char of stringToValidate)
    {
        if (/\s/.test(char))
            continue;

        console.log(`char is: ${char}`);
        if (char === '(')
        {
            bracketsCount++;
            splittedString.push(char);
            continue;
        }

        if (char === ')')
        {
            bracketsCount--;
            if (bracketsCount < 0)
                break;
            splittedString.push(char);
            continue;
        }

        if (bracketsCount < 0)
            break;

        if (isNaN(parseInt(char, 10)))
        {
            if (operations.indexOf(char) > -1)
            {
                splittedString.push(char);
                continue;
            }
            console.log(`Недопустимый символ ${char}`);
            return [];
        }
        
        splittedString.push(char);
    }
    if (bracketsCount !== 0)
    {
        console.log("Неправильное количество скобок")
        return [];
    }
    return splittedString;
}

function evaluate(splittedInput: Array<string>): number
{
    splittedInput.forEach(e => console.log(e));
    return 2;
}

function main (eq: string)
{
    const splittedInput = splitStringIfValid(eq);

    if (splittedInput.length == 0)
    {
        console.log("Невалидная строка");
        return;
    }

    const result = evaluate(splittedInput);
    console.log(`Результат: ${result}`)
}