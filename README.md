# Kanban Board

A simple Kanban Board web application
using _React_, _Redux_, _MongoDB_ and _Node.js_

---
## Requirements

For development, you will need 
- Node.js 
- A node global package, NPM, installed in your environement.
- MongoDB

### Node & NPM

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### MongoDB

Just go on [official MongoDB website](https://www.mongodb.com/download-center) and download the installer.

---

## Install

    $ git clone https://github.com/saraheisa/Tasks-Organizer
    $ cd Tasks-Organizer
    $ npm install

## Configure app

You may need to change MongoDB's connection address in `app.js` 
if it's different in your machine, commonly it's the same

## Running the project

Start DB
    run this command
    
    $ C:\path\to\mongodb\bin\mongod.exe

If you're using VSCode you can use [Azure extension]('https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-cosmosdb') to connect to DB

Initialize DB

    $ npm run seed-db

Start the app

    $ npm run start-dev