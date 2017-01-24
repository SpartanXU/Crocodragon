/**
 * Index page controller
 */
exports.render = function (req, res) {

    //record the time of last user request
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    //update the record of last user request time
    req.session.lastVisit = new Date();

    //render the index page
    res.render('index',{
        title: 'Crocodragon',
        user: JSON.stringify(req.user)
    });

};