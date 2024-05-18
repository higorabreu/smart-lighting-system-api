import { Op } from 'sequelize';
import { LampStateRegisters } from '../models/LampStateRegisters';

export const lampStateRegistersService = {

  async getAllRegisters() {
    try {
        const allRegisters = await LampStateRegisters.findAll({
            attributes: ['id','state', 'timestamp']
        });
        return allRegisters;
    } catch (error) {
        throw new Error('Erro ao buscar os registros da tabela.');
    }
  },

  async calculateTotalOnTimeLast24Hours() {
    try {
        const last24HoursRecords = await LampStateRegisters.findAll({
            where: {
                timestamp: {
                    [Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                }
            },
            order: [['timestamp', 'ASC']]
        });

        let totalOnTime = 0;

        last24HoursRecords.forEach(record => {
            totalOnTime += 30;
        });

        return totalOnTime;
    } catch (error) {
        throw new Error('Erro ao calcular o total de tempo ligado nas últimas 24 horas.');
    }
  },

  async calculateMonthlyConsumption() {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const lastThirtyDaysRecords = await LampStateRegisters.findAll({
            where: {
                timestamp: {
                    [Op.gt]: thirtyDaysAgo
                }
            }
        });

        const totalOnTimeSeconds = lastThirtyDaysRecords.length * 30;

        const monthlyAverageConsumption = (12 / 1000) * (totalOnTimeSeconds / 3600);

        const defaultTariffRate = 0.59296;
        const monthlyCost = monthlyAverageConsumption * defaultTariffRate;

        return { monthlyAverageConsumption, monthlyCost };
    } catch (error) {
        throw new Error('Erro ao calcular o consumo médio mensal.');
    }
  },
  
  async saveState(state: boolean) {
    try {
        const timestamp = new Date();
        await LampStateRegisters.create({ state, timestamp });
    } catch (error) {
        throw new Error('Erro ao salvar o estado da lâmpada.');
    }
  }
  
};
