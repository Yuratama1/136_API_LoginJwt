const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

const User = db.User;

async function register(req, res) {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ 
                message: 'Email and password wajib di isi' 
            });
        }

        const existingUser = await User.findOne({ 
            where: { email } 
        });

        if(existingUser){
            return res.status(400).json({
                message: 'Email sudah terdaftar'
            });
        }

        return res.status(201).json({
            message: 'User berhasil di buat',
            data: {
                id: user.id,
            }
        });
        
    } catch (err) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function login(req, res) {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({
                message: 'Email dan password wajib di isi'
            });
        }

        const user = await User.findOne({ 
            where: { email } 
        });

        if(!user){
            return res.status(400).json({
                message: 'Email atau password salah'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Email atau password salah'
            });
        }
    }
}