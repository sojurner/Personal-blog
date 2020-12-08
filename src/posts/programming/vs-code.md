---
title: "VS Code Setup"
desc: "Clearly, my favorite Code Editor is VS Code.  I go over my part of my config: theming, plugins, etc."
date: "Dec 5, 2020"
subject: "code"
tags:
  - code
author: "Paul Kim"
foregroundImg: "https://wallpapercave.com/wp/wp7241559.png"
avatar: ../../images/avatar_pk.png
---

## Intro

When it comes to code editors VS Code is, hands down, my favorite. I've tried a couple of others: Atom, Sublime Text, Visual Studio. However, I always end up going back to VS Code. Here's my VS code setup. Hope you enjoy!

## Theming

I've refined my color settings over the years to best embody my favorite dual color combination: dark blue-gray and gold.

My workbench color palette:

```javascript
// settings.json
{
  "workbench.colorCustomizations": {
    "activityBar.background": "#192233",
    "activityBarBadge.background": "#081d31",
    "activityBarBadge.foreground": "#dba510",
    "activityBar.border": "#dba510",
    "activityBar.activeBackground": "#2e3a52",
    "activityBar.foreground": "#ebb112",
    "contrastBorder": "#d3a21a",
    "editor.background": "#192233",
    "editor.lineHighlightBackground": "#031a2b57",
    "editor.selectionHighlightBackground": "#135564",
    "editor.selectionBackground": "#135564",
    "editorCursor.foreground": "#aa9704",
    "editor.foreground": "#f5dcbb",
    "editorLineNumber.foreground": "#72684c",
    "panel.border": "#dba510",
    "panelTitle.inactiveForeground": "#917312",
    "panelTitle.activeBorder": "#ebc936",
    "panelTitle.activeForeground": "#ebb112",
    "sideBar.border": "#796217",
    "sideBar.background": "#1c273a",
    "sideBarSectionHeader.border": "#cbad59",
    "sideBar.foreground": "#daa81f",
    "statusBar.background": "#263349",
    "statusBar.foreground": "#daa81f",
    "statusBar.debuggingBackground": "#192233",
    "tab.border": "#806418",
    "tab.inactiveForeground": "#635724",
    "tab.unfocusedInactiveForeground": "#635724",
    "tab.inactiveBackground": "#081229",
    "tab.activeForeground": "#f5c440",
    "terminalCursor.foreground": "#aa9704",
    "titleBar.activeBackground": "#172030",
    "titleBar.border": "#806418",
  },
}
```

Syntax Colors are a bit tricky since certain setting properties will target different texts and keywords based on the language/framework.

Nonetheless heres my syntax color palette:

```javascript
// settings.json
"editor.tokenColorCustomizations": {
    "comments": "#2a5746",
    "textMateRules": [
      {
        "scope": "constant.language",
        "settings": {
          "foreground": "#76a8fe",
          "fontStyle": "italic"
        }
      },
      {
        "scope": "entity.name.function",
        "settings": {
          "foreground": "#fdd673",
          "fontStyle": "italic underline"
        }
      },
      {
        "scope": "entity.name.tag",
        "settings": {
          "fontStyle": "bold"
        }
      },
      {
        "scope":"entity.name.type",
        "settings": {
          "foreground": "#b1b9fd",
          "fontStyle": "bold"
        }
      },
      {
        "scope": "keyword.control",
        "settings": {
          "foreground": "#ee87d4",
          "fontStyle": "italic"
        }
      },
      {
        "scope": "keyword",
        "settings": {
          "foreground": "#b5b6ff"
        }
      },
      {
        "scope": "keyword.operator",
        "settings": {
          "foreground": "#ffbb00"
        }
      },
      {
        "scope": "keyword.other",
        "settings": {
          "foreground": "#eebdff"
        }
      },
      {
        "scope": "support.function",
        "settings": {
          "foreground": "#b6a2fd"
        }
      },
      {
        "scope": "support.type.property-name",
        "settings": {
          "foreground": "#e4b667",
        }
      },
      {
        "scope": "string",
        "settings": {
          "foreground": "#ff8e8e",
          "fontStyle": "italic"
        }
      },
      {
        "scope": "variable.other",
        "settings": {
          "foreground": "#13abb1"
        }
      },
    ]
  },
```

Here is a [snapshot](https://i.ibb.co/M1kRgZ1/vs-code-theme.png) of the result.

## Plugins

There are a few plugins that I would consider essential and the rest should be
tailored depending on your dev needs.

### Essential Plugins

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)  
  Go git it!
- [Markdown Preview](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)  
  Markdown made easy.
- [Code runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)  
  Run code from any language

### Nice to Have Plugins

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  
  Hot reload for html/css pages.
- [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)  
  Spice up your folders icons
- [Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)
- [Indent Rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)

### Front-end Plugins

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
  ESLint integration
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)  
  Code Formatter for JS - CSS - HTML - MD
- [Quokka](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)
  JS/TS playground

### DevOps

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
- [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
