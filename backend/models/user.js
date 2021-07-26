'use strict'
const { db } = require('../config/connexion')

const { Sequelize, DataTypes } = require('sequelize')

const user = db.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  bio: DataTypes.TEXT,
  admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = user
