const GetProductByIdService = require("../../core/services/get-product-by-id.service");
const GetProductByIdResponseDto = require("../dto/response/get-product-by-id.response.dto");

/**
 * @swagger
 * /v1/product/{id}:
 *   get:
 *     summary: Busca um produto pelo ID
 *     description: |
 *       - Retorna os dados completos de um produto, incluindo imagens, opções e categorias.
 *       - Endpoint público (não requer autenticação).
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Produto não encontrado
 */

/**
 * Controller responsável pela busca de produto por ID.
 * Recebe a requisição HTTP e delega ao serviço de busca.
 */
class GetProductByIdController {
  /**
   * Processa a requisição de busca de produto por ID.
   * @param {import('express').Request} req - Objeto de requisição Express (params.id).
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com o produto encontrado (200).
   */
  async handle(req, res) {
    const targetProductId = req.params.id;
    const product = await GetProductByIdService.execute(targetProductId);

    return res.status(200).json(GetProductByIdResponseDto.toResponse(product));
  }
}

module.exports = new GetProductByIdController();
