const eq: string = " + 2 2 ";
console.log(eq.split(" "));

if (stringIsValid(eq))
    console.log("Нормальная строка");
else
    console.log("Невалидная строка");

const operators: Array<string> = ["+", "-", ":", "*"];

function stringIsValid(stringToValidate: string): boolean{
    let bracketsCount = 0;
    for(let char of stringToValidate){
        if (/\s/.test(char))
            continue;

        if (char === '(')
            bracketsCount++;

        if (char === ')')
            bracketsCount--;

        if (bracketsCount < 0)
            break;

        // todo: разрабраться с isIn?
        if (!(char in operators) && isNaN(parseInt(char, 10))){
            console.log("Недопустимый символ");
            return false;
        }
    }
    if (bracketsCount !== 0)
    {
        console.log("Неправильное количество скобок")
        return false;
    }
    return true;
}
