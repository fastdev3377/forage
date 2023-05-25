# Forage Debugging Interview
The Forage Debugging Interview tests your React knowledge, your ability to pickup a codebase, and your working style. Imagine that you need to dig into a new codebase with a colleague and figure out why it isn't working.

There is a test suite in this repository that describes three user flows that are currently failing. By the end of the interview, we want all three test cases in this repository to be passing.

## Start the app
This app was built with node version 16.16.0
- Run `npm install`
- Run `npm start`

## How to run the tests
We use testcafe to run end-to-end tests that simulate user interaction with the app. In order to run the tests:
- Run `npm install`
- Run `npm start`
- Open a second terminal and run one of the three commands depending on which browser you have installed:
  - `npm run integration-test-chrome`
  - `npm run integration-test-safari`
  - `npm run integration-test-firefox`
