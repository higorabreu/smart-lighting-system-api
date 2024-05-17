'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Gerar 30 registros para os últimos 30 dias
    const records = [];
    const now = new Date();

    for (let i = 0; i < 30; i++) {
      const timestamp = new Date(now.getTime() - i * 1000 * 60 * 60 * 24);
      const state = true;

      records.push({ timestamp, state });
    }

    await queryInterface.bulkInsert('lamp_state_registers', records, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lamp_state_registers', null, {});
  }
};
