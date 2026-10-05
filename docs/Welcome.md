---
sidebar_position: 1
slug: /
---

# Welcome to COSMIIC Docs

---

## COSMIIC Sites Map

```mermaid
%%{init: {
  "theme": "base",
  "themeVariables": {
    "fontFamily": "Inter, Helvetica, Arial, sans-serif",
    "fontSize": "14px",
    "lineColor": "#0C6F6E"
  },
  "flowchart": { "curve": "basis", "nodeSpacing": 40, "rankSpacing": 70, "padding": 30 }
}}%%
flowchart LR
    home(["<b style='font-size:16px'>Introduce</b><br/><i>cosmiic.org</i><br/>---<br/>What COSMIIC is<br/>Landing page"])
    docs(["<b style='font-size:16px'>Use</b><br/><i>docs.cosmiic.org</i><br/>---<br/>Getting started<br/>Hardware &amp; software<br/>Tutorials"])
    community(["<b style='font-size:16px'>Talk</b><br/><i>community.cosmiic.org</i><br/>---<br/>Support &amp; troubleshooting<br/>Events &amp; announcements<br/>Show &amp; tell"])
    gh(["<b style='font-size:16px'>Build</b><br/><i>github.com/COSMIIC-Community</i><br/>---<br/>Source files<br/>Issues &amp; releases"])

    home --> docs
    home --> community
    docs --> gh
    community --> gh

    %% COSMIIC teal ramp — primary #0C6F6E
    classDef mid   fill:#E7F3F3,stroke:#0C6F6E,stroke-width:2px,color:#07403F

    class home,docs,community,gh mid

    linkStyle default stroke:#0C6F6E,stroke-width:2px

    click home "https://cosmiic.org" _blank
    click docs "https://docs.cosmiic.org" _blank
    click community "https://community.cosmiic.org" _blank
    click gh "https://github.com/COSMIIC-Community" _blank
```

---

## Overview

- This Documentation site (docs.cosmiic.org) describes and links to all source files of the COSMIIC System that are necessary for benchtop, pre-clinical and human use&mdash;hardware, software, mechanical components, test documents, and regulatory documents.
- The contents of this site are available under terms of CC-BY-4.0. As such, we ask that you provide attribution when referencing this site. This site does not hold any design source files, but does contain example regulatory documents under this license. The single source of truth for COSMIIC System design source files is on GitHub.
- Refer to the **[Licensing](/Community/Licensing)** page to learn about our permissive licensing

---

## Navigating the Docs Site

- Check out the summarized material about COSMIIC System components under the **[Implantables](/category/implantables)** sidebar.
- Using MATLAB to interact with the COSMIIC System? Find the API and apps in the **[MATLAB Interface](/category/matlab-interface)** sidebar.
- Download examples of an existing Investigational Device Exemption (IDE) through the **[Resources -> Regulatory](/category/regulatory)** tabs.
- See who else is using the COSMIIC System in the **[Example Projects](/Resources/ExampleProjects)** page

---

## Get in Contact

- For questions, comments, involvement opportunities, etc., post on the [COSMIIC Forum](https://community.cosmiic.org).
- For private matters, email [open_source@cosmiic.org](mailto:open_source@cosmiic.org).

:::warning

*BETA NOTICE: This documentation site is currently in a Beta phase and is being updated fluidly. Once this documentation site reaches a state of fullness and stability, we will implement versioning (v1.0 and on) as the technology and community evolves.*
:::