module.exports = {
    preset: "react-native",
    collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
    testMatch: ["<rootDir>/src/**/__tests__/**/*.{js,jsx,mjs}", "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,mjs}"],
    
    transform: {
        "^.+\\.(js)$": "<rootDir>/node_modules/react-native/jest/preprocessor.js"
    },
    transformIgnorePatterns: ["node_modules/(?!(jest-)?react-native|react-navigation|react-navigation-redux-helpers)"]
  };
  //transform: {'^.+\\.js$': 'babel-jest'},