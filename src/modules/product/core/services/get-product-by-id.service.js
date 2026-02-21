const AppError = require("../../../../shared/errors/app-error");
const ProductRepository = require("../../persistence/product.repository");

/**
 * Serviço responsável por buscar um produto pelo ID.
 * Retorna o produto completo com imagens, opções e categorias.
 */
class GetProductByIdService {
  /**
   * Busca um produto específico pelo seu identificador.
   * @param {number} targetProductId - ID numérico do produto.
   * @returns {Promise<Object>} O produto encontrado com suas relações.
   * @throws {AppError} 404 - Se o produto não for encontrado.
   */
  async execute(targetProductId) {
    const product = await ProductRepository.findById(targetProductId);

    if (!product) {
      throw new AppError("Recurso não encontrado.", 404);
    }

    return product;
  }
}

module.exports = new GetProductByIdService();
