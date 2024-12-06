// const { getConnection, sql } = require('../DB/db');

// const eventResolvers = {
//     Query: {
//         events: async () => {
//             try {
//                 const pool = await getConnection();
//                 const result = await pool.request()
//                     .query(`
//                         SELECT e.id, e.title, e.description, e.date_start, e.date_end, 
//                                c.id AS category_id, c.name AS category_name, 
//                                ef.id AS feedback_id, ef.rating, ef.comment, ef.feedback_date,
//                                u.firstname AS user_firstname, u.lastname AS user_lastname
//                         FROM apollo.events e
//                         LEFT JOIN apollo.event_feedback ef ON e.id = ef.event_id
//                         LEFT JOIN initium.users u ON ef.user_id = u.id
//                         LEFT JOIN apollo.category_event ce ON e.id = ce.event_id
//                         LEFT JOIN apollo.categories c ON ce.category_id = c.id;
//                     `);

//                 const events = result.recordset.reduce((acc, event) => {
//                     let existingEvent = acc.find(e => e.id === event.id);
//                     if (!existingEvent) {
//                         existingEvent = {
//                             id: event.id,
//                             title: event.title,
//                             description: event.description,
//                             date_start: event.date_start,
//                             date_end: event.date_end,
//                             categories: [{
//                                 id: event.category_id,
//                                 category: {
//                                     name: event.category_name
//                                 }
//                             }],
//                             feedbacks: []
//                         };
//                         acc.push(existingEvent);
//                     }

//                     if (event.feedback_id) {
//                         existingEvent.feedbacks.push({
//                             id: event.feedback_id,
//                             rating: event.rating,
//                             comments: event.comment,
//                             feedback_date: event.feedback_date,
//                             user: {
//                                 firstname: event.user_firstname,
//                                 lastname: event.user_lastname
//                             }
//                         });
//                     }
//                     return acc;
//                 }, []);

//                 return events;
//             } catch (err) {
//                 console.error("Error executing query", err);
//                 throw err;
//             }
//         }
//     }
// };

// module.exports = eventResolvers;

const { getConnection, sql } = require('../DB/db');

const eventResolvers = {
    Query: {
        events: async (_, args) => {
            try {
                const pool = await getConnection();
                const request = pool.request();

                // Base query
                let query = `
                    SELECT e.id, e.title, e.description, e.date_start, e.date_end, 
                           c.id AS category_id, c.name AS category_name, 
                           ef.id AS feedback_id, ef.rating, ef.comment, ef.feedback_date,
                           u.firstname AS user_firstname, u.lastname AS user_lastname
                    FROM apollo.events e
                    LEFT JOIN apollo.event_feedback ef ON e.id = ef.event_id
                    LEFT JOIN initium.users u ON ef.user_id = u.id
                    LEFT JOIN apollo.category_event ce ON e.id = ce.event_id
                    LEFT JOIN apollo.categories c ON ce.category_id = c.id
                    WHERE 1=1
                `;

                // Agregar filtro por categoryId si se proporciona
                if (args.categoryId) {
                    request.input("categoryId", sql.Int, args.categoryId);
                    query += " AND c.id = @categoryId";
                }

                // Ejecutar la consulta
                const result = await request.query(query);

                // Procesar los resultados para estructurarlos según el esquema GraphQL
                const events = result.recordset.reduce((acc, event) => {
                    let existingEvent = acc.find(e => e.id === event.id);
                    if (!existingEvent) {
                        existingEvent = {
                            id: event.id,
                            title: event.title,
                            description: event.description,
                            date_start: event.date_start,
                            date_end: event.date_end,
                            categories: [],
                            feedbacks: []
                        };
                        acc.push(existingEvent);
                    }

                    // Agregar categorías
                    if (event.category_id) {
                        existingEvent.categories.push({
                            id: event.category_id,
                            category: {
                                name: event.category_name
                            }
                        });
                    }

                    // Agregar feedbacks
                    if (event.feedback_id) {
                        existingEvent.feedbacks.push({
                            id: event.feedback_id,
                            rating: event.rating,
                            comments: event.comment,
                            feedback_date: event.feedback_date,
                            user: {
                                firstname: event.user_firstname,
                                lastname: event.user_lastname
                            }
                        });
                    }

                    return acc;
                }, []);

                return events;
            } catch (err) {
                console.error("Error executing query", err);
                throw err;
            }
        }
    }
};

module.exports = eventResolvers;
