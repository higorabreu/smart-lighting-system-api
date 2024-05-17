'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Gerar 100 registros aleatórios
    const records = [];
    const now = new Date();

    for (let i = 0; i < 100; i++) {
      const timestamp = new Date(now.getTime() - i * 1000 * 60 * 60 * 24); // Subtrai dias em vez de segundos
      const state = Math.random() < 0.5;

      records.push({ timestamp, state });
    }

    await queryInterface.bulkInsert('lamp_state_registers', records, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('lamp_state_registers', null, {});
  }
};
