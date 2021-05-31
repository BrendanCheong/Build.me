# Build.me-Orbital-2021

## What is this project about?

This is a web scraping web application build by Zhi Xuan and Brendan Cheong for Orbital 2021. The Objective of this web application is to be able to collate different PC part prices from local e-commerce websites like Lazada, Shoppee and Amazon.sg to make part hunting easier for the user while letting the user find the best deals online

## Tech Stack used

For this project, we used the MERN stack (MongoDB,Express,React and Node) together with complimentary frameworks and libraries like Tailwindcss and Puppeteer.js

# **IMPORTANT:** How to Setup Build.me for first time users

#### Step 1

Clone this repo using

`git clone this_repo's_url'`

onto your empty local file

#### Step 2

Install the node_modules package on **Backend file** and **src file** like so

`cd build.me`

First we install the node_modules for Backend

`cd Backend`, make sure you are on Backend file to install node_modules

`yarn install` , only use yarn and NOT npm to avoid compatability issues with yarn.lock

Lastly, install the node_modules for Frontend

`cd build.me`, make sure you are on the build.me file to install node_modules

`yarn install`

#### Step 3

Run the backend node server so that the Backend API is running

`cd Backend`, make sure you are in the Backend folder

`yarn run dev`, this runs a script to start backend server

If successfully, you should see **2** messages:

1. Local host 5000 connected successfully
2. MongoDB connection established successfully

in your git bash console

#### Step 4

Start the react app on the frontend

`cd build.me`, make sure you are on the build.me file

`yarn start` run this on git bash to start react app

#### Step 5

Enjoy the web application!
