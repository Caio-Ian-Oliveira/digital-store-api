/**
 * DTO que converte o perfil do usuário (User + UserAddress) para o contrato flat do frontend.
 * Mapeia nomes em português do banco para inglês no contrato da API.
 */
class GetUserProfileResponseDto {
  /**
   * @param {Object} user - Model do Sequelize com addresses incluídos.
   * @returns {Object} Perfil flat com campos de endereço em inglês.
   */
  static fromDomain(user) {
    const addr = user.addresses?.[0] || null;

    return {
      id: user.id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
      address: addr?.endereco || "",
      neighborhood: addr?.bairro || "",
      city: addr?.cidade || "",
      state: addr?.estado || "",
      cep: addr?.cep || "",
      complement: addr?.complemento || "",
    };
  }
}

module.exports = GetUserProfileResponseDto;
