# Interview Scheduler

## Information

The interview scheduler has a clean UI that will make it easy for all users to use. Users can book interviews with certain interviewers that are free, and are also free to cancel it as well. It runs its database from a separate API server. Users can also switch from days and see live reloading of spots avaliable for each day!

To start, you must first download the API files from github, https://github.com/melonaster3/scheduler-api and run it locally at a different port. The Scheduler app will use this api as a database and get information from it. 


## Setup

Install dependencies with `npm install`.

### Running Webpack Development Server

`npm start`

### Running Jest Test Framework 

`npm test`

### Running Storybook 

`npm run storybook`


![Overview](https://github.com/melonaster3/scheduler/blob/master/docs/overview-picture.PNG?raw=true)

## Overview

Left panel has a locked side bar where users can click on the days to navigate to the certain day user wants. It also shows how many spots are remaining and this will update as soon as users add or cancels an appointment. The clicked day will be highlighted in white and if a day is full (all 5 appointments taken) the day will be highlighted red. Click on the plus button in the list of appointments to add a new appointment 


![Appointment Form](https://github.com/melonaster3/scheduler/blob/master/docs/appointment-form.PNG?raw=true)

## Appointment form 

Users can input the name and choose from an interviewer avaliable. As shown, the chosen interviewer will be highlighted with their full name being shown. When user cancels, it will be taken back to the list page, when user clicks save the appointment will be saved and shown right away on the list. 


## Edit or Delete 

Users can edit or delete a listing and it will update the form right away. 

## Languages used 

   - Javascript 
   - CSS
   - HTML5
   - React

## Dependencies 
   - axios: ^0.27.2
   - classnames: ^2.2.6
   - normalize.css: ^8.0.1
   - react: ^16.9.0
   - react-dom: ^16.9.0
   - react-hooks-testing-library: ^0.6.0
   - react-scripts: 3.0.0
   
## Testing

   - Jest 
   - Testing Library
   - Storybook 
   - Cypress
