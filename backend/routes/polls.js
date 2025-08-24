module.exports = function (app, database) {
    app.get('/GETallPolls', (req, res) => {
        database.polls.getAllPolls().then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching polls:', error);
            res.sendStatus(401);
        });
    });

    app.put('/GETuserResponses', (req, res) => {
        database.polls.getUserResponses(req.body.user_id).then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching user responses:', error);
            res.sendStatus(401);
        });
    })

    app.post('/POSTuserResponse', (req, res) => {
        database.polls.postUserResponse(req.body.user_id, req.body.poll_id, req.body.option_id).then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching user responses:', error);
            res.sendStatus(401);
        });
    })
};