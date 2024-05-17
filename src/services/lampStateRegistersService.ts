import { Op } from 'sequelize';
import { LampStateRegisters } from '../models/LampStateRegisters';

export const lampStateRegistersService = {

  async getAllRegisters() {
    try {
        const allRegisters = await LampStateRegisters.findAll({
            attributes: ['state', 'timestamp']
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

        last24HoursRecords.forEach((record, index) => {
            if (record.state) {
                if (index < last24HoursRecords.length - 1) {
                    const nextRecord = last24HoursRecords[index + 1];
                    const duration = (nextRecord.timestamp.getTime() - record.timestamp.getTime()) / 1000;
                    totalOnTime += duration;
                }
            }
        });

        return totalOnTime;
    } catch (error) {
        throw new Error('Erro ao calcular o total de tempo ligado nas últimas 24 horas.');
    }
  },

  async calculateMonthlyConsumption() {
    try {
        const allRecords = await LampStateRegisters.findAll();

        let totalConsumption = 0;
        let totalOnTimeSeconds = 0;
        let previousTimestamp: Date | null = null;

        allRecords.forEach(record => {
            if (record.state) {
                if (previousTimestamp) {
                  const durationSeconds = (record.timestamp.getTime() - previousTimestamp!.getTime()) / 1000;
                    totalOnTimeSeconds += durationSeconds;
                }
                previousTimestamp = record.timestamp;
            }
        });

        totalConsumption = (12 / 1000) * (totalOnTimeSeconds / 3600);

        const daysInMonth = 30;
        const monthlyAverageConsumption = totalConsumption / daysInMonth;

        // Considerando a tarifa padrão de R$ 0,59296 por kWh
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
