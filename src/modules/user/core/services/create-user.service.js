const AppError = require("../../../../shared/errors/AppError");
const userRepository = require("../../persistence/user.repository");

/**
 * Service responsável pelo cadastro de novos usuários.
 * Valida confirmação de senha e unicidade de e-mail antes de criar.
 */
class CreateUserService {
  /**
   * Registra um novo usuário após validações.
   * O campo 'role' nunca é aceito de entrada externa — é sempre definido
   * como 'USER' na camada de repositório para prevenir escalação de privilégios.
   * @param {Object} data - Dados de cadastro.
   * @param {string} data.firstname - Primeiro nome do usuário.
   * @param {string} data.surname - Sobrenome do usuário.
   * @param {string} data.email - Endereço de e-mail do usuário.
   * @param {string} data.password - Senha desejada.
   * @param {string} data.confirmPassword - Confirmação da senha (deve ser igual).
   * @returns {Promise<Object>} O registro do usuário criado.
   * @throws {AppError} 400 - Se as senhas não coincidem ou e-mail já está cadastrado.
   */
  async execute({ firstname, surname, email, password, confirmPassword }) {
    if (password !== confirmPassword) {
      throw new AppError("As senhas não coincidem.", 400);
    }

    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("Este usuário já está cadastrado.", 400);
    }

    const user = await userRepository.create({ firstname, surname, email, password });
    return user;
  }
}

module.exports = new CreateUserService();
