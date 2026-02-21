const UploadImageService = require("../../core/services/upload-image.service");
const UploadImageResponseDto = require("../dto/response/upload-image.response.dto");

/**
 * @swagger
 * /v1/product/upload-image:
 *   post:
 *     summary: Upload de imagem para o Cloudinary
 *     description: |
 *       - Aceita upload via multipart/form-data (arquivo) ou JSON (base64).
 *       - É necessário autenticação via Bearer Token JWT.
 *       - Apenas usuários com role ADMIN podem fazer upload.
 *     tags:
 *       - Produtos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: image/png
 *               content:
 *                 type: string
 *                 description: Base64 da imagem
 *     responses:
 *       200:
 *         description: Upload realizado com sucesso
 *       400:
 *         description: Dados de imagem inválidos ou ausentes
 *       401:
 *         description: Token não fornecido ou inválido
 *       403:
 *         description: Acesso negado (usuário não é ADMIN)
 */

/**
 * Controller responsável pelo upload de imagens de produtos.
 * Detecta automaticamente se o upload é via arquivo (multer) ou JSON (base64).
 */
class UploadImageController {
  /**
   * Processa a requisição de upload de imagem.
   * @param {import('express').Request} req - Objeto de requisição Express (file ou body).
   * @param {import('express').Response} res - Objeto de resposta Express.
   * @returns {Promise<void>} Resposta JSON com URL e public_id do Cloudinary (200).
   */
  async handle(req, res) {
    let type, content;

    // Detecta se é upload de arquivo (multipart/form-data) ou JSON
    if (req.files && req.files.length > 0) {
      const results = [];
      for (const file of req.files) {
        const type = file.mimetype;
        const content = file.buffer.toString("base64");
        const uploadResult = await UploadImageService.execute({ type, content });
        results.push(UploadImageResponseDto.toResponse(uploadResult));
      }
      return res.status(200).json(results);
    } else if (req.body && req.body.type && req.body.content) {
      const type = req.body.type;
      const content = req.body.content;
      const result = await UploadImageService.execute({ type, content });
      return res.status(200).json([UploadImageResponseDto.toResponse(result)]);
    } else {
      return res.status(400).json({ error: "Envie arquivos no form-data (campo 'images') ou JSON com type e content" });
    }

  }
}

module.exports = new UploadImageController();
