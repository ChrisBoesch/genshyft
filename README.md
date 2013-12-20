# The SingPath Genshyft GUI based on AngularJS and Karma with a quick start setup for Nitrous.io
This is the GUI for SingPath.com - the most fun way to practice software. 

## Original Testing Blog Article
If you are interested in the testing, check out the the link below to view the blog article which explains exactly what and how this application is used.
http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html

## Setup on Nitrous.io
If you've ever had trouble setting up angular testing on your own machine, then this is a quick way to start. 
You should be able to get everything working on Nitrous.io just by running npm install. 

Sign in to Nitrous.io
Create a Node box
From the command line at the bottom, clone YOUR fork from Github and enter these other lines at the command line as well: 

1. git clone https://github.com/ChrisBoesch/genshyft.git

2. cd genshyft

3. npm install

4. npm install -g grunt-cli 

5. grunt test

You should see all the tests passing. 

### Development Mode

Run the following command to start the server
`node server.js`

This is an easy way to view your pages live. 
You can now access the website by clicking on preview and port 8888.

#### Single Run Tests

You can run individual test suites by running the commands:
`grunt test:unit`
`grunt test:midway`
`grunt test:e2e`

Or everything in order:
`grunt test`

#### Auto watching tests
When watching tests, any save to a spec file will trigger karma to run the tests again
for the specific test suite that is active at the time.

You can watch only watch one test suite a time.
`grunt autotest:unit`
`grunt autotest:midway`
`grunt autotest:e2e`
