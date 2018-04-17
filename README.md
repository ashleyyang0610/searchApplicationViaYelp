# searchApplicationViaYelp

Restaurant searching application via Yelp.
[Online Website](https://ashleyyang0610.github.io/searchApplicationViaYelp/)

**Dev build is recommeded since the key is needed for fetching the data.**

## Requirements
* Suuported Browser: Chrome, Firefox, Safari, IE11, Edge.

* Recommended screen size: 1280 × 960

## Getting Started

1. Clone the respository.
```
git clone https://github.com/ashleyyang0610/searchApplicationViaYelp.git
```
2. Installing
```
npm install
```

3. Run the project
```
NODE_PRIVATE_KEY=<YOUR ACCESS TOKEN> npm start
```
Name            | Default | Description
:---            | :------ | :----------
NODE_PRIVATE_KEY  |         |Yelp app private key. **The key is needed for fetching the data.** Please see [Yelp authentication](https://www.yelp.com/developers/documentation/v3/authentication) for more detail.

## Built With

**No any UI framework is used!!!**

### Self-built components
* Button
* InputBox
* Loader
* List
* Notification
* Score
* DatePicker (Package by [react-datetime](https://github.com/YouCanBookMe/react-datetime))

### Tools or Libraries
* [React](https://reactjs.org/)
* [Redux](https://github.com/reactjs/redux)
* [Redux-Observable](https://redux-observable.js.org/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://babeljs.io/)
* [postCSS](https://github.com/postcss/postcss)
* [normalize.css](https://necolas.github.io/normalize.css/)
* [i18next](https://www.i18next.com/)
* [momentJS](https://momentjs.com/)
* [lodash](https://lodash.com/)
* [react-datetime](https://github.com/YouCanBookMe/react-datetime)
* [fontawesome](https://fontawesome.com/)

#### Linter
* [ESLint](https://eslint.org/)

## What test is built-in
* Linter

## Not finished feature
* Avoid making another request to Yelp if location is not changed.
* If date/time changed, try filtering the data from the response already get

## Improvement
* Responsive web design
* Unit test
* Component Flexibility
* Put a inputBox for user to input private key.
* Use category column to do the label feature. Click to search correlated data.
*  Time-zone (The flexibility is already built-in.)
*  Location input autocomplete feature.