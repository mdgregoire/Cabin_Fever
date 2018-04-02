# Cabin Fever

I created this app to assist property owners with tracking tasks that need to be done on an annual basis.  The user can create and manage multiple properties (if needed) and personalize the properties by uploading a unique picture to help identify each location.  The app also allows a user to upload a list of opening and closing tasks in a .csv file which will then track the progression of those tasks throughout the year.  Additionally the user can create chores that need to be done on a short term basis within the application itself.

## Built With

The application was built using the SEAN stack (SQL, Express, AngularJS, and Node.js).  I also used Bootstrap, Angular Animate, Passport, Multer, and NG-File-Upload.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- [Node.js](https://nodejs.org/en/)


### Installing

Steps to get the development environment running.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null
);
```



### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Name of author(s)


## Acknowledgments

* Hat tip to anyone who's code was used
