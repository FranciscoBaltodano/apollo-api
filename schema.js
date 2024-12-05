const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    id: ID!
    firstname: String!
    lastname: String!
    email: String!
    active: Boolean
    created_at: Date
    updated_at: Date
    events: [Event]
  }

  type Event {
    id: ID!
    title: String!
    description: String
    date_start: Date!
    date_end: Date!

    feedbacks: [EventFeedback]
    categories: [Category]
  }

  type Category {
    id: ID!
    name: String!
  }

  type CategoryEvent {
    id: ID!
    category: Category
    event: Event
  }

  type EventFeedback {
    id: ID!
    event: Event!
    user: User!
    rating: Int!
    comments: String
    feedback_date: Date!
  }

  type Query {
    users: [User]
    events: [Event]
    categories: [Category]
    eventFeedbacks: [EventFeedback]
  }

`;

module.exports =  typeDefs ;
