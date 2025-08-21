class Polls {
  /**
     * Constructor for characters class
     * @param {*} db Pass DB object into class
     */
  constructor(db) {
    this.db = db;
  }

  // ID, Name, Class, img link
  async getAllCharacterDraftInformation(){
    return new Promise((resolve, reject) => {
      this.db.query('SELECT pokemon_id, pokemon_name, pokemon_class, can_exp_share, can_top_lane_carry, can_jungle_carry, can_bottom_lane_carry FROM playable_characters NATURAL JOIN pokemon_attributes', (err, res) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }    
}

module.exports = Polls;