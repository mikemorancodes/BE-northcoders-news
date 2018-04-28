## Mike Moran's Northcoders News API

### Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Pre-requisites

You will need the following on your machine:

* [NodeJS](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/)

### Installing

Clone the repo and install all dependencies. Run the development seed file and start the app to begin using.

Clone the repo

```
git clone https://github.com/mikemorancodes/BE-FT-northcoders-news.git
```

Install dependencies

```
npm install
```

Run mongod in your terminal and leave running while using the app. Be sure to exit once finished.

```
mongod
```

Seed database and start app

```
node seed/dev.seed.js
npm run dev
```

At port 9090 you can see the API homepage with all possible CRUD requests and routes.

```
http://localhost:9090/api/
```

Or see the online version at

```
https://nc-news-2018.herokuapp.com/api
```

### Tests

All tests check for proper communication with the database. GET requests validate express responses against test data,

```javascript
expect(firstTopicDoc.name).to.equal(topicData[0].name);
```

while POST, PUT and DELETE requests also check the appropriate changes in the database:

```javascript
//increase comment vote by 1
expect(response.comment.votes).to.equal(commentData[0].votes + 1);
```

### Running the tests

To execute tests run the following command in your terminal:

```
npm test
```

### Deployment

The app has been deployed with [Heroku](https://www.heroku.com/), using [MLab](https://mlab.com) to host the database.

### Built With

* Express - The web framework used
* Mongoose - For interaction with the database
* Faker - Content generator
* Lodash - Utility functions
* Body-parser - For handling POST requests
* Nodemon - For restarting server when modifications are made and saved

And for testing:

* Mocha - Testing framework
* Chai - Assertion library paired with Mocha
* Supertest - For making http requests and assertions

### Author

[Mike Moran](github.com/mikemorancodes)

### Acknowledgments

Many thanks to Northcoders, without which this API would not be possible.
Huge appreciation to the tutors at Northcoders for their help with coding headaches, especially Sam Caine for his enthusiasm and encouragement.
A big shout out to [DJWadds](https://github.com/DJWadds) for his elegant solution to a seeding problem with article comment counts.
