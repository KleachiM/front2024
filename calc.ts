import { splitStringIfValid } from "./functions";

const eq: string = "+ 2";
main(eq);

export function evaluate(splittedInput: Array<string>): number
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