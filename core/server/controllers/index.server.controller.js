/**
 * Created by xujingwei on 9/14/16.
 */

exports.render = function (req, res) {

    //record the time of last user request
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    //update the record of last user request time
    req.session.lastVisit = new Date();

    //render the index ejs view
    res.render('index',{
        title: 'Hello World', //set title of the page
        user: JSON.stringify(req.user)
    });
};