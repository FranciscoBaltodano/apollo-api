const { getConnection, sql } = require("../DB/db");

const userResolvers= {
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
    User: {
        events: async (parent) => {
            try {
                const pool = await getConnection();
                const result = await pool.request()
                    .input("user_id", sql.Int, parent.id)
                    .query("SELECT * FROM initium.events WHERE user_id = @user_id");
                return result.recordset;
            } catch (err) {
                console.error("Error executing query", err);
            }
        }
    }
}

module.exports = userResolvers;