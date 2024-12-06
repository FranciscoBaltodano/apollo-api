const { getConnection, sql } = require("../DB/db");

const userResolvers = {
    Query: {
      users: async (_ , args) => {
        try {
          const pool = await getConnection();

          const request =  pool.request();
          
          let query = "SELECT * FROM initium.users WHERE 1=1";
          
          if (args.id) {
            request.input("user_id", sql.Int, args.id);
            query += " AND id = @user_id";
          }
          const result = await request.query(query);
          return result.recordset;
        } catch (err) {
          console.error("Error executing query", err);
          throw new Error("Failed to fetch users");
        }
      },
    },
    User: {
        events: async (parent) => {
            try {
                const pool = await getConnection();
                const result = await pool.request()
                    .input("user_id", sql.Int, parent.id)
                    .query("SELECT * FROM apollo.events WHERE user_id = @user_id");
                return result.recordset;
            } catch (err) {
                console.error("Error executing query", err);
            }
        }
    }
}

module.exports = userResolvers;