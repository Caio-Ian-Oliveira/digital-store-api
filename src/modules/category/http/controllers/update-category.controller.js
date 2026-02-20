/**
 * @swagger
 * /v1/category/{id}:
 *   patch:
 *     summary: Atualiza uma categoria pelo ID
 *     description: |
 *       - Atualiza os dados de uma categoria existente.
 *       - É necessário autenticação via Bearer Token JWT.
 *       - Apenas usuários com role ADMIN podem atualizar categorias.
 *       - Todos os campos (name, slug, use_in_menu) são obrigatórios.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *               - use_in_menu
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 2
 *                 example: "Eletrônicos"
 *               slug:
 *                 type: string
 *                 minLength: 2
 *                 example: "eletronicos"
 *               use_in_menu:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
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
 *         description: Erro de validação ou categoria não encontrada
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (usuário não é ADMIN)
 */
const UpdateCategoryService = require("../../core/services/update-category.service");
const UpdateCategoryResponseDto = require("../dto/response/update-category.response.dto");

/**
 * Controller responsável pela atualização de categorias.
 * Recebe a requisição HTTP e delega ao serviço de atualização.
 */
class UpdateCategoryController {
  /**
   * Processa a requisição de atualização de categoria.
   * @param {import('express').Request} req - Objeto de requisição Express (params.id, body).
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com a categoria atualizada (200).
   */
  async handle(req, res) {
    const targetCategoryId = req.params.id;
    const body = req.body;
    const updatedCategory = await UpdateCategoryService.execute(targetCategoryId, body);

    return res.json(UpdateCategoryResponseDto.toResponse(updatedCategory));
  }
}

module.exports = new UpdateCategoryController();