const { getConnection, sql } = require('../DB/db');

const categoryResolvers = {
    Query: {
        categories: async ( _ , args ) => {
            try {
                const pool = await getConnection();
                const request = pool.request();

                let query = "SELECT * FROM apollo.categories WHERE 1=1";

                if (args.name) {
                    request.input("category_name", sql.VarChar, args.name);
                    query += " AND name LIKE @category_name";
                }

                if (args.id) {
                    request.input("category_id", sql.Int, args.id);
                    query += " AND id = @category_id";
                }

                const result = await request.query(query);
                return result.recordset;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    },

    CategoryEvent: {
        event: async (parent) => {
            try {
                const pool = await getConnection();
                const request = pool.request();
    
                request.input("event_id", sql.Int, parent.event_id);
                const result = await request.query(`
                    SELECT 
                        id, 
                        title, 
                        description, 
                        date_start, 
                        date_end
                    FROM 
                        apollo.events
                    WHERE 
                        id = @event_id
                `);
    
                return result.recordset[0];
            } catch (err) {
                console.error("Error fetching event for CategoryEvent", err);
                return null;
            }
        },
    },
    

    Category: {
        events: async (parent) => {
            try {
                const pool = await getConnection();
                const request = pool.request();

                request.input("category_id", sql.Int, parent.id);
                const result = await request.query(`
                    SELECT 
                        ce.id AS category_event_id,
                        e.id AS event_id,
                        e.title,
                        e.description,
                        e.date_start,
                        e.date_end
                    FROM 
                        apollo.category_event ce
                    INNER JOIN 
                        apollo.events e 
                    ON 
                        ce.event_id = e.id
                    WHERE 
                        ce.category_id = @category_id
                `);

                return result.recordset.map(row => ({
                    id: row.category_event_id, // ID de CategoryEvent
                    event: {
                        id: row.event_id,
                        title: row.title,
                        description: row.description,
                        date_start: row.date_start,
                        date_end: row.date_end,
                    },
                }));
            } catch (err) {
                console.error("Error fetching events for category", err);
                throw err;
            }
        },
    },
};

module.exports = categoryResolvers;

