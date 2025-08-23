class Manage {
  /**
     * Constructor for characters class
     * @param {*} db Pass DB object into class
     */
  constructor(db) {
    this.db = db;
  }

  async putDisplayName(user_id, display_name, profile_picture){
    return new Promise((resolve, reject) => {
      this.db.query('UPDATE users SET display_name = $1, profile_picture = $2 WHERE user_id = $3 RETURNING *', [display_name, profile_picture, user_id], (err, res) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve({ user: res.rows[0], message: 'Profile Updated Successfully.' });
        }
      });
    });
  }    
  
}

module.exports = Manage;