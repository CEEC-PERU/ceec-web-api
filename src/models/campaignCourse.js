const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Campaign = require('./campaignModel');
const Course = require('./courseModel');
const CampaignUser= require('./campaignUser');


const CampaignCourse = sequelize.define('CampaignCourse', {
  campaign_course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
  campaign_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Campaign,
      key: 'campaign_id'
    }
  },
  course_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'course_id'
    }
  },
}, {
  tableName: 'campaign_courses',
  timestamps: false,
});



module.exports = CampaignCourse;