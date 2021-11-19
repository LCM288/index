[![License](https://badgen.net/github/license/LCM288/acsoc-index?cache=600)](https://github.com/LCM288/acsoc-index/blob/master/LICENSE)
[![Commits](https://badgen.net/github/commits/LCM288/acsoc-index?cache=600)](https://github.com/LCM288/acsoc-index)
[![Last Commit](https://badgen.net/github/last-commit/LCM288/acsoc-index?cache=600)](https://github.com/LCM288/acsoc-index)
[![Build Status](https://badgen.net/travis/LCM288/acsoc-index?cache=600)](https://travis-ci.com/LCM288/acsoc-index)
[![Open Issues](https://badgen.net/github/open-issues/LCM288/acsoc-index?cache=600)](https://github.com/LCM288/acsoc-index/issues)
[![Open PRs](https://badgen.net/github/open-prs/LCM288/acsoc-index?cache=600)](https://github.com/LCM288/acsoc-index/pulls)

## Setup procedure

1. Install `postgresql`, `node.js` and `yarn`
2. Put a `.env` file in root following the variables in `.env.example`
3. Run `yarn install` to install all dependencies
4. Run `yarn newdb` set up the database
5. Run `yarn release` to generate sync the database and generate jwt secret
6. Run `yarn dev` to start the server

## Useful docs

- [acsoc-index](https://lcm288.github.io/acsoc-index/)
- Database: [Sequelize](https://sequelize.org/master/index.html) / [Umzug](https://github.com/sequelize/umzug/tree/v2.x)
- Backend: [Graphql](https://graphql.org/learn/) / [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- Frontend: [Apollo Client](https://www.apollographql.com/docs/react/) / [Next](https://nextjs.org/docs/getting-started) / [React](https://reactjs.org/docs/getting-started.html) / [react-bulma-components](https://github.com/couds/react-bulma-components) / [Bulma](https://bulma.io/)
- Miscellaneous: [Axios](https://github.com/axios/axios) / [Typescript](https://www.typescriptlang.org/docs/handbook/intro.html) / [Jest](https://jestjs.io/docs/en/getting-started)
