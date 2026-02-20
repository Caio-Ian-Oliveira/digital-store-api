/**
 * DTO de resposta para upload de imagem.
 * Retorna a URL segura e o identificador público do Cloudinary.
 */
const UploadImageResponseDto = {
  /**
   * Transforma o resultado do upload em resposta segura para a API.
   * @param {Object} data - Dados retornados pelo serviço de upload.
   * @param {string} data.url - URL segura da imagem no Cloudinary.
   * @param {string} data.public_id - Identificador público da imagem no Cloudinary.
   * @returns {{url: string, public_id: string}} Dados filtrados.
   */
  toResponse(data) {
    return {
      url: data.url,
      public_id: data.public_id,
    };
  },
};

module.exports = UploadImageResponseDto;
