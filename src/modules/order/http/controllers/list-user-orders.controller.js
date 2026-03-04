const ListUserOrdersService = require("../../core/services/list-user-orders.service");
const ListUserOrdersResponseDto = require("../dto/list-user-orders.response.dto");

class ListUserOrdersController {
  async handle(req, res) {
    const userId = req.user.sub;

    const orders = await ListUserOrdersService.execute(userId);

    const dto = ListUserOrdersResponseDto.fromDomain(orders);

    return res.status(200).json(dto);
  }
}

module.exports = new ListUserOrdersController();
