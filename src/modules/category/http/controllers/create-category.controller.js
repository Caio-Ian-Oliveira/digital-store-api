const CreateCategoryService = require("../../core/services/create-category.service");

/**
 * @swagger
 * /v1/category:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags:
 *       - Categorias
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               use_in_menu:
 *                 type: boolean
 *                 default: false
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *       400:
 *         description: Erro de validação ou nome/slug já existente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Categoria já existe (nome ou slug duplicado)
 */

/**
 * Controller responsável pela criação de categorias.
 * Recebe a requisição HTTP e delega ao serviço de criação.
 */
class CreateCategoryController {
  /**
   * Processa a requisição de criação de categoria.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com a categoria criada (201).
   */
  async handle(req, res) {
    const category = await CreateCategoryService.execute(req.body);
    return res.status(201).json(category);
  }
}

module.exports = new CreateCategoryController();
