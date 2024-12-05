const { getConnection, sql } = require("../DB/db");

const categoryEventResolvers= {
    Query: {
        users: async () => {
            try {
                const pool = await getConnection();
                const result = await pool.request().query("SELECT * FROM initium.users");
                return result.recordset;
            } catch (err) {
                console.error("Error executing query", err);
            }
        }
    },

}

module.exports = categoryEventResolvers;