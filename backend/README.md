This is an express + graphql application that has the goal of serving backend endpoints required to authenticate and other business logic that requires a backend.

## Getting started

It's required that you have a users table in Hasura with the following columns 

- `id` as an auto-generated `uuid`
- `email` of `text` type
- `password_hash` of `text` type
- `password_salt` of `text` type
