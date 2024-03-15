const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); 
const User = require('./userModel');
const Campaign= require('./campaignModel')
const State = require('./StateModel');
const CampaignUser = sequelize.define('CamapaignUser', {
 id_campaign_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  campaign_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Campaign, 
      key: 'campaign_id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User, 
      key: 'user_id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  id_state: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: State,
      key: 'id_state'
    }
  }
}, {
  tableName: 'campaign_user',
  timestamps: false,
});
/*
const recreateTable = async () => {
  try {
    await CampaignUser.drop();
    await CampaignUser.sync();
    console.log('Table campaign_user dropped and recreated successfully');
  } catch (error) {
    console.error(`Error while recreating table: ${error}`);
  }
};

recreateTable();*/

module.exports = CampaignUser;
 

