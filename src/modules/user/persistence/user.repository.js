const { User } = require("../../../models");

class UserRepository {
  // Segurança: sempre define role como 'USER' no cadastro público, ignorando qualquer valor do cliente
  async create({ firstname, surname, email, password }) {
    const user = await User.create({ firstname, surname, email, password, role: "USER" });
    return user;
  }

  async findById(targetUserId) {
    const user = await User.findByPk(targetUserId, {
      where: { deleted_at: null }
    });
    return user;
  }

  async findByEmail(email) {
    const user = await User.findOne({
      where: {
        email,
        deleted_at: null
      }
    });
    return user;
  }

  async updateUser(targetUserId, updateData) {
    // Permite alterar apenas os campos 'firstname' e 'surname'
    const filteredData = {};
    if (updateData.firstname !== undefined) {
      filteredData.firstname = updateData.firstname;
    }
    if (updateData.surname !== undefined) {
      filteredData.surname = updateData.surname;
    }
    const [updated] = await User.update(filteredData, { where: { id: targetUserId } });
    if (!updated) return null;
    return await this.findById(targetUserId);
  }

  async softDelete(targetUserId) {
    const [updated] = await User.update(
      { deleted_at: new Date() },
      { where: { id: targetUserId, deleted_at: null } }
    );
    return updated > 0;
  }

}

module.exports = new UserRepository();
