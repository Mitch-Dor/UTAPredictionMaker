module.exports = function (app, database) {
    // App is of course the server so that is how we send data
    // Database we can get to the database SQL functions using database.characters.XXX()
    app.get('/GETallDraftInfo', (req, res) => {
        database.characters.getAllCharacterDraftInformation().then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching character information:', error); // Added logging for better debugging
            res.sendStatus(401);
        });
    });
};