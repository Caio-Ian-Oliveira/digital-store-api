const cloudinary = require("../../../../config/cloudinary.config");

/**
 * Serviço responsável pelo upload de imagens para o Cloudinary.
 * Recebe o conteúdo em base64 e o tipo MIME, e retorna a URL segura.
 */
class UploadImageService {
  /**
   * Faz upload de uma imagem em base64 para o Cloudinary.
   * @param {Object} imageData - Dados da imagem.
   * @param {string} imageData.type - Tipo MIME da imagem (ex: "image/png").
   * @param {string} imageData.content - Conteúdo da imagem em base64.
   * @returns {Promise<{url: string, public_id: string}>} URL segura e ID público no Cloudinary.
   */
  async execute({ type, content }) {
    const dataUri = `data:${type};base64,${content}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "products",
      resource_type: "image",
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }
}

module.exports = new UploadImageService();
