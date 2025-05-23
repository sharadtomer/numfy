import { CalcEngine } from "../../../src/calc";
import { CalcError } from "../../../src/evaluator/calc-error";
import { isArray } from "../../../src/utils/data-type.util";

const calc = new CalcEngine();
calc.dataStore.setVariableValue("a", 5);
calc.dataStore.setVariableValue("b", 8);
calc.dataStore.setCellValueByName("a1", 3);
calc.dataStore.setCellValueByName("a2", 3);
calc.dataStore.setCellValueByName("a3", 3);
calc.dataStore.setCellValueByName("a4", 3);
calc.dataStore.setCellValueByName("a5", 3);

describe("Test upper formula", () => {
  test("can work with int values", () => {
    const res = calc.eval("LOWER(2)");
    expect(res).toBe("2");
  });

  test("can work with negative int values", () => {
    const res = calc.eval("LOWER(-3)");
    expect(res).toBe("-3");
  });

  test("can work with float values", () => {
    const res = calc.eval("LOWER(2.5)");
    expect(res).toBe("2.5");
  });

  test("can evaluate cell ref values", () => {
    const res = calc.eval("LOWER(a1)");
    expect(res).toBe("3");
  });

  test("can evaluate cell range values", () => {
    const res = calc.eval("LOWER(a1:a3)");
    expect(isArray(res)).toBe(true);
    res.forEach(
      row => row.forEach(
        value => expect(value).toBe("3")
      ));
  });

  test("no argument throws error", () => {
    const res = calc.eval("LOWER()");
    expect(res instanceof CalcError).toBe(true);
  });

  test("multiple arguments throws error", () => {
    const res = calc.eval("LOWER(1, 2)");
    expect(res instanceof CalcError).toBe(true);
  });

  test("can work with string arguments", () => {
    const res = calc.eval('LOWER("tESt")');
    expect(res).toBe("test");
  });

  test("works correctly with boolean true value", () => {
    const res = calc.eval("LOWER(True)");
    expect(res).toBe("true");
  });

  test("works correctly with boolean false value", () => {
    const res = calc.eval("LOWER(false)");
    expect(res).toBe("false");
  });

  test("propogates error correctly", () => {
    const res = calc.eval("LOWER(2/0)");
    expect(res instanceof CalcError).toBe(true);
  });

});