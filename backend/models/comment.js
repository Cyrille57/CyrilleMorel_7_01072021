'use strict';
const { db } = require('../config/connexion')

const { Sequelize, DataTypes } = require('sequelize');

const comment = db.define('Comment', {
  // Model attributes are defined here
  content: DataTypes.TEXT,
  idPost: DataTypes.INTEGER,
  idUser: DataTypes.INTEGER
});



module.exports = comment;
