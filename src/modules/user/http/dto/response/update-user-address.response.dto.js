const GetUserProfileResponseDto = require("./get-user-profile.response.dto");

/**
 * DTO para a resposta do PUT /v1/user/address.
 * Reutiliza o mapeamento do perfil e adiciona a mensagem de sucesso.
 */
class UpdateUserAddressResponseDto {
  /**
   * @param {Object} user - Model do Sequelize com addresses incluídos.
   * @returns {Object} Resposta com mensagem + perfil flat.
   */
  static fromDomain(user) {
    return {
      message: "Endereço atualizado com sucesso",
      user: GetUserProfileResponseDto.fromDomain(user),
    };
  }
}

module.exports = UpdateUserAddressResponseDto;
