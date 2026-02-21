const express = require("express");
const request = require("supertest");
const DeleteProductService = require("../../../../src/modules/product/core/services/delete-product.service");
const DeleteProductController = require("../../../../src/modules/product/http/controllers/delete-product.controller");
const asyncHandler = require("../../../../src/shared/middlewares/async-handler.middleware");
const errorHandler = require("../../../../src/shared/middlewares/error-handler.middleware");
const AppError = require("../../../../src/shared/errors/app-error");

jest.mock("../../../../src/modules/product/core/services/delete-product.service");

const app = express();
app.use(express.json());
app.delete("/v1/product/:id", asyncHandler(DeleteProductController.handle));
app.use(errorHandler);

describe("DeleteProductController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 204 on successful deletion", async () => {
    DeleteProductService.execute.mockResolvedValue(true);

    const response = await request(app).delete("/v1/product/1");

    expect(response.status).toBe(204);
    expect(DeleteProductService.execute).toHaveBeenCalledWith("1");
  });

  it("should return 404 when product is not found", async () => {
    DeleteProductService.execute.mockRejectedValue(new AppError("Recurso não encontrado.", 404));

    const response = await request(app).delete("/v1/product/1");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Recurso não encontrado.");
  });

  it("should return 500 on generic error", async () => {
    DeleteProductService.execute.mockRejectedValue(new Error("Unexpected error"));

    const response = await request(app).delete("/v1/product/1");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Unexpected error");
  });
});
