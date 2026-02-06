const createCategoryService = require("../../../../src/modules/category/core/services/create-category.service");
const categoryRepository = require("../../../../src/modules/category/persistence/category.repository");

// Mock do repository
jest.mock("../../../../src/modules/category/persistence/category.repository");

describe("CreateCategoryService - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const validCategoryData = {
    name: "Eletrônicos",
    slug: "eletronicos",
    use_in_menu: true,
  };

  describe("execute", () => {
    it("deve criar uma categoria com sucesso quando não existe conflito de nome ou slug", async () => {
      const mockCreatedCategory = {
        id: 1,
        ...validCategoryData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mocka o findByNameOrSlug para retornar null (não encontrou duplicidade)
      categoryRepository.findByNameOrSlug.mockResolvedValue(null);
      // Mocka o create para retornar a categoria criada
      categoryRepository.create.mockResolvedValue(mockCreatedCategory);

      const result = await createCategoryService.execute(validCategoryData);

      // Verificações
      expect(categoryRepository.findByNameOrSlug).toHaveBeenCalledWith(validCategoryData.name, validCategoryData.slug);
      expect(categoryRepository.create).toHaveBeenCalledWith(validCategoryData);
      expect(result).toEqual(mockCreatedCategory);
      expect(result).toHaveProperty("id");
    });

    it("deve lançar erro quando já existe categoria com o mesmo nome ou slug", async () => {
      const existingCategory = {
        id: 2,
        name: "Outra Categoria",
        slug: "eletronicos", // Slug conflitante
      };

      // Mocka o findByNameOrSlug para retornar uma categoria existente
      categoryRepository.findByNameOrSlug.mockResolvedValue(existingCategory);

      // Verifica se o serviço lança o erro esperado
      await expect(createCategoryService.execute(validCategoryData)).rejects.toThrow(
        "Categoria já existe (nome ou slug duplicado)",
      );

      // Verifica se o método de busca foi chamado
      expect(categoryRepository.findByNameOrSlug).toHaveBeenCalledWith(validCategoryData.name, validCategoryData.slug);

      // Garante que o método create NÃO foi chamado, pois deve falhar antes
      expect(categoryRepository.create).not.toHaveBeenCalled();
    });
  });
});
