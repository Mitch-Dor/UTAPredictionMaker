class Polls {
  /**
     * Constructor for characters class
     * @param {*} db Pass DB object into class
     */
  constructor(db) {
    this.db = db;
  }

  // async getAllPolls(){
  //   const justPolls = new Promise((resolve, reject) => {
  //     this.db.query(`SELECT * FROM polls `, (err, res) => {
  //       if (err) {
  //         console.error(err.message);
  //         reject(err);
  //       } else {
  //         resolve(res.rows);
  //       }
  //     });
  //   });
  //   const pollOptions = new Promise((resolve, reject) => {
  //     this.db.query(`SELECT count(*) as totalSelections, po.option_id, po.str, po.poll_id FROM user_choices uc LEFT JOIN poll_options po ON po.option_id = uc.option_id GROUP BY po.option_id`, (err, res) => {
  //       if (err) {
  //         console.error(err.message);
  //         reject(err);
  //       } else {
  //         resolve(res.rows);
  //       }
  //     });
  //   });
  //   Promise.all([justPollsPromise, pollOptionsPromise])
  //   .then(([polls, options]) => {
  //     // attach options to polls
  //     const result = polls.map(poll => {
  //       const pollOpts = options
  //         .filter(o => o.poll_id === poll.poll_id)
  //         .map(({ poll_id, ...rest }) => rest); // strip out poll_id
  //       return {
  //         ...poll,
  //         options: pollOpts
  //       };
  //     });

  //     console.log(result);
  //     return result;
  //   })
  //   .catch(err => {
  //     console.error("Error building poll data:", err);
  //   });
  // }    

  async getAllPolls() {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT 
                    p.poll_id,
                    p.title,
                    p.end_date,
                    p.correct_id,
                    COALESCE(
                      json_agg(
                        json_build_object(
                          'option_id', po.option_id,
                          'str', po.str,
                          'totalSelections', COALESCE(u.count, 0)
                        )
                      ) FILTER (WHERE po.option_id IS NOT NULL),
                      '[]'
                    ) AS options,
                    COALESCE(SUM(u.count)::int, 0) AS "totalSelections"
                    FROM polls p
                    LEFT JOIN poll_options po ON po.poll_id = p.poll_id
                    LEFT JOIN (
                        SELECT option_id, COUNT(*)::int as count
                        FROM user_choices
                        GROUP BY option_id
                    ) u ON u.option_id = po.option_id
                    GROUP BY p.poll_id, p.title, p.end_date, p.correct_id
                    ORDER BY p.poll_id;`, (err, res) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }

  async getUserResponses(user_id) {
    return new Promise((resolve, reject) => {
      this.db.query(`SELECT poll_id, option_id AS user_selection FROM user_choices WHERE user_id = $1`, [user_id], (err, res) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }

  async postUserResponse(user_id, poll_id, option_id) {
    // Make sure that the user doesn't already have a response posted and that the date isnt past
    const poll_info = await new Promise((resolve, reject) => {
      this.db.query(
        `
        SELECT p.*, 
              COALESCE(uc.option_id, NULL) AS user_selection
        FROM polls p
        LEFT JOIN user_choices uc 
          ON uc.poll_id = p.poll_id AND uc.user_id = $1
        WHERE p.poll_id = $2
          AND p.end_date > NOW()
        `,
        [user_id, poll_id],
        (err, res) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(res.rows);
          }
        }
      );
    });

    if (poll_info.length === 0) {
      // poll expired
      throw new Error("Poll has expired");
    } else if (poll_info[0].user_selection) {
      // user already voted
      throw new Error("User already voted");
    } 

    return new Promise((resolve, reject) => {
      this.db.query(`INSERT INTO user_choices (user_id, poll_id, option_id) VALUES($1, $2, $3) RETURNING *`, [user_id, poll_id, option_id], (err, res) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(res.rows);
        }
      });
    });
  }

  async getNumberCorrectResponses() {
    return new Promise((resolve, reject) => {
      this.db.query(
        `
        SELECT 
        count(*) AS correct_count,
        u.display_name,
        u.name,
        u.profile_picture
        FROM polls p
        JOIN user_choices uc ON p.correct_id = uc.option_id
        JOIN users u ON uc.user_id = u.user_id
        GROUP BY u.user_id, u.display_name, u.name, u.profile_picture;
        `,
        [],
        (err, res) => {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            resolve(res.rows);
          }
        }
      );
    });
  }
}

module.exports = Polls;