const CreateProductService = require("../../core/services/create-product.service");
const CreateProductResponseDto = require("../dto/response/create-product.response.dto");

/**
 * @swagger
 * /v1/product:
 *   post:
 *     summary: Cria um novo produto
 *     tags:
 *       - Produtos
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
 *               - price
 *             properties:
 *               enabled:
 *                 type: boolean
 *                 default: false
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               use_in_menu:
 *                 type: boolean
 *                 default: false
 *               stock:
 *                 type: integer
 *                 default: 0
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               price_with_discount:
 *                 type: number
 *               category_ids:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: uuid
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                     content:
 *                       type: string
 *               options:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     shape:
 *                       type: string
 *                       enum: [square, circle]
 *                     radius:
 *                       type: integer
 *                     type:
 *                       type: string
 *                       enum: [text, color]
 *                     values:
 *                       type: array
 *                       items:
 *                         type: string
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro de validação ou conflito de dados
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
 *                   example: "Erro de validação: conflito de dados."
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       field:
 *                         type: string
 *                         example: slug
 *                       message:
 *                         type: string
 *                         example: Este slug já está em uso.
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Sem permissão (apenas ADMIN)
 */

/**
 * Controller responsável pela criação de produtos.
 * Recebe a requisição HTTP e delega ao serviço de criação.
 */
class CreateProductController {
  /**
   * Processa a requisição de criação de produto.
   * @param {import('express').Request} req - Objeto de requisição Express.
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com o produto criado (201).
   */
  async handle(req, res) {
    const body = req.body;
    const createdProduct = await CreateProductService.execute(body);
    return res.status(201).json(CreateProductResponseDto.toResponse(createdProduct));
  }
}

module.exports = new CreateProductController();
