const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },

    email: { 
        type: String, 
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true 
    },

    role: { 
        type: String, 
        default: 'user', // Por defecto, será un usuario normal
        enum: ['user', 'admin'] // Solo se permiten estos dos valores
    }
}, { 
    timestamps: true  // createdAt y updatedAt automáticos
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
