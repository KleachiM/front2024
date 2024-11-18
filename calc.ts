import { splitStringIfValid, calculateFromArr } from "./functions";

const eq: string = "+ 5 5";
main(eq);

export function mainImpl(eq: string): number{
    const splittedInput = splitStringIfValid(eq);

    if (splittedInput.length == 0)
    {
        console.log("Невалидная строка");
        return NaN;
    }

   return calculateFromArr(splittedInput);
}

function main (eq: string)
{
    const result = mainImpl(eq);
    console.log(`Результат: ${result}`)
}