const userRepository = require("../../persistence/user.repository");
const CreateUserResponseDTO = require("../../http/dto/response/create-user.response.dto");

// Segurança: nunca aceite 'role' do body, sempre defina no repository
class CreateUserService {
  async execute({ firstname, surname, email, password, confirmPassword }) {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    // Não passe 'role' do body, será sempre USER no repository
    const user = await userRepository.create({ firstname, surname, email, password });
    return new CreateUserResponseDTO({
      id: user.id,
      firstname: user.firstname,
      surname: user.surname,
      email: user.email,
    });
  }
}

module.exports = new CreateUserService();
