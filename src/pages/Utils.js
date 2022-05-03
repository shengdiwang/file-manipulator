// Validates a file name String, e.g. custom file names from the user.
function validateFileName(fileNameCandidate) {
  if (
    fileNameCandidate === null ||
    fileNameCandidate === undefined ||
    typeof fileNameCandidate !== "string"
  ) {
    throw new TypeError("Requires file name input to be a String.");
  }

  // forbidden characters \ / : * ? " < > |
  const regex1 = /^[^\\/:*?"<>|]+$/;
  // cannot start with space or dot (.)
  const regex2 = /^[ |.]/;
  // forbidden file names
  const regex3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i;

  return (
    fileNameCandidate === "" ||
    (regex1.test(fileNameCandidate) &&
      !regex2.test(fileNameCandidate) &&
      !regex3.test(fileNameCandidate))
  );

  // return fileNameCandidate === "" || /^[a-zA-Z0-9-_]+$/.test(fileNameCandidate);
}

// Returns the number of lines of and the tranposed version of a text string.
async function transposeAndCountLines(textString) {
  if (
    textString === null ||
    textString === undefined ||
    typeof textString !== "string"
  ) {
    throw new TypeError("Requires text input to be a String.");
  } else if (textString === "") {
    return [0, ""];
  }

  const linesArray = textString.split("\n");

  const linesCount = linesArray.length;
  for (let i = 1; i < linesArray.length; i = i + 2) {
    const temp = linesArray[i - 1];
    linesArray[i - 1] = linesArray[i];
    linesArray[i] = temp;
  }
  const transposedString = linesArray.join("\n");

  return [linesCount, transposedString];
}

export { validateFileName, transposeAndCountLines };
