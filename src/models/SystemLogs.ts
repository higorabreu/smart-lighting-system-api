import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SystemLogs {
  id?: number;
  message: string;
  timestamp: Date;
}

export interface SystemLogsInstance extends Model<SystemLogs>, SystemLogs {}

export const SystemLogs = sequelize.define<SystemLogsInstance, SystemLogs>('SystemLogs', {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  message: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  timestamp: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  timestamps: false
});
