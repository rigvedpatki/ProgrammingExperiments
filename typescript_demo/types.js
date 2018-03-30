console.log("Hello from Typescript");
var myString;
var myNum;
var myBol;
myString = "Hello World";
myNum = 22; //int
myBol = false;
console.log(myString);
console.log(myNum);
console.log(myBol);
var myNum1 = 44 + 66; //addition
console.log(myNum1);
var myNum2 = 3.14; //float
console.log(myNum2);
var myNum3 = 0xfde; //hex
console.log(myNum3);
var myString1 = "Hi" + " how are you ?";
console.log(myString1);
console.log(myString1.slice(0, 6));
var myVar;
myVar = 5;
console.log(myVar);
myVar = "Dude";
console.log(myVar);
myVar = true;
console.log(myVar);
//Array
//let strArray: string[] = ['close', 'me'];
var strArray = ["close", "me"];
strArray.push("Hello");
strArray.push("string array");
console.log(strArray);
//let numArray: number[] = [1, 2, 3, 4.5, 0xfde, 0o1001, 0b1001];
var numArray = [1, 2, 3, 4.5, 0xfde, 513, 9];
console.log(numArray);
//let bolArray: boolean[] = [true, false, true];
var bolArray = [true, false, true];
console.log(bolArray);
//Tuple
var strNumTuple;
strNumTuple = ["Hello", 4];
console.log(strNumTuple);
//void
var myVoid = null;
console.log(myVoid);
var myNull = null;
console.log(myNull);
var myUndefined = undefined;
console.log(myUndefined);
