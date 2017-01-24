/**
 * wallet model
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WalletSchema = new Schema ({
    //create time
    created: {
        type: Date,
        default: Date.now
    },
    //author who create the document
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    //user age
    birthday: {
        type: String
    },
    //user gender, selecte from "Male" and "Female"
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    //user address
    address: {
        type: String
    },
    //user avatar image
    avatar: {
        type: String
    },
    zip: {
        type: Number
    }
});

mongoose.model('Wallet', WalletSchema);