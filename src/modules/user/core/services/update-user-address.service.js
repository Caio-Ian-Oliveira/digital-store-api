const AppError = require("../../../../shared/errors/app-error");
const UserRepository = require("../../persistence/user.repository");

/**
 * Serviço responsável por atualizar o endereço de entrega do usuário.
 * Recebe campos em inglês (do frontend) e mapeia para português (do banco).
 */
class UpdateUserAddressService {
  /**
   * Cria ou atualiza o endereço de entrega.
   * @param {string} userId - UUID do usuário logado.
   * @param {Object} data - Dados do endereço em inglês.
   * @returns {Promise<Object>} O usuário atualizado.
   */
  async execute(userId, { address, neighborhood, city, state, cep, complement }) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    // Mapeia nomes em inglês (frontend) → português (banco)
    const addressData = {
      endereco: address,
      bairro: neighborhood,
      cidade: city,
      estado: state,
      cep,
      complemento: complement || null,
    };

    const updatedUser = await UserRepository.upsertAddress(userId, addressData);
    return updatedUser;
  }
}

module.exports = new UpdateUserAddressService();
