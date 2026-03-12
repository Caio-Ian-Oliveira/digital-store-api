/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_addresses", "estado", {
      type: Sequelize.STRING(50),
      allowNull: true,
      after: "cidade",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("user_addresses", "estado");
  },
};
