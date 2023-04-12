const fs = require('fs');
const path = require('path');

const swcConfig = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), '.swcrc'), 'utf-8'));

const config = {
    automock: false,
    setupFilesAfterEnv:["./test/setupJest.js"],
    setupFiles: [
        "./test/setupJest.js"
    ],
    globals: {
        __SERVER__: true,
        __DEV__: true,
      },
    testEnvironment: 'node',
    transform: {
        '^.+\\.(t|j)sx?$':['@swc/jest', swcConfig]
    },
    rootDir: '.',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^server(.*)$': '<rootDir>/src/server$1',
    },
    moduleFileExtensions: ['js', 'jsx']
  };
  
  module.exports = config;