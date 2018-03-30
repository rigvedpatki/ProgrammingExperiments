console.log("Hello from Typescript");

let myString: string;

let myNum: number;

let myBol: boolean;

myString = "Hello World";

myNum = 22; //int

myBol = false;

console.log(myString);
console.log(myNum);
console.log(myBol);

let myNum1: number = 44 + 66; //addition
console.log(myNum1);

let myNum2: number = 3.14; //float
console.log(myNum2);

let myNum3: number = 0xfde; //hex
console.log(myNum3);

let myString1: string = "Hi" + " how are you ?";
console.log(myString1);
console.log(myString1.slice(0, 6));

let myVar: any;
myVar = 5;
console.log(myVar);

myVar = "Dude";
console.log(myVar);

myVar = true;
console.log(myVar);

//Array
//let strArray: string[] = ['close', 'me'];
let strArray: Array<string> = ["close", "me"];

strArray.push("Hello");
strArray.push("string array");

console.log(strArray);

//let numArray: number[] = [1, 2, 3, 4.5, 0xfde, 0o1001, 0b1001];
let numArray: Array<number> = [1, 2, 3, 4.5, 0xfde, 0o1001, 0b1001];
console.log(numArray);

//let bolArray: boolean[] = [true, false, true];
let bolArray: Array<boolean> = [true, false, true];
console.log(bolArray);

//Tuple
let strNumTuple: [string, number];
strNumTuple = ["Hello", 4];
console.log(strNumTuple);

//void
let myVoid: void = null;
console.log(myVoid);

let myNull: null = null;
console.log(myNull);

let myUndefined: undefined = undefined;
console.log(myUndefined);
