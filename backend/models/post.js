'use strict'
const { db } = require('../config/connexion')

const { Sequelize, DataTypes } = require('sequelize')

const post = db.define('Post', {
  // Model attributes are defined here
  userId:       DataTypes.INTEGER,
  content:      DataTypes.STRING,
  attachment:   DataTypes.STRING,
  likes:        DataTypes.INTEGER,
})

module.exports = post
