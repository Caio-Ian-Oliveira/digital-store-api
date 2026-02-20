/**
 * @swagger
 * /v1/category/{id}:
 *   get:
 *     summary: Busca uma categoria pelo ID
 *     description: |
 *       - Retorna os dados de uma categoria específica.
 *       - É necessário autenticação via Bearer Token JWT.
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da categoria (UUID)
 *     responses:
 *       200:
 *         description: Categoria encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                 name:
 *                   type: string
 *                 slug:
 *                   type: string
 *                 use_in_menu:
 *                   type: boolean
 *       400:
 *         description: ID inválido (não é um UUID válido)
 *       401:
 *         description: Token não fornecido ou inválido
 *       404:
 *         description: Categoria não encontrada
 */
const GetCategoryByIdService = require("../../core/services/get-category-by-id.service");
const GetCategoryByIdResponseDto = require("../dto/response/get-category-by-id.response.dto");

/**
 * Controller responsável pela busca de categoria por ID.
 * Recebe a requisição HTTP e delega ao serviço de busca.
 */
class GetCategoryByIdController {
  /**
   * Processa a requisição de busca de categoria por ID.
   * @param {import('express').Request} req - Objeto de requisição Express (params.id).
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com a categoria encontrada (200).
   */
  async handle(req, res) {
    const targetCategoryId = req.params.id;
    const category = await GetCategoryByIdService.execute(targetCategoryId);
    return res.status(200).json(GetCategoryByIdResponseDto.toResponse(category));
  }
}

module.exports = new GetCategoryByIdController();
