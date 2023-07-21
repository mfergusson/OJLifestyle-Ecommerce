This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

This applicaton is entirely dependent on the NodeJS server inside ./server/index.js. Make sure before running this NextJS application you cd into ./server, run `npm install`. Then you can run the server using node index.js. This serves data fom fakerjs.

To run the NextJS app,

```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# If I had more time
## Tests
I would add automated Jest and Cypress tests that verify the filtering and search for the home page component. I would implement an Istanbul code coverage report for each test suit, merge the coverage and set a command in the package.json to gate the test coverage at 100%. All feature branch pull requests would be behind a CI/CD pipeline that ensures this to prevent untested code being deployed.

## Implement authentication
I would use either Firebase or AWS Cognito to implement authentication. If I were to use AWS Cognito, would create a client pool inside AWS UI. This would expose a pool that I can connect to using the AWS JavaScript SDK. I would add something like this to _app.tsx.

```
Amplify.configure({
  Auth: {
    identityPoolId: 'xx', // REQUIRED - Amazon Cognito Identity Pool ID
    region: 'xx', // REQUIRED - Amazon Cognito Region
    userPoolId: 'xx', // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: 'xx', // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  },
});
```

I would then have access to functions such as Auth.signup and much more. I would create a signup screen that takes in the clients information that would get stored inside AWS Cognito user pool.

Once a user is logged in, I would store the user state in the application so we could dynamically load pages based off of this information.

## Deploy the NodeJS server to AWS Lambda/EC2 and put it behind API Gateway
Currently, the NodeJS server that is serving the data can only be accessed locally. I would deploy this to the cloud so we would have access from anywhere. I would put it behind API Gateway so we could set controls about how users interact with the endpoint

## Deploy the NextJS assets to Vercel and configure the Edge location to be UAE
Currently the app can only be run locally. I would deploy the app to Vercel and put it behind a domain that is owned by OJ-Lifestyle

## Add React Query
Currently the frontend makes a call to the server every time. This is not efficient as we can store the result in a cache on the frontend to save some calls. I would add React Query to all calls made from the client

## Store the basket items in the browser
I saw in the brief that a requirement was to store basket information in the browser so if the client refreshes their page then the app state does not refresh. The best way to solve this issue is allow each and every client to have a session (authenticated or non-authenticated). That way the basket information can be stored on the server which is much more reliable. For this case, we could also store it in the browser (using cookies, session storage or local storage depending on requirements). This would be part of the addItemToBasket function where I would add an item to the browser storage as well as adding it to the React state. When the app loads, the state would get populated from the browser storage so it has the intitial state already loaded.

## Final thoughts
Unfortuataly I was very busy over the last 48 hours so I couldn't complete the project entirely. Given more time, I would easily be able to meet the requirements and make sure the app was performant, secure and cost effective