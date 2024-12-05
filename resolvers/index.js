const { mergeResolvers } = require('@graphql-tools/merge');
const categoryResolvers = require('./category');
const userResolvers = require('./user');
const eventFeedbackResolvers = require('./eventFeedback');
const eventResolvers = require('./event');
const categoryEventResolvers = require('./CategoryEvent');

categoryResolvers

const resolversArray = [
    userResolvers,
    categoryResolvers,
    // eventFeedbackResolvers,
    // categoryResolvers,
    // eventResolvers,
    // categoryEventResolvers
]

const resolvers = mergeResolvers( resolversArray );

module.exports = resolvers;