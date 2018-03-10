# Auction

Auction is an eBay/Amazon inspired project with a React front end and Rails RESTful API back end.

## Features
- User JWT authentication.
- Responsive React front end client.
- Users can create auctions where other users can make bids.

## Screen Shot
![Auction Auction Show Page](/public/screenshot-4.jpg)
Users can create auctions and bid on other users's auctions.

## Setup
1. After cloning the repo, run the following commands in CLI:
```
$ rails db:migrate
$ rails s
```
2. (Optional) Still in terminal, open project folder in a new tab and run `webpack -w`
3. Go to http://localhost:3000/client to test client-side app.

## Technologies
- Back end: Ruby on Rails API<br>
- Front end: React, Bootstrap, HTML5, CSS<br>
- Database: PostgreSQL<br>
- Other technologies: Webpack<br>
