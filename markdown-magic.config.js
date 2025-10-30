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
        'bin/bluecli.js': 'Entry point for the BlueCLI application.',
        'lib/commands/init.js':
          'Module for initializing a new BlueCLI project.',
        'eslint.config.js': 'ESLint configuration file for code linting rules.',
        'markdown-magic.config.js':
          'Configuration file for Markdown Magic to automate README generation.',
        'tests/init.test.js': 'Unit tests for the init command module.',
        'package.json':
          'NPM package configuration file with metadata and dependencies.',
        license: 'The MIT License file for the BlueCLI project.',
        'README.md': 'The main documentation file for the BlueCLI project.',
      },
    },
  },
}
