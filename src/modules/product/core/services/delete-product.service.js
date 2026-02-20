const ProductRepository = require('../../persistence/product.repository');

class DeleteProductService {
    async execute(targetProductId) {
       await ProductRepository.deleteProduct(targetProductId);
       return true;
    }
}

module.exports = new DeleteProductService();