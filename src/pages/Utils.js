// Validates a file name String, e.g. custom file names from the user.
function validateFileName(fileNameCandidate) {
  if (
    fileNameCandidate === null ||
    fileNameCandidate === undefined ||
    typeof fileNameCandidate !== "string"
  ) {
    throw new TypeError("Requires file name input to be a String.");
  }

  return fileNameCandidate === "" || /^[a-zA-Z0-9-_]+$/.test(fileNameCandidate);
}

// Returns the number of lines of and the tranposed version of a text string.
async function transposeAndCountLines(textString) {
  // Throws TypeError is textString is null or undefined.
  const linesArray = textString.split("\n");

  const linesCount = textString === "" ? 0 : linesArray.length;
  for (let i = 1; i < linesArray.length; i = i + 2) {
    const temp = linesArray[i - 1];
    linesArray[i - 1] = linesArray[i];
    linesArray[i] = temp;
  }
  const transposedString = linesArray.join("\n");

  return [linesCount, transposedString];
}

export { validateFileName, transposeAndCountLines };
