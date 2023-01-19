# ilara-pharmacy-react

This is a react project for a pharmacy checkout ui

## App Structure

The application is structured by features, each feature having its own directory that contains the React components, actions, and reducers related to that feature.

### Pages
- `/` : Home page 
- `/inventory` : Inventory page, it shows the list of items
- `/inventory/:id` : Inventory item detail page, it shows the detail of a specific item
- `/orders` : Orders page, it shows the list of orders
- `/orders/:id` : Order detail page, it shows the detail of a specific order
- `/customers` : Customers page, it shows the list of customers
- `/customers/:id` : Customer detail page, it shows the detail of a specific customer
- `/checkout` : Checkout page, it allows the user to place an order
- `/login` : Login page
- `/logout` : Logout page


## Libraries
This project uses the following libraries:

react-router for handling routing and navigation.
redux or mobx for managing the state of the application.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
