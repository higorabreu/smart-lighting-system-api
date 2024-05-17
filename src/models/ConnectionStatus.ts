import { sequelize } from "../database";
import { DataTypes, Model } from 'sequelize'

export interface ConnectionStatus {
  id?: number;
  status: string;
  timestamp: Date;
}

export interface ConnectionStatusInstance extends Model<ConnectionStatus>, ConnectionStatus {}

export const ConnectionStatus = sequelize.define<ConnectionStatusInstance, ConnectionStatus>('ConnectionStatus', {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING
  },
  timestamp: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  timestamps: false
});
