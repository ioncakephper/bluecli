# bluecli

**bluecli** is a CLI generator for CLIs.  
It lets you define your CLI’s structure, commands, and plugins using **YAML, JSON, or `.declare.js` files**, and then scaffold a complete project using familiar templates.  
Inspired by oclif, but built on [commander.js](https://github.com/tj/commander.js) for simplicity and flexibility.

<!-- doc-gen BADGES style=for-the-badge -->

[![npm version](https://img.shields.io/npm/v/bluecli.svg?style=for-the-badge)](https://www.npmjs.com/package/bluecli) [![npm downloads](https://img.shields.io/npm/dw/bluecli.svg?style=for-the-badge)](https://www.npmjs.com/package/bluecli) [![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://www.npmjs.com/package/bluecli) [![actions status](https://img.shields.io/github/actions/workflow/status/ioncakephper/bluecli/ci.yml?branch=main&style=for-the-badge)](https://github.com/ioncakephper/bluecli/actions) [![codecov](https://img.shields.io/codecov/c/github/ioncakephper/bluecli?branch=main&style=for-the-badge)](https://codecov.io/gh/ioncakephper/bluecli) [![release](https://img.shields.io/github/v/release/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/releases) [![maintained](https://img.shields.io/github/commit-activity/y/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/graphs/commit-activity) [![stars](https://img.shields.io/github/stars/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/stargazers) [![forks](https://img.shields.io/github/forks/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/network/members) [![watchers](https://img.shields.io/github/watchers/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/watchers) [![last commit](https://img.shields.io/github/last-commit/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/commits) [![contributors](https://img.shields.io/github/contributors/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/graphs/contributors) [![issues](https://img.shields.io/github/issues/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/issues) [![pull requests](https://img.shields.io/github/issues-pr/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/pulls) [![repo size](https://img.shields.io/github/repo-size/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli) [![top language](https://img.shields.io/github/languages/top/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli) [![languages](https://img.shields.io/github/languages/count/ioncakephper/bluecli?style=for-the-badge)](https://github.com/ioncakephper/bluecli/search?l=)

<!-- end-doc-gen -->

## Table of Contents

<!-- doc-gen TOC -->

- [✨ Features](#features)
- [🚀 Installation](#installation)
- [🛠 Usage](#usage)
  - [Generate a new CLI](#generate-a-new-cli)
  - [Add a command](#add-a-command)
  - [Add a plugin](#add-a-plugin)
  - [Validate a config](#validate-a-config)
  - [List available templates](#list-available-templates)
- [📂 Templates](#templates)
- [📝 Example Config (`cli.yaml`)](#example-config-cliyaml)
- [🧩 Extending Configs](#extending-configs)
- [🤝 Contributing](#contributing)
- [Helpful Scripts](#helpful-scripts)
- [📜 License](#license)
- [Acknowlegdements](#acknowlegdements)
- [Project Structure](#project-structure)
<!-- end-doc-gen -->

---

## ✨ Features

- **Declarative configs**: Define CLI properties, commands, and plugins in YAML, JSON, or JS.
- **Cascading configuration**: Extend and override base configs (like ESLint/Prettier).
- **Template-driven scaffolding**: Choose from `minimal`, `standard`, or `monorepo` structures.
- **Template engines**: Render with [EJS](https://ejs.co/) or [Handlebars](https://handlebarsjs.com/).
- **Validation**: Configs validated against a JSON Schema with [Ajv](https://ajv.js.org/).
- **Extensible**: Add your own templates or plugins.

---

## 🚀 Installation

```bash
npm install -g bluecli
```

Or use locally in a project:

```bash
npm install --save-dev bluecli
```

---

## 🛠 Usage

### Generate a new CLI

```bash
bluecli generate cli.yaml --template standard --engine ejs
```

### Add a command

```bash
bluecli generate command build
```

### Add a plugin

```bash
bluecli generate plugin auth
```

### Validate a config

```bash
bluecli validate cli.yaml
```

### List available templates

```bash
bluecli list-templates
```

---

## 📂 Templates

- **minimal** → Flat structure, single entrypoint (uses `commander`).
- **standard** → Oclif-like structure with `src/commands/`.
- **monorepo** → CLI + plugins in one repo (npm/yarn workspaces).

You can also create custom templates in:

```
~/.bluecli/templates/
```

---

## 📝 Example Config (`cli.yaml`)

```yaml
name: mycli
version: 1.0.0
description: Example CLI
template: standard
engine: ejs
commands:
  - name: build
    description: Build the project
    options:
      - name: --watch
        type: boolean
        description: Watch for changes
    args:
      - name: target
        required: true
plugins:
  - name: auth
    source: ./plugins/auth
```

---

## 🧩 Extending Configs

```yaml
extends: ./base.cli.yaml
commands:
  - name: deploy
    description: Deploy the project
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit changes (`git commit -m 'Add my feature'`)
4. Push branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## 📜 Helpful Scripts

<!-- doc-gen SCRIPTS -->

| Script   | Command                                                                | Description                                                   | Line                     |
| -------- | ---------------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------ |
| `dev`    | `nodemon ./bin/bluecli.js`                                             | Run the CLI application in development mode with live reload. | [21](./package.json#L21) |
| `docs`   | `npx markdown-magic@3.7.0 **/*.md --config ./markdown-magic.config.js` | Generate documentation from markdown files.                   | [19](./package.json#L19) |
| `format` | `prettier --write .`                                                   | Format all files in the project.                              | [23](./package.json#L23) |
| `lint`   | `eslint .`                                                             | Lint all files in the project.                                | [22](./package.json#L22) |
| `prep`   | `npm run docs && npm run lint && npm run format`                       | Prepare the project for a new release.                        | [24](./package.json#L24) |
| `start`  | `node ./bin/bluecli.js`                                                | Run the CLI application.                                      | [20](./package.json#L20) |
| `test`   | `jest`                                                                 | Run the test suite.                                           | [25](./package.json#L25) |

<!-- end-doc-gen -->

---

## 📜 License

MIT © 2025 Your Name

## Acknowlegdements

<!-- doc-gen ACKNOWLEDGEMENTS -->

- [ajv](https://www.npmjs.com/package/ajv) — Another JSON Schema Validator
- [commander](https://www.npmjs.com/package/commander) — the complete solution for node.js command-line programs
- [ejs](https://www.npmjs.com/package/ejs) — Embedded JavaScript templates
- [eslint](https://www.npmjs.com/package/eslint) — An AST-based pattern checker for JavaScript.
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) — Turns off all rules that are unnecessary or might conflict with Prettier.
- [eslint-plugin-json](https://www.npmjs.com/package/eslint-plugin-json) — eslint plugin for JSON files
- [eslint-plugin-prettier](https://www.npmjs.com/package/eslint-plugin-prettier) — Runs prettier as an eslint rule
- [eslint-plugin-yml](https://www.npmjs.com/package/eslint-plugin-yml) — This ESLint plugin provides linting rules for YAML.
- [handlebars](https://www.npmjs.com/package/handlebars) — Handlebars provides the power necessary to let you build semantic templates effectively with no frustration
- [jest](https://www.npmjs.com/package/jest) — Delightful JavaScript Testing.
- [js-yaml](https://www.npmjs.com/package/js-yaml) — YAML 1.2 parser and serializer
- [markdown-magic-install-extended](https://www.npmjs.com/package/markdown-magic-install-extended) — Extended INSTALL transform for markdown-magic that generates install instructions from package.json with flexible options
- [markdown-magic-scripts](https://www.npmjs.com/package/markdown-magic-scripts) — Automatically generate a dynamic, customizable dashboard of your npm scripts in your README.md using this markdown-magic transform. Keep your project documentation in sync with your package.json.
- [markdown-magic-transform-acknowledgements](https://www.npmjs.com/package/markdown-magic-transform-acknowledgements) — A markdown-magic transform that auto-generates an Acknowledgements section for contributors, dependencies, and custom entries.
- [markdown-magic-transform-badges](https://www.npmjs.com/package/markdown-magic-transform-badges) — No description available
- [markdown-magic-transform-treefile-extended](https://www.npmjs.com/package/markdown-magic-transform-treefile-extended) — A markdown-magic transform to generate a dynamic file tree in your markdown files. This extended version provides additional options for customizing the output.
- [nodemon](https://www.npmjs.com/package/nodemon) — Simple monitor script for use during development of a Node.js app.
- [prettier](https://www.npmjs.com/package/prettier) — Prettier is an opinionated code formatter<!-- end-doc-gen>

<!-- end-doc-gen -->

## Project Structure

<!-- doc-gen fileTreeExtended showSize=true showDescriptions=true -->

```
bluecli/
├── .qodo
│   ├── agents
│   └── workflows
├── bin
│   └── bluecli.js (64 B)                # Entry point for the BlueCLI application.
├── .eslintignore (31 B)
├── .eslintrc.json (283 B)
├── .gitignore (2.1 KB)
├── .prettierignore (31 B)
├── .prettierrc.json (69 B)
├── LICENSE (1.1 KB)
├── markdown-magic.config.js (1.1 KB)    # Configuration file for Markdown Magic to automate README generation.
├── package-lock.json (189.3 KB)
├── package.json (2.0 KB)                # NPM package configuration file with metadata and dependencies.
└── README.md (10.5 KB)                  # The main documentation file for the BlueCLI project.
```

<!-- end-doc-gen -->
