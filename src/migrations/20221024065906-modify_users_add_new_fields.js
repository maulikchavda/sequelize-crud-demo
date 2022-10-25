'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('projects', 'project_name', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn('projects', 'project_unique_name', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      }),
      queryInterface.addColumn('projects', 'project_type', {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ])
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn('projects', 'project_name'),
      queryInterface.removeColumn('projects', 'project_unique_name'),
      queryInterface.removeColumn('projects', 'project_type'),
    ])
  },
}
