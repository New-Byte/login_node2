const mongoose = require('mongoose');
const roleSchema = new mongoose.Schema({
    role_id: { type: String, unique: true  },
    organization_id: { type: String },
    role_name: { type: String }
});


module.exports.role = mongoose.model("role", roleSchema);