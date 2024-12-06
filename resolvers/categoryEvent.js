const { getConnection, sql } = require("../DB/db");

const categoryEventResolvers = {
    Query: {
        categoryEvents: async () => {
            try {
                const pool = await getConnection();
                const result = await pool.request().query(`
                    SELECT c.id AS category_id, c.name AS category_name, e.id AS event_id, e.title AS event_title
                    FROM apollo.categories c
                    INNER JOIN apollo.category_event ce ON ce.category_id = c.id
                    INNER JOIN apollo.events e ON e.id = ce.event_id
                `);
                return result.recordset;
            } catch (err) {
                console.error("Error executing query", err);
                throw new Error("Error fetching category-events");
            }
        }
    }
};

module.exports = categoryEventResolvers;

