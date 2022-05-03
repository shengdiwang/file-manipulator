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

test("file name with *", () => {
  expect(validateFileName("jest_jest_jest*")).toBeFalsy();
});

test("valid file name", () => {
  expect(validateFileName("jest_jest_jest")).toBeTruthy();
});

test("empty file name", () => {
  expect(validateFileName("")).toBeTruthy();
});

test("null string to transpose", async () => {
  await expect(() => transposeAndCountLines(null)).rejects.toThrow(TypeError);
});

test("undefined string to transpose", async () => {
  await expect(() => transposeAndCountLines(undefined)).rejects.toThrow(
    TypeError
  );
});

test("valid even-lines string to transpose", async () => {
  await expect(transposeAndCountLines("1\n2\n3\n4")).resolves.toEqual([
    4,
    "2\n1\n4\n3",
  ]);
});

test("valid odd-lines string to transpose", async () => {
  await expect(transposeAndCountLines("1\n2\n3\n4\n5")).resolves.toEqual([
    5,
    "2\n1\n4\n3\n5",
  ]);
});

test("empty string to transpose", async () => {
  await expect(transposeAndCountLines("")).resolves.toEqual([0, ""]);
});
