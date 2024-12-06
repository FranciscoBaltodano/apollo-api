const { mergeResolvers } = require('@graphql-tools/merge');
const categoryResolvers = require('./category');
const userResolvers = require('./user');
const eventFeedbackResolvers = require('./eventFeedback');
const eventResolvers = require('./event');
const categoryEventResolvers = require('./ce');
const countEventCategoryResolver = require('./countEventCategory');

const resolversArray = [
    userResolvers,
    categoryResolvers,
    eventFeedbackResolvers,
    eventResolvers,
    categoryEventResolvers,
    countEventCategoryResolver
]

const resolvers = mergeResolvers( resolversArray );

module.exports = resolvers;