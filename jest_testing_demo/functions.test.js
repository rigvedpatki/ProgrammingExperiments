const functions = require("./functions");

// beforeEach(() => initDatabase());
// afterEach(() => closeDatabase());

// beforeAll(() => initDatabase());
// afterAll(() => closeDatabase());

// const initDatabase = () => console.log("initialized");
// const closeDatabase = () => console.log("closed");

const nameCheck = () => console.log("checking name ... ");

describe("checking names", () => {
  beforeEach(() => nameCheck());

  test("User is Jeff", () => {
    const user = "Jeff";
    expect(user).toBe("Jeff");
  });

  test("User is Karen", () => {
    const user = "Karen";
    expect(user).toBe("Karen");
  });
});

test("Adds 2 + 2 = 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

test("Adds 2 + 2 != 5 ", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});

test("Should be falsy", () => {
  expect(functions.checkValue(null)).toBeFalsy();
});

test("User should be Rigved Patki ", () => {
  expect(functions.createUser()).toEqual({
    firstName: "Rigved",
    lastName: "Patki"
  });
});

test("Should be less than 1600", () => {
  const load1 = 800;
  const load2 = 800;
  expect(load1 + load2).toBeLessThanOrEqual(1600);
});

test("There is no i in team", () => {
  expect("team").not.toMatch(/I/i);
});

test("Admin should be in username ", () => {
  usernames = ["john", "karen", "admin"];
  expect(usernames).toContain("admin");
});

test("User fetched name should be Leanne Graham", () => {
  expect.assertions(1);
  return functions.fetchUser().then(data => {
    expect(data.name).toEqual("Leanne Graham");
  });
});

test("User fetched name should be Leanne Graham", async () => {
  expect.assertions(1);
  const data = await functions.fetchUser();
  expect(data.name).toEqual("Leanne Graham");
});
