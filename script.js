document.getElementById("combineButton").addEventListener("click", () => {
  const htmlFile = document.getElementById("htmlFileInput").files[0];
  const cssFile = document.getElementById("cssFileInput").files[0];

  if (!htmlFile || !cssFile) {
    alert("Please select both HTML and CSS files.");
    return;
  }

  combineHTMLWithInlineCSS(htmlFile, cssFile)
    .then((combinedHTML) => {
      // Append the combined HTML to the current webpage
      appendToHiddenDiv(combinedHTML);

      const errorMap = new Map([
        ["welcomeSectionPresent", false],
        ["hasH1", false],
        ["projectSectionPresent", true],
        ["hasProjectTile", false],
        ["hasProjectLink", false],
        ["hasProjectLinkWithhref", false],
        ["hasNavbar", true],
        ["hasValidNavbarLink", false],
        ["hasValidProfileLink", false],
        ["hasValidProfileLinkAndNewTab", false],
        ["hasMediaQuery", false],
        ["welcomeSectionHeightEqualViewPort", false],
        ["navbarIsAtTopAndFixed", true],
      ]);

      //1

      //   let welcomeSectionPresent = false;

      const welcomeSections = document.querySelectorAll("#welcome-section");
      if (welcomeSections.length == 0) {
        // welcomeSectionPresent = false;
        errorMap.set("welcomeSectionPresent", false);
      } else {
        // welcomeSectionPresent = true;
        errorMap.set("welcomeSectionPresent", true);
      }

      //2
      welcomeSections.forEach(async (section) => {
        const h1Elements = [...section.querySelectorAll("h1")];
        // let hasH1 = false;

        for (const h1Element of h1Elements) {
          const textContent = h1Element.textContent.trim();

          if (textContent.length > 0) {
            // hasH1 = true;
            errorMap.set("hasH1", true);

            // If you have any asynchronous operations here, you can await them
            // Example: await someAsyncFunction();
            break; // Exit the loop if a non-empty <h1> is found
          }
        }

      });

      //3
      //   let projectSectionPresent = 1;

      const projectSections = document.querySelectorAll("#projects");

      if (projectSections.length == 0) {
        // projectSectionPresent = 0;
        errorMap.set("projectSectionPresent", false);
      } else {
        // let hasProjectTile = 0;
        // let hasProjectLink = 0;
        // let hasProjectLinkWithhref = 0;

        for (const section of projectSections) {
          const projectTiles = section.querySelectorAll(".project-tile");

          if (projectTiles.length > 0) {
            // hasProjectTile = 1;
            errorMap.set("hasProjectTile", true);
          }

          const projectLinks = section.querySelectorAll("a");
          if (projectLinks.length > 0) {
            // hasProjectLink = 1;
            errorMap.set("hasProjectLink", true);
            for (const link of projectLinks) {
              if (link.getAttribute("href").trim() !== "") {
                // hasProjectLinkWithhref = 1;
                errorMap.set("hasProjectLinkWithhref", true);
                break;
              }
            }
          }
        }
      }

      //6
      const navbar = document.getElementById("navbar");

      //   let hasNavbar = 1;
      //   let hasValidNavbarLink = 0;

      if (!navbar) {
        // hasNavbar = 0;
        errorMap.set("hasNavbar", false);
      }

      if (errorMap.get("hasNavbar") == false) {
      } else {

        //7
        const navbarLinks = navbar.querySelectorAll("a");

        if (navbarLinks.length > 0) {
          for (const link of navbarLinks) {
            const href = link.getAttribute("href");

            if (href && href.startsWith("#")) {
              //   hasValidNavbarLink = 1;
              errorMap.set("hasValidNavbarLink", true);
              break;
            }
          }
        }
      }

      //   let hasValidProfileLink = 0;
      //   let hasValidProfileLinkAndNewTab = 0;

      const profileLinks = document.querySelectorAll("#profile-link");

      if (profileLinks.length > 0) {
        for (const link of profileLinks) {
          const href = link.getAttribute("href");
          const target = link.getAttribute("target");

          if (href) {
            if (
              href.includes("github.com") ||
              href.includes("freecodecamp.org")
            ) {
              //   hasValidProfileLink = 1;
              errorMap.set("hasValidProfileLink", true);
              if (target === "_blank") {
                // hasValidProfileLinkAndNewTab = 1;
                errorMap.set("hasValidProfileLinkAndNewTab", true);

                console.log("H new tabe");
                break;
              }
            }
          }
        }
      }


      //10

      //   let welcomeSectionHeightEqualViewPort = 0;

      let welcomeSectionHeight =
        document.getElementById("welcome-section").offsetHeight;
      let incontentheight = document.getElementById("temp_name").offsetHeight;
      if (welcomeSectionHeight == window.innerHeight) {

        // welcomeSectionHeightEqualViewPort = 1;

        errorMap.set("welcomeSectionHeightEqualViewPort", true);
      }

      //   let navbarIsAtTopAndFixed = 1;

      //11
      window.addEventListener("scroll", function () {
        const navbar = document.getElementById("navbar");
        const navbarRect = navbar.getBoundingClientRect();
        let temp_top = parseInt(navbarRect.top);

        if (Math.abs(temp_top - incontentheight) == 1) {
        } else {
          errorMap.set("navbarIsAtTopAndFixed", false);
        }
      });

      const styleElements = document.querySelectorAll("style");

      //9
      //   let hasMediaQuery = 0;
      for (const styleElement of styleElements) {
        const cssContent = styleElement.textContent || styleElement.innerText;

        const mediaQueryRegex = /@media[^{]+\{[^}]*\}/g;

        const matches = cssContent.match(mediaQueryRegex);

        if (matches !== null && matches.length > 0) {
          //   hasMediaQuery = 1;
          errorMap.set("hasMediaQuery", true);
          break;
        }
      }

      const textarea = document.getElementById("message");

      if (errorMap.get("welcomeSectionPresent") == false) {
        const paragraph = document.createElement("p");

        paragraph.textContent =
          "*Portfolio does not contain welcome section with an id of welcome-section*";
        textarea.value += paragraph.textContent + "\n";
      } else {
        if (errorMap.get("hasH1") == false) {
          const paragraph = document.createElement("p");
          paragraph.textContent =
            "*Welcome-Section does not contain h1 Element*";
          textarea.value += paragraph.textContent + "\n";

        } 
      }

      if (errorMap.get("projectSectionPresent") == false) {
        const paragraph = document.createElement("p");
        paragraph.textContent =
          "*Portfolio does not contain projects section with an id of projects*";
        textarea.value += paragraph.textContent + "\n";

      } else {

        if (errorMap.get("hasProjectTile") == false) {
          const paragraph = document.createElement("p");
          paragraph.textContent =
            "*The projects section does not contain an element with a class of project-tile*";
          textarea.value += paragraph.textContent + "\n";

        }

        if (errorMap.get("hasProjectLink") == false) {
          const paragraph = document.createElement("p");
          paragraph.textContent = "*Project-section does not contain any link*";
          textarea.value += paragraph.textContent + "\n";
        } else {
          if (errorMap.get("hasProjectLinkWithhref") == false) {
            const paragraph = document.createElement("p");
            paragraph.textContent =
              "*Project-section has link present but href is either missing or empty*";
            textarea.value += paragraph.textContent + "\n";
          }
        }
      }

      if (errorMap.get("hasNavbar") == false) {
        const paragraph = document.createElement("p");
        paragraph.textContent =
          "*Portfolio does not have a navbar with an id of navbar*";
        textarea.value += paragraph.textContent + "\n";

      } else {

        if (errorMap.get("hasValidNavbarLink") == false) {
          const paragraph = document.createElement("p");
          paragraph.textContent =
            "*The Navbar does not have any Valid link that can be used for navigation*";
          textarea.value += paragraph.textContent + "\n";

        }
      }

      if (errorMap.get("hasValidProfileLink") == false) {
        const paragraph = document.createElement("p");
        paragraph.textContent =
          "*Portfolio does not have a valid profile link*";
        textarea.value += paragraph.textContent + "\n";

      } else {

        if (errorMap.get("hasValidProfileLinkAndNewTab") == false) {
          const paragraph = document.createElement("p");
          paragraph.textContent =
            "*Portfolio have a valid link but does not have attribute to open in new tab";
          textarea.value += paragraph.textContent + "\n";

        }

        if (errorMap.get("hasMediaQuery") == false) {
          const paragraph = document.createElement("p");
          paragraph.textContent = "*Portfolio does not have any media query";
          textarea.value += paragraph.textContent + "\n";

        }

        if (errorMap.get("welcomeSectionHeightEqualViewPort") == false) {

          const paragraph = document.createElement("p");
          paragraph.textContent =
            "*The height of the welcome section is not equal to the height of the viewport";
          textarea.value += paragraph.textContent + "\n";
        }

        if (errorMap.get("navbarIsAtTopAndFixed") == false) {
          const paragraph = document.createElement("p");
          paragraph.textContent =
            "*The navbar is not always at the top of the viewport";
          textarea.value += paragraph.textContent + "\n";
        }
      }
      if (textarea.value.length === 0) {
        const paragraph = document.createElement("p");
        paragraph.textContent = "*No error, All Requirements already satisfied";
        textarea.value += paragraph.textContent + "\n";
      }
    })

    .catch((error) => {
      console.error("Error combining HTML with CSS:", error);
      alert("Failed to combine HTML with CSS.");
    });
});

