const AppError = require("../../../../shared/errors/app-error");
const ProductRepository = require("../../persistence/product.repository");

/**
 * Serviço responsável pela exclusão de produtos (hard delete).
 * Verifica existência via repository antes de deletar.
 */
class DeleteProductService {
  /**
   * Executa a exclusão de um produto pelo ID.
   * @param {number} targetProductId - ID numérico do produto a ser deletado.
   * @returns {Promise<boolean>} true se o produto foi deletado.
   * @throws {AppError} 404 - Se o produto não for encontrado.
   */
  async execute(targetProductId) {
    const deleted = await ProductRepository.deleteProduct(targetProductId);
    if (!deleted) {
      throw new AppError("Recurso não encontrado.", 404);
    }
    return true;
  }
}

module.exports = new DeleteProductService();
