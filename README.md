# Project Validator

The Project Validator is a JavaScript tool designed to analyze HTML and CSS files to ensure that certain requirements are met. It scans the provided HTML and CSS files, combines them, and then checks for specific elements and styles according to predefined criteria using DOM manipulation.

## How to Use

### Running Tests:

1. Click the "**Run Tests**" button after selecting HTML and CSS files.
2. The tool will then combine the HTML content with the inline CSS styles.

### Requirements Analysis:

- The tool checks for the presence of various elements and styles based on predefined criteria using DOM manipulation.
- Errors and warnings are displayed in a textarea, indicating areas where the project may not meet the requirements.

**## Requirements Checked**

**### Welcome Section:**

- Ensures that the project contains a welcome section with an id of "**welcome-section**".
- Verifies the presence of an `<h1>` element within the welcome section.

**### Projects Section:**

- Confirms the existence of a projects section with an id of "**projects**".
- Checks for the presence of project tiles and project links within the projects section.

**### Navbar:**

- Validates the presence of a navbar with an id of "**navbar**".
- Ensures that the navbar contains valid navigation links.

**### Profile Link:**

- Verifies the presence of a valid profile link, such as links to GitHub or FreeCodeCamp.
- Checks if the profile link is configured to open in a new tab.

**### Media Queries:**

- Checks if the project includes any media queries in the CSS.

**### Viewport Height:**

- Ensures that the height of the welcome section is equal to the height of the viewport.

**### Navbar Position:**

- Verifies that the navbar remains fixed at the top of the viewport when scrolling.

**## Output**

The results of the analysis are displayed in a textarea, indicating any errors or warnings found during the evaluation process. If no issues are detected, a message indicating the absence of errors is shown.

**## Notes**

- Ensure that both HTML and CSS files are selected before clicking the "**Run Tests**" button.
- If any errors occur during the analysis, an alert will be displayed, and the process will be halted.

The Project Validator assists in ensuring that your project meets the specified requirements, helping you create a professional and user-friendly online presence.
