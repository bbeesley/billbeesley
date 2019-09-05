module.exports = {
  parser: 'babel-eslint',
  'extends': 'airbnb',
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  plugins: [
    'flowtype',
    'import',
  ],
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'generator-star-spacing': [
      0,
    ],
    'no-duplicate-imports': [
      0,
    ],
    'no-await-in-loop': [
      0,
    ],
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true,
      },
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    complexity: [
      2,
      6,
    ],
    indent: [
      2,
      4,
    ],
    'no-console': [
      2,
    ],
    'max-len': [
      2,
      120,
    ],
    'spaced-comment': [
      0,
    ],
    'import/prefer-default-export': [
      0,
    ],
    'import/extensions': [
      'error',
      {
        js: 'never',
        json: 'always',
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'valid-jsdoc': 2,
    'new-cap': [
      2,
      {
        capIsNewExceptions: [
          'Map',
          'List',
          'Record',
        ],
      },
    ],
    'no-underscore-dangle': [
      'off',
    ],
    'react/jsx-filename-extension': [
      2,
      {
        extensions: [
          '.js',
        ],
      },
    ],
    'react/jsx-indent': [
      2,
      4,
    ],
    'react/jsx-indent-props': [
      2,
      4,
    ],
    'react/prop-types': [
      0,
    ],
    'react/no-array-index-key': [
      1,
    ],
    'react/destructuring-assignment': [1, 'never'],
    'react/jsx-props-no-spreading': [0],
    'flowtype/no-dupe-keys': 2,
    'flowtype/no-weak-types': [
      1,
      {
        any: true,
        Object: false,
        Function: false,
      },
    ],
    'flowtype/define-flow-type': 1,
    'flowtype/require-parameter-type': 1,
    'flowtype/type-id-match': [
      1,
      '^([A-Z][A-Za-z0-9]+)+Type$',
    ],
    'flowtype/use-flow-type': 1,
  },
  globals: {
    fetch: false,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
  },
};
