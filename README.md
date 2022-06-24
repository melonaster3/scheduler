# Interview Scheduler

## Setup

Install dependencies with `npm install`.
Dependencies includes 
    - axios 
    - classnames
    - react
    - react-dom
    - react-hooks-testing-library
    - react-scripts
    - storybook
    - Jest

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```


## Information

The interview scheduler has a clean UI that will make it easy for all users to use. Users can book interviews with certain interviewers that are free, and are also free to cancel it as well. It runs its database from a separate API server. Users can also switch from days and see live reloading of spots avaliable for each day!

To start, you must first download the API files from github, https://github.com/melonaster3/scheduler-api and run it locally at a different port. The Scheduler app will use this api as a database and get information from it. 


## Overview Screen Shot
![Overview](https://github.com/melonaster3/scheduler/blob/master/docs/overview-picture.PNG?raw=true)


## Appointment Form Screen Shot
![Appointment Form](https://github.com/melonaster3/scheduler/blob/master/docs/appointment-form.PNG?raw=true)