function appendToHiddenDiv(htmlContent) {
  const hiddenDiv = document.getElementById("hiddenContent");
  hiddenDiv.innerHTML = htmlContent;
}
function appendHTML(htmlContent) {
  const container = document.createElement("div");
  container.innerHTML = htmlContent;

  // Append the contents of the container to the body
  document.body.appendChild(container);
}
function getSectionYCoordinate(sectionId) {
  const section = document.getElementById(sectionId);

  if (!section) {
    console.error("Section not found.");
    return null;
  }

  let sectionYCoordinate = section.offsetTop;

  sectionYCoordinate += parseInt(window.getComputedStyle(section).marginTop);
  sectionYCoordinate += parseInt(window.getComputedStyle(section).paddingTop);

  return sectionYCoordinate;
}
function combineHTMLWithInlineCSS(htmlFile, cssFile) {
  return new Promise((resolve, reject) => {
    try {
      const htmlReader = new FileReader();
      htmlReader.onload = () => {
        const cssReader = new FileReader();
        cssReader.onload = () => {
          const combinedHTML = ` <html>
            <head>
              <style>${cssReader.result}</style>
            </head>
            <body>${htmlReader.result}</body>
          </html>`;
          resolve(combinedHTML);
        };
        cssReader.onerror = () => {
          reject(new Error("Failed to read CSS file."));
        };
        cssReader.readAsText(cssFile);
      };
      htmlReader.onerror = () => {
        reject(new Error("Failed to read HTML file."));
      };
      htmlReader.readAsText(htmlFile);
    } catch (error) {
      reject(error);
    }
  });
}
