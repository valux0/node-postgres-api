'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  await queryInterface.addColumn('Plantas', 'imagen', {
    type: Sequelize.STRING
  });
},

down: async (queryInterface) => {
  await queryInterface.removeColumn('Plantas', 'imagen');
}

};
