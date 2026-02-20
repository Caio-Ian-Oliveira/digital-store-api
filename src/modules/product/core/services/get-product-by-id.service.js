const AppError = require("../../../../shared/errors/AppError");
const ProductRepository = require("../../persistence/product.repository");

class GetProductByIdService {
    async execute(targetProductId) {
        const product = await ProductRepository.findById(targetProductId);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        return product;
    }
}

module.exports = new GetProductByIdService();