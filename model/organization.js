const mongoose = require('mongoose');
const organizationSchema = new mongoose.Schema({
    organization_id: { type: String, unique: true },
    organization_admin_id: { type: String, default: null },
    organization_name: { type: String, default: null },
    organization_address: { type: String, default: null },
    organization_email_id: { type: String, default: null },
    organization_license_details: { type: String, default: null },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
});


module.exports.organization = mongoose.model("organization", organizationSchema);