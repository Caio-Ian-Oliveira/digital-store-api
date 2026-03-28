const { initModels } = require("../../../models");
const { Category, Sequelize } = initModels();

/**
 * Repositório responsável pelo acesso a dados de categorias.
 * Encapsula todas as operações de persistência usando o model Sequelize.
 */
class CategoryRepository {
  /**
   * Cria uma nova categoria no banco de dados.
   * @param {Object} data - Dados da categoria.
   * @returns {Promise<Object>} A categoria criada.
   */
  async create(data) {
    const createdCategory = await Category.create(data);
    return createdCategory;
  }

  /**
   * Busca uma categoria pelo nome ou slug (verificação de duplicidade).
   * @param {string} name - Nome da categoria.
   * @param {string} slug - Slug da categoria.
   * @returns {Promise<Object|null>} A categoria encontrada ou null.
   */
  async findByNameOrSlug(name, slug) {
    return await Category.findOne({
      where: {
        [Sequelize.Op.or]: [{ name }, { slug }],
      },
    });
  }

  /**
   * Busca uma categoria pelo seu identificador primário.
   * @param {string} id - UUID da categoria.
   * @returns {Promise<Object|null>} A categoria encontrada ou null.
   */
  async findById(id) {
    const category = await Category.findByPk(id);
    return category;
  }

  /**
   * Busca múltiplas categorias pelos seus IDs.
   * @param {string[]} ids - Array de UUIDs das categorias.
   * @returns {Promise<Object[]>} Array de categorias encontradas.
   */
  async findByIds(ids) {
    return await Category.findAll({
      where: { id: ids },
    });
  }

  /**
   * Busca categorias com filtros e paginação.
   * @param {Object} params - Parâmetros de busca.
   * @param {number} [params.limit=12] - Limite de itens por página (-1 para todos).
   * @param {number} [params.page=1] - Número da página.
   * @param {string[]} [params.fields] - Campos a serem retornados na projeção.
   * @param {boolean} [params.use_in_menu] - Filtro de exibição no menu.
   * @returns {Promise<{data: Object[], total: number}>} Dados paginados com total.
   */
  async searchCategories({ limit, page, fields, use_in_menu } = {}) {
    const queryOptions = {
      where: use_in_menu === true ? { use_in_menu: 1 } : {},
      raw: true,
      nest: true,
    };

    // Projeção de campos (garante que o ID sempre esteja presente)
    if (fields?.length) {
      queryOptions.attributes = fields.includes("id") ? fields : ["id", ...fields];
    }

    // Normalização defensiva de paginação
    const safeLimit = parseInt(limit, 10) || 12;
    const safePage = parseInt(page, 10) || 1;

    if (safeLimit !== -1) {
      queryOptions.limit = safeLimit;
      queryOptions.offset = (Math.max(safePage, 1) - 1) * safeLimit;
    }

    const { count, rows } = await Category.findAndCountAll(queryOptions);

    return { data: rows, total: count };
  }

  /**
   * Atualiza uma categoria pelo ID.
   * @param {string} id - UUID da categoria.
   * @param {Object} data - Dados a serem atualizados.
   * @returns {Promise<Object|null>} A categoria atualizada ou null se não encontrada.
   */
  async update(id, data) {
    const [updated] = await Category.update(data, { where: { id } });
    if (!updated) return null;
    return await this.findById(id);
  }

  /**
   * Realiza o soft delete de uma categoria (exclusão lógica via paranoid do Sequelize).
   * @param {string} id - UUID da categoria.
   * @returns {Promise<Object|null>} A categoria deletada ou null se não encontrada.
   */
  async softDelete(id) {
    const category = await this.findById(id);
    if (!category) return null;
    await Category.destroy({ where: { id } });
    return category;
  }
}

module.exports = new CategoryRepository();
