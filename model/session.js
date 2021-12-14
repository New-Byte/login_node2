const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
    user_id: { type: String, unique: true  },
    token: { type: String },
    last_requested_at: { type: Date }
});


module.exports.session = mongoose.model("session", sessionSchema);