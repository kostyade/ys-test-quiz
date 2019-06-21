This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#### Available Scripts

In the project directory, you can run:

  - npm install/yarn install
  
  and after

  - npm start 
  - npm run build
  - yarn run build
  - yarn start

#### What's done:

  - String parser with proper validations of proper symbols and person presence
  - Shortest Path finding logic(by time, as turns are equal to moves forward)
  - Custom sprites animations
  - Simple path tracing animation 
  
#### What can be improved:

  - Organize styles to either scss or add styled components 
  - Some components can be splitted though it will require state management system
  - External state manager or react context
  - There're unnecessary render calls, it can be improved, but for such small app there isn't signifficant performance impact
  - Improve animation with camera movement an smoother transitions
  - There can be issues for some specific cases of non rectangle maps where user is placed outside of map, but generally non rectangle maps are fine and application shouldn't crash.
  - Cases of 1x1,1x2,2x1 maps are not covered, but can be with slightly more time
  
#### Tested conditions:

  Chrome, Safari, minimum map size 2 X 2
