const AppError = require("../../../../shared/errors/AppError");
const userRepository = require("../../persistence/user.repository");

// Segurança: nunca aceite 'role' do body, sempre defina no repository
class CreateUserService {
  async execute({ firstname, surname, email, password, confirmPassword }) {
    if (password !== confirmPassword) {
      throw new AppError("Passwords do not match", 400);
    }
    // Não passe 'role' do body, será sempre USER no repository
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("Este usuário já está cadastrado.", 400);
    }
    const user = await userRepository.create({ firstname, surname, email, password });
    return user;
  }
}

module.exports = new CreateUserService();
