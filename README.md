# COSMIIC-Documentation Read Me

## Contents

This repository contains the source code that is built into the docs.cosmiic.org website using the open source [Docusaurus](https://docusaurus.io/), a static webpage generator tool, that converts Markdown (.md) files into styled documentation. This repository has GitHub Actions workflows to conduct test builds and deploy the website to docs.cosmiic.org through GitHub Pages.

---

## Styling

Markdown formatting for this site follows conventions listed in [COSMIIC-Docs-Template.md](./COSMIIC-Docs-Template.md).


## Editing the Site Remotely

If you are making small changes or pull requests for individual files, it may be easiest to directly change the markdown file that represents the live view you are seeking to change. Please follow contribution workflows and standard git etiquette to submit a pull request. GitHub Actions will complete a test build on pull request. Reviewers will check the status of the build and the commit notes.

## Editing the Site Locally

### Tools Needed

To locally initiate and build the Docusaurus site, you must have node.js (use the pre-built installer). Test if the download was successful by confirming versions of node and npm in your command terminal. Windows: If `npm -v` and `node -v` work in your command terminal but don’t work in the VS Code terminal, add `C:\ProgramFiles\nodejs\` to environment path variables in Advanced System Settings following these directions.

### Workflow

1. Open VS Code. Suggestion: Turn on Auto-Save settings
2. File -> Open Folder -> Documents/GitHub/Documentation-Source
3. Press Ctrl + ` to open the terminal
4. Download package dependencies into the project folder in node_modules with command `npm ci`
5. Open live preview of site in browser with command `npx docusaurus start`
6. A live preview site will be available at http://localhost:3000. As text is edited in the source code in VS Code, the tab will automatically update the live preview.
7. Use the Source Control tab in VS Code to track changes made to the project, 
8. When the branch or commit is ready to be merged into the main branch, create a pull request for GitHub following contribution workflows.
9. When a merge occurs, GitHub Actions will automatically build and serve the website code to the webserver using the commands below.

---

## Licensing

Files containing documentation of the COSMIIC System and user ecosystem are licensed to open source users by COSMIIC under the Creative Commons Attribution Only License (CC-BY-4.0). Refer to the **[license text](https://creativecommons.org/licenses/by/4.0/legalcode.txt)** to understand your permissions.

Files in the /docs/ folder of this repository are licensed under CC-BY-4.0. This includes, but is not limited to...

- Documentation of system components and system architecture, .md and other archival file types
- Test reports
- Fabrication instructions
- Software build instructions
- Example documents
    - Example IDE
    - Example BEP

Note: Attribution is REQUIRED for sharing of documentation, modified or unmodified. In the case you are redistributing COSMIIC documentation, CC-BY-4.0 mandates that "You must give appropriate credit, provide a link to the license, and indicate if changes were made" (per **[legal code page](https://creativecommons.org/licenses/by/4.0/legalcode.en)**).

Files outside of the /docs/ folder of this repository are licensed under the MIT License. Refer to the **[license text](https://mit-license.org/)** to understand your permissions.

