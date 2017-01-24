/**
 * Wallet controller
 */

var mongoose = require('mongoose'),
    Wallet = mongoose.model('Wallet'),
    fs = require('fs');

//error handling function
var getErrorMessage = function(err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message; //if the error is known, return the correct message
        }
    } else {
        return 'Unknow server error'; //if the error unknow, return "Unknow server error"
    }
};

//create method to create new wallet
exports.create = function(req, res) {
    var wallet = new Wallet(req.body);
    wallet.creator = req.user; //add the creator info
    //check if user uploaded the avatar 
    //if not, passed image saving process
    if (req.body.avatar) {
        var avatarPath = 'upload/wallet/' + wallet._id + '_avatar.png'; //avatar saving path
    
        //fs writeFile function to save avatar image with a gaven path
        fs.writeFile(avatarPath, req.body.avatar, function() {
            wallet.avatar = avatarPath; //pass the image path to the wallet database to save
        });
    };
    
    //save the wallet and avoid error
    wallet.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err) //if there are errors, call getErrorMessage function to handle the error
            });
        } else {
            res.json(wallet);//if no errors, save the wallet as json format
        }
    });
};

//Express router feature manipulate wallet object to contain walletId route parameter
//work as a middleware for other features
exports.walletByID = function(req, res, next, id) {
    //find the wallet using ID and reference it using req.wallet
    //populate method to add user field to the creator property of the wallet object
    Wallet.findById(id).populate('creator','firstName lastName fullName').exec(function(err, wallet) {
        if (err) return next(err);
        if (!wallet) return next(new Error('Failed to load wallet'+ id));

        req.wallet = wallet;
        next();
    })
}

//read method to read an existing wallet page from database
exports.read = function(req, res) {
    res.json(req.wallet);
};

//update method to update an existing wallet document
exports.update = function(req, res) {
    var wallet = req.wallet;

    wallet.birthday = req.body.birthday;
    wallet.gender = req.body.gender;
    wallet.address = req.body.address;
    wallet.avatar.data = req.body.avatar;
    wallet.avatar.zip = req.body.zip;

    wallet.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(wallet);
        }
    });
};

//delete method to delete an existing wallet document
exports.delete = function(req, res) {
    var wallet = req.wallet;

    wallet.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(wallet);
        }
    });
};

//check if user has authorization to access the wallet
//only executed for requests containing the walletId route parameter
exports.hasAuthorization = function(req, res, next) {
    if (req.wallet.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};