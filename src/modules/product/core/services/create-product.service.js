const AppError = require("../../../../shared/errors/app-error");
const ProductRepository = require("../../persistence/product.repository");
const CategoryRepository = require("../../../category/persistence/category.repository");

/**
 * Serviço responsável pela criação de produtos.
 * Valida unicidade (nome/slug), existência das categorias informadas
 * e processa as imagens antes de delegar a persistência ao repository.
 */
class CreateProductService {
  /**
   * Cria um novo produto com imagens, opções e categorias.
   * @param {Object} data - Dados do produto vindos do body validado.
   * @param {string} data.name - Nome do produto.
   * @param {string} data.slug - Slug do produto.
   * @param {number} data.price - Preço do produto.
   * @param {number} [data.price_with_discount] - Preço com desconto.
   * @param {boolean} [data.enabled=false] - Se o produto está habilitado.
   * @param {number} [data.stock=0] - Estoque inicial.
   * @param {boolean} [data.use_in_menu=false] - Se aparece no menu.
   * @param {string|null} [data.description=null] - Descrição do produto.
   * @param {string[]} [data.category_ids=[]] - UUIDs das categorias.
   * @param {Object[]} [data.images=[]] - Imagens a serem processadas.
   * @param {Object[]} [data.options=[]] - Opções do produto.
   * @returns {Promise<Object>} O produto criado com relações (imagens, opções, categorias).
   * @throws {AppError} 400 - Se já existir produto com mesmo nome ou slug.
   * @throws {AppError} 400 - Se alguma categoria informada não for encontrada.
   */
  async execute(data) {
    const {
      category_ids = [],
      images = [],
      options = [],
      enabled = false,
      stock = 0,
      use_in_menu = false,
      description = null,
      price_with_discount,
      ...rest
    } = data;

    const productData = {
      ...rest,
      enabled,
      stock,
      use_in_menu,
      description,
      price_with_discount: price_with_discount !== undefined ? price_with_discount : rest.price,
    };

    const existing = await ProductRepository.findByNameOrSlug(productData.name, productData.slug);

    if (existing) {
      throw new AppError("Produto já existe (nome ou slug duplicado)", 400);
    }

    if (category_ids.length > 0) {
      const categories = await CategoryRepository.findByIds(category_ids);

      if (categories.length !== category_ids.length) {
        const foundIds = categories.map((c) => c.id);
        const notFound = category_ids.filter((id) => !foundIds.includes(id));
        throw new AppError(`Categorias não encontradas: ${notFound.join(", ")}`, 400);
      }
    }

    // Processa imagens (resolve URLs) antes de passar ao repository
    const processedImageUrls = [];
    for (const image of images) {
      processedImageUrls.push(image.content);
    }

    const product = await ProductRepository.createProduct({
      productData,
      images: processedImageUrls,
      options,
      categoryIds: category_ids,
    });

    return product;
  }
}

module.exports = new CreateProductService();
