const AppError = require('../../../../shared/errors/AppError');
const ProductRepository = require('../../persistence/product.repository');

class UpdateProductService {
    async execute(targetProductId, body) {
        const targetProduct = await ProductRepository.findById(targetProductId);

        if (!targetProduct) {
            throw new AppError('Product not found', 404);
        }

        const updatedProduct = await ProductRepository.updateProduct(targetProductId, body);

        return updatedProduct;
    }
}

module.exports = new UpdateProductService();