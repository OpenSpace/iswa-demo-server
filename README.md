# iswa-demo-server

Install Instructions
--------------------

* Install [Node](https://nodejs.org/en/)
* `git clone` or download repository
* `cd iswa-demo-server`
* `npm install` to install dependenies
* Download the public directory with cygnet data and images from [here](https://drive.google.com/file/d/0Bzsns1xQ5SxwRFUxNTdXRThqZ0k/view?usp=sharing)
* Extract in root of iswa-demo-server directory

Run server
----------
`node server.js`

API (for development)
-----
Each demo cygnet has a unique ID specified in >index.js 

* To request metadata for a cygnet, pass its id as a parameter 
`localhost:3000/:id`
* To request the latest image cygnet for a specific timestamp
`localhost:3000/image/:id/:timestamp`
* To request the latest data cygnet for a specific timestamp
`localhost:3000/data/:id/:timestamp`

Examples:
* `localhost:3000/image/2/2996-01-23 00:44:00`
* `localhost:3000/data/9/2013-01-23%2000:44:00 //with url encoded space (%20)`