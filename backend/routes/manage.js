module.exports = function (app, database, Filter) {
    app.put('/PUT/profile', (req, res) => {
        const filter = new Filter();
        const cleanedName = filter.clean(req.body.display_name);
        if (cleanedName !== req.body.display_name) {
            console.error('Invalid Name');
            res.sendStatus(440);
        }
        database.manage.putDisplayName(req.body.user_id, req.body.display_name, req.body.profile_picture).then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error('Error updating display name:', error); // Added logging for better debugging
            res.sendStatus(401);
        });
    })
};