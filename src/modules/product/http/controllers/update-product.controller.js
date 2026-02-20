const UpdateProductService = require("../../core/services/update-product.service");

/**
 * @swagger
 * /v1/product/{id}:
 *   patch:
 *     summary: Atualiza um produto
 *     description: |
 *       - Atualiza os dados de um produto existente (PATCH — campos opcionais).
 *       - É necessário autenticação via Bearer Token JWT.
 *       - Apenas usuários com role ADMIN podem atualizar produtos.
 *       - Imagens e opções são substituídas integralmente se fornecidas.
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do produto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enabled:
 *                 type: boolean
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               use_in_menu:
 *                 type: boolean
 *               stock:
 *                 type: integer
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
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (usuário não é ADMIN)
 *       404:
 *         description: Produto não encontrado
 */

/**
 * Controller responsável pela atualização de produtos.
 * Recebe a requisição HTTP e delega ao serviço de atualização.
 */
class UpdateProductController {
  /**
   * Processa a requisição de atualização de produto.
   * @param {import('express').Request} req - Objeto de requisição Express (params.id, body).
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com o produto atualizado (200).
   */
  async handle(req, res) {
    const targetProductId = req.params.id;
    const body = req.body;

    const updatedProduct = await UpdateProductService.execute(targetProductId, body);
    return res.status(200).json(updatedProduct);
  }
}

module.exports = new UpdateProductController();
