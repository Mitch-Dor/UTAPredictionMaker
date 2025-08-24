class Auth {
    /**
       * Constructor for auth class
       * @param {*} db Pass DB object into class
       */
    constructor(db) {
      this.db = db;
    }

    async signIn(user_id, name, email, pfp_url) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM users WHERE user_id = $1', [user_id], (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    if (res.rows && res.rows.length > 0) {
                        // User exists
                        resolve(res.rows[0]);
                    } else {
                        // User does not exist, add them to the database and sign in
                        this.db.query('INSERT INTO users (user_id, name, profile_picture, email) VALUES ($1, $2, $3, $4) RETURNING *', [user_id, name, pfp_url, email], function(err, res) {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(res.rows[0]);
                            }
                        });
                    }
                }
            });
        });
    }

    async getUser(user_id) {
        return new Promise((resolve, reject) => {
            this.db.query('SELECT * FROM users WHERE user_id = $1', [user_id], (err, res) => {
                if (err) {
                    reject(err);
                } else if (res.rows && res.rows.length > 0) {
                    resolve(res.rows[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }
}

module.exports = Auth;