# bluecli

**bluecli** is a CLI generator for CLIs.  
It lets you define your CLI’s structure, commands, and plugins using **YAML, JSON, or `.declare.js` files**, and then scaffold a complete project using familiar templates.  
Inspired by oclif, but built on [commander.js](https://github.com/tj/commander.js) for simplicity and flexibility.

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

## 📜 License

MIT © 2025 Your Name
