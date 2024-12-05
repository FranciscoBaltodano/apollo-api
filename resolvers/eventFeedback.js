const { getConnection, sql } = require("../DB/db");

const eventFeedbackResolvers= {
    Query: {
        users: async () => {
            try {
                const pool = await getConnection();
                const result = await pool.request().query("SELECT * FROM apollo.event_feedback");
                return result.recordset;
            } catch (err) {
                console.error("Error executing query", err);
            }
        }
    },

}

module.exports = eventFeedbackResolvers;