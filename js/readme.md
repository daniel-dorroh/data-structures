# JavaScript data structures

## What is this?

This section of the repo is where I've experimented with implementing data structures in JavaScript.

## What is it here for?

I had never implemented data structures before, so I decided it might be fun to do that in a few languages.
In this case, I've done the implementation in JavaScript.

## How are things organized?

In the `src` folder I've organized the data structure implementation by category (e.g., stack, linked list, etc.).
Each category folder has both implementation and test code. `data-structures.js` is a top level module that exports
the data structure classes.

## Technology

- Jest - testing
- Babel - build (required to make Jest recognize es6 module format)
- NPM - dependency management and scripting

## How do I run the tests?

Run tests once

```
npm run test
```

Run tests in watch mode with code coverage

```
npm run test-watch
```
