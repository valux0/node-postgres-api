'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plantas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      nombre_cientifico: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      riego: {
        type: Sequelize.STRING
      },
      luz: {
        type: Sequelize.STRING
      },
      altura_cm: {
        type: Sequelize.INTEGER
      },
      fecha_registro: {
        type: Sequelize.DATE
      },
      imagen: {
      type: Sequelize.STRING
},
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Plantas');
  }
};
