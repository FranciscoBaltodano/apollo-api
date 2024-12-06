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
    categories: [CategoryEvent]
  }

  type Category {
    id: ID!
    name: String!
    events: [CategoryEvent]
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

  type CountEventCategory {
    category: Category
    count: Int 
  }


  type Query {
    users( id: Int ): [User]
    events: [Event]
    categories( id: Int, name: String ): [Category]
    categoryEvents: [CategoryEvent]
    eventFeedbacks: [EventFeedback]
    countEventCategory: [CountEventCategory]
  }
`;

module.exports =  typeDefs ;
