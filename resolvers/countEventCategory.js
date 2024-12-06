const { getConnection } = require("../DB/db");

const countEventCategoryResolver = {
    Query: {
        countEventCategory: async () => {
            try {
                const pool = await getConnection();
                const result = await pool.request().query(`
                    SELECT 
                        c.id AS category_id,
                        c.name AS category_name,
                        COUNT(ce.event_id) AS event_count
                    FROM 
                        apollo.categories AS c
                    LEFT JOIN 
                        apollo.category_event AS ce 
                        ON c.id = ce.category_id
                    LEFT JOIN 
                        apollo.events AS e 
                        ON ce.event_id = e.id
                    GROUP BY 
                        c.id, 
                        c.name
                    ORDER BY 
                        event_count DESC;
                `);

                return result.recordset.map(row => ({
                    category: {
                        id: row.category_id,
                        name: row.category_name,
                    },
                    count: row.event_count,
                }));
            } catch (err) {
                console.error("Error executing query", err);
                return [];
            }
        },
    },
};

module.exports = countEventCategoryResolver;

