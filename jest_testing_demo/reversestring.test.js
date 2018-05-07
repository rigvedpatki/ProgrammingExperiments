const reverString = require("./reversestring");

test("reversestring funtion exist", () => {
  expect(reverString).toBeDefined();
});

test("string reverses", () => {
  expect(reverString("hello")).toEqual("olleh");
});

test("string reverses with uppercase", () => {
  expect(reverString("Hello")).toEqual("olleh");
});
