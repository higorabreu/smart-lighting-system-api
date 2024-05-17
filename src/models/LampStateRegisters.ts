import { sequelize } from '../database';
import { DataTypes, Model, Optional } from 'sequelize';

export interface LampStateRegisters {
  id?: number;
  state: boolean;
  timestamp: Date;
}

export interface LampStateRegistersInstance extends Model<LampStateRegisters>, LampStateRegisters {}

export const LampStateRegisters = sequelize.define<LampStateRegistersInstance, LampStateRegisters>('LampStateRegisters', {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  state: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  timestamp: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  timestamps: false
});
