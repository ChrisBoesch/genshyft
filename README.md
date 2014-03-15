[![Build Status](https://travis-ci.org/ChrisBoesch/genshyft.png?branch=master)](https://travis-ci.org/ChrisBoesch/genshyft)

## Genshyft - Angularjs GUI for SingPath.com
  
SingPath.com is the most fun way to practice software. 

## Setup on Nitrous.io
If you've ever had trouble setting up angular testing on your own machine, then this is a quick way to start. 
You should be able to get everything working on Nitrous.io just by running npm install. 

Sign in to Nitrous.io
Create a Node box
From the command line at the bottom, clone YOUR fork from Github and enter these other lines at the command line as well: 

```
$ git clone https://github.com/ChrisBoesch/genshyft.git

$ cd genshyft

$ npm install

$ npm install -g grunt-cli 

$ grunt install

$ grunt test
```

You should see all the tests passing. 

### Development Mode

Run the following command to start the server
`grunt dev`

This is an easy way to view your pages live. You can now access the website 
by clicking on preview and port 8888. It will also to rebuild assets 
automatically after editing a javascript or style file.

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
