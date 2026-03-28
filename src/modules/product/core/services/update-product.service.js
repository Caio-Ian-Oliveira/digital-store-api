const AppError = require("../../../../shared/errors/app-error");
const ProductRepository = require("../../persistence/product.repository");

/**
 * Serviço responsável pela atualização de produtos.
 * Verifica existência, processa imagens (se fornecidas) e delega ao repository.
 */
class UpdateProductService {
  /**
   * Atualiza um produto existente pelo ID.
   * @param {number} targetProductId - ID numérico do produto a ser atualizado.
   * @param {Object} body - Dados de atualização (campos opcionais, PATCH).
   * @param {string} [body.name] - Novo nome do produto.
   * @param {string} [body.slug] - Novo slug do produto.
   * @param {number} [body.price] - Novo preço do produto.
   * @param {number} [body.price_with_discount] - Novo preço com desconto.
   * @param {boolean} [body.enabled] - Novo estado de habilitação.
   * @param {number} [body.stock] - Novo estoque.
   * @param {string} [body.description] - Nova descrição.
   * @param {Object[]} [body.images] - Novas imagens a serem processadas.
   * @param {Object[]} [body.options] - Novas opções do produto.
   * @param {string[]} [body.category_ids] - Novos UUIDs das categorias.
   * @returns {Promise<Object>} O produto atualizado com suas relações.
   * @throws {AppError} 404 - Se o produto não for encontrado.
   */
  async execute(targetProductId, body) {
    const targetProduct = await ProductRepository.findById(targetProductId);

    if (!targetProduct) {
      throw new AppError("Recurso não encontrado.", 404);
    }

    // Verifica se o novo nome ou slug já existe em OUTRO produto
    if (body.name || body.slug) {
      const duplicate = await ProductRepository.findDuplicateExcludingId(
        body.name || targetProduct.name,
        body.slug || targetProduct.slug,
        targetProductId,
      );

      if (duplicate) {
        const errors = [];
        if (body.name && duplicate.name === body.name) {
          errors.push({ field: "name", message: "Este nome de produto já está em uso por outro produto." });
        }
        if (body.slug && duplicate.slug === body.slug) {
          errors.push({ field: "slug", message: "Este slug já está em uso por outro produto." });
        }
        if (errors.length > 0) {
          throw new AppError("Erro de validação: conflito de dados na atualização.", 400, errors);
        }
      }
    }

    // Processa imagens: se o front mandar {type, content}, extraímos apenas o content (URL)
    if (body.images && body.images.length > 0) {
      body.images = body.images.map((img) => img.content);
    }

    const updatedProduct = await ProductRepository.updateProduct(targetProductId, body);

    return updatedProduct;
  }
}

module.exports = new UpdateProductService();
