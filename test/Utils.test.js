import { validateFileName, transposeAndCountLines } from "../src/pages/Utils";

test("null file name", () => {
  expect(() => validateFileName(null)).toThrow(TypeError);
});

test("undefined file name", () => {
  expect(() => validateFileName(undefined)).toThrow(TypeError);
});

test("file name begins with space", () => {
  expect(validateFileName(" jest_jest_jest")).toBeFalsy();
});

test("valid file name", () => {
  expect(validateFileName("jest_jest_jest")).toBeTruthy();
});

test("empty file name", () => {
  expect(validateFileName("")).toBeTruthy();
});

test("null string to transpose", () => {
  expect(() => transposeAndCountLines(null)).toThrow(TypeError);
});

test("undefined string to transpose", () => {
  expect(() => transposeAndCountLines(undefined)).toThrow(TypeError);
});

test("valid even-lines string to transpose", () => {
  expect(transposeAndCountLines("1\n2\n3\n4")).toEqual([4, "2\n1\n4\n3"]);
});

test("valid odd-lines string to transpose", () => {
  expect(transposeAndCountLines("1\n2\n3\n4\n5")).toEqual([5, "2\n1\n4\n3\n5"]);
});

test("empty string to transpose", () => {
  expect(transposeAndCountLines("")).toEqual([0, ""]);
});
