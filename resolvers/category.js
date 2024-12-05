const { getConnection, sql } = require("../DB/db");

const categoryResolvers= {
    Query: {
        categories: async () => {
            try {
                const pool = await getConnection();
                const result = await pool.request().query("SELECT * FROM apollo.categories");
                return result.recordset;
            } catch (err) {
                console.error("Error executing query", err);
            }
        }
    }
}

module.exports = categoryResolvers;