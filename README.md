# E-Auto Shop
A simple web app that help you choose the best electric car within your budget 🚙 ⚡️

## Demo

View the production-ready version of this application here (coming soon).

## Features

### Done
 - Over 250 car makes supported
 - Mobile-first design with simple UX in mind 
 - Browse cars by differnt criteria, order, sort, filter, search
 - Add car to favourites to manage multiple options easily
 - Export favourites cars list (with all details included) to .csv file
 - Clear and easy to understand comparison tool for up to two cars
 - Offine support 

### Coming soon... (backlog)
 - Price alerts with web notifications 
 - User-generated car suggestions with human review process
 - User's dashboard to monitor car updates (models, prices, etc)

## Use-cases

1. As a user, I want to see all electric cars available today on the market.
2. As a user, I want to see all electric cars from a specific make available today on the the market
3. As a user, I want to see every technical detail of an eleectric car, by category
4. As a user, I want add a car to favorites for easy future reference
5. As a user, I want to remove a car from favorites
6. As a user, I want to export my favorites car to an .csv file (to download it, print it and take the finnal decision in a car dealership)
7. As a user, I want to compare 2 electric cars (either from My Favorites, either from the whole car list)
8. As a user, I want to deelete all my local data (from my local browser's local storage)
9. As a user, I wannt to bee ablee to browse the app in multiple languages
10. As a user, I want to be able to suggest a car (later reviewed by a human)

## Constraints
- Work offline
- Mobilee design
- No database for the POC, working just with browser's local storage 


## Want to contribute?

### Preparation

You need to install [node](http://nodejs.org/) and [git](https://git-scm.com/) locally. The project is based on [ES2015+](http://es6.ruanyifeng.com/), [vue](https://cn.vuejs.org/index.html), [vuex](https://vuex.vuejs.org/), [vue-router](https://router.vuejs.org/), [axios](https://github.com/axios/axios) and [element-ui](https://github.com/ElemeFE/element), all request data is simulated using [Mock.js](https://github.com/nuysoft/Mock).
Understanding and learning this knowledge in advance will greatly help the use of this project.


### Getting started
Open your terminal, navigate to a new location and then type the following:

```bash
# clone the project
git clone https://github.com/kyokidG/eauto-shop.git

# navigate to project folder
cd eauto-shop

# install dependency
yarn install

# develop
yarn run dev
```

This will automatically open http://localhost:9999.


#### Build

```bash
# build for test environment
npm run build:sit

# build for production environment
npm run build:prod
```

#### Advanced

```bash
# --report to build with bundle size analytics
npm run build:prod --report

# --generate a bundle size analytics. default: bundle-report.html
npm run build:prod --generate_report

# --preview to start a server in local to preview
npm run build:prod --preview

# lint code
npm run lint

# auto fix
npm run lint -- --fix
```

Refer to [Documentation of the Admin Template we are using](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information.

#### Changelog

Detailed changes for each release are documented in the [release notes](https://github.com/PanJiaChen/vue-element-admin/releases).

#### Online Demo

[not available yet](https://google.com)



---

### Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

**This project does not support low version browsers (e.g. IE). Please add polyfill yourself if you need them.**

**Note: This project uses element-ui@2.3.0+ version, so the minimum compatible vue@2.5.0+**
