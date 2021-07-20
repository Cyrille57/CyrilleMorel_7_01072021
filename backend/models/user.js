'use strict';
const { db } = require('../config/connexion')

const { Sequelize, DataTypes } = require('sequelize');

const user = db.define('User', {
  // Model attributes are defined here
  username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN
});

module.exports = user;
