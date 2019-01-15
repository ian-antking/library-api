# Library api

## User Sign-up

``` POST /user```

Post request accepts the following schema:
 
 ```
 {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [isEmail.validate, 'Invalid email address'],
  },
  password: {
    type: String,
    minlength: [8, 'Password must be at least 8 characters long'],
  },
}
 ```
 
 ## User login ##
  
 ``` POST /auth/login ```
 
 Valid username and password will recieve a json web token.
