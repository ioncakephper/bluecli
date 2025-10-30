module.exports = {
  transforms: {
    fileTreeExtended: require('markdown-magic-transform-treefile-extended'),
    BADGES: require('markdown-magic-transform-badges'),
    ACKNOWLEDGEMENTS: require('markdown-magic-transform-acknowledgements'),
    SCRIPTS: require('markdown-magic-scripts'),
  },

  transformDefaults: {
    fileTreeExtended: {
      descriptions: {
        '.qodo/': 'Qodoc configuration file for generating documentation.',
        '.qodo/agents': 'Contains agent configurations for the Qodoc tool.',
        '.qodo/workflows': 'Contains workflow definitions for the Qodoc tool.',
        'bin/bluecli.js': 'Entry point for the BlueCLI application.',
        '.eslintignore':
          'Specifies files and directories that ESLint should ignore.',
        '.eslintrc.json':
          'Configuration file for ESLint, defining code linting rules.',
        '.gitignore':
          'Specifies intentionally untracked files that Git should ignore.',
        '.prettierignore':
          'Specifies files and directories that Prettier should ignore.',
        '.prettierrc.json':
          'Configuration file for Prettier, defining code formatting rules.',
        LICENSE: 'Contains the licensing information for the project.',
        'markdown-magic.config.js':
          'Configuration file for Markdown Magic to automate README generation.',
        'package-lock.json':
          'Records the exact versions of dependencies, ensuring consistent installations.',
        'package.json':
          'NPM package configuration file with metadata and dependencies.',
        'README.md': 'The main documentation file for the BlueCLI project.',
      },
    },
  },
}
