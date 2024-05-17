import { Request, Response } from 'express';
import { lampStateRegistersService } from '../services/lampStateRegistersService';

export const lampStateRegistersController = {

  // GET /registers
  async getAllRegisters(req: Request, res: Response) {
    try {
        const allRegisters = await lampStateRegistersService.getAllRegisters();
        return res.json(allRegisters);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao buscar os registros da tabela.' });
    }
  },


  // GET /lamp-on-time
  async getTotalOnTimeLast24Hours(req: Request, res: Response) {
    try {
        const totalOnTimeLast24Hours = await lampStateRegistersService.calculateTotalOnTimeLast24Hours();
          
        return res.json({ totalOnTimeLast24Hours });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao obter o tempo de duração da lâmpada acesa.' });
    }
  },

  // GET /monthly-consumption
  async getMonthlyConsumption(req: Request, res: Response) {
    try {
        const { monthlyAverageConsumption, monthlyCost } = await lampStateRegistersService.calculateMonthlyConsumption();
        
        return res.json({ monthlyAverageConsumption, monthlyCost });
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao calcular o consumo médio mensal.' });
    }
},

  // POST /register
  async saveState(req: Request, res: Response) {
    try {
      const { state } = req.body;
      await lampStateRegistersService.saveState(state);
      return res.status(201).json({ message: 'Estado da lâmpada salvo com sucesso.' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao salvar o estado da lâmpada.' });
    }
  }


};
