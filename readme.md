# Easy File Manipulator

## Description

A simple React-based web application that allows you to submit a \*.txt file and a custom name. The app then echos key information about the file and provides download link to the transposed file. You may submit as many files as you want!

## Goals

Here're the main design considerations of this web application.

1. **Client-side processing.** Since we expect text files that are less than 10Kb and there's no need to persist data after the tab is closed, the tranposing of text data is done within the browser to eliminate the end for a separate server. The result is a light-weight front-end application.

2. **Quick response.** To ensure a smooth user experience, operations such as file reading and processing are done asynchronously to minimize blocking.

3. **Intuitive user experience.** Navigation between pages are easy via designated buttons. User inputs are also validated at submission, so that illegal input can be corrected on the spot.

## Folder Structure

- `public/...`: Contains the `index.html` file, which is the entry point to the web page and React.js script, and several favicon images.
- `src/App.js`: Contains top-level React.js component, which uses React Router for conditional rendering.
- `src/pages/UploadFile.js`: Component for the Upload Page, which includes a drag-and-drop zone.
- `src/pages/EchoFile.js`: Copmponent for the Post Upload Page, which echos file information and provides the download link for the tranposed file.
- `src/pages/Utils.js`: Contains utility functions used in other components.
- `src/style.css`: Contains some basic customized styling, on top of the Bootstrap stylsheet.
- `test/...`: Contains `Utils.test.js` file, which contains unit tests for utility functions, and a few text files for testing purposes.

## Running Easy File Manipulator

1. You can access the deployed app at https://easy-file-manipulator.netlify.app/.
2. Alternatively, to run Easy File Manipulator locally, first download the repository as ZIP.
3. Unzip and move files into the desired folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open http://localhost:1234/ and verify.

## Dependencies

| Project        | HomePage                                                    |
| -------------- | ----------------------------------------------------------- |
| React          | https://reactjs.org/                                        |
| Parcel         | https://parceljs.org/                                       |
| Babel          | https://babeljs.io/                                         |
| React Router   | https://reactrouter.com/docs/en/v6/getting-started/overview |
| react-dropzone | https://react-dropzone.js.org/                              |
