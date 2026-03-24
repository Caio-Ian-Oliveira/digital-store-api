  ● Update Product - Integration Tests › PATCH /v1/product/:id - Deve retornar 400 se o id for inválido (não numérico)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      226 |       .send(updatePayload);
      227 |
    > 228 |     expect(response.status).toBe(400);
          |                             ^
      229 |     expect(response.body.errors).toBeDefined();
      230 |   });
      231 |

      at Object.toBe (tests/modules/product/integration/update-product.int.spec.js:228:29)

  ● Update Product - Integration Tests › PATCH /v1/product/:id - Deve atualizar opções do produto com sucesso

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      249 |       .send({ options: newOptions });
      250 |
    > 251 |     expect(response.status).toBe(200);
          |                             ^
      252 |     expect(response.body.options).toHaveLength(1);
      253 |     expect(response.body.options[0].title).toBe("Tamanho Novo");
      254 |

      at Object.toBe (tests/modules/product/integration/update-product.int.spec.js:251:29)

  ● Update Product - Integration Tests › PATCH /v1/product/:id - Deve atualizar categorias do produto com sucesso

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      269 |       .send({ category_ids: [newCategory.id] });
      270 |
    > 271 |     expect(response.status).toBe(200);
          |                             ^
      272 |
      273 |     // Verifica se a categoria foi atualizada
      274 |     const product = await Product.findByPk(testProduct.id, { include: ["categories"] });     

      at Object.toBe (tests/modules/product/integration/update-product.int.spec.js:271:29)

  ● Update Product - Integration Tests › PATCH /v1/product/:id - Deve retornar 400 se campos excederem o limite de caracteres

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      304 |       .send(updatePayload);
      305 |
    > 306 |     expect(response.status).toBe(400);
          |                             ^
      307 |     expect(response.body).toHaveProperty("errors");
      308 |
      309 |     const errors = response.body.errors;

      at Object.toBe (tests/modules/product/integration/update-product.int.spec.js:306:29)

 FAIL  tests/modules/cart/integration/cart.int.spec.js (6.685 s)
  ● Cart Module Integration Tests › GET /v1/cart › deve retornar carrinho vazio quando não há itens

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      105 |         .set("Authorization", `Bearer ${tokenA}`);
      106 |
    > 107 |       expect(response.status).toBe(200);
          |                               ^
      108 |       expect(response.body.cart).toBeDefined();
      109 |       expect(response.body.cart.items).toEqual([]);
      110 |     });

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:107:31)

  ● Cart Module Integration Tests › GET /v1/cart › deve retornar itens com dados do produto populados    

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      125 |         .set("Authorization", `Bearer ${tokenA}`);
      126 |
    > 127 |       expect(response.status).toBe(200);
          |                               ^
      128 |       expect(response.body.cart.items).toHaveLength(1);
      129 |
      130 |       const item = response.body.cart.items[0];

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:127:31)

  ● Cart Module Integration Tests › POST /v1/cart/add › deve adicionar um produto ao carrinho

    expect(received).toBe(expected) // Object.is equality

    Expected: 201
    Received: 401

      161 |         });
      162 |
    > 163 |       expect(response.status).toBe(201);
          |                               ^
      164 |       expect(response.body.product_id).toBe(product1.id);
      165 |       expect(response.body.quantity).toBe(1);
      166 |       expect(response.body.selected_color).toBe("Azul");

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:163:31)

  ● Cart Module Integration Tests › POST /v1/cart/add › deve somar a quantidade quando o mesmo item já existe

    expect(received).toBe(expected) // Object.is equality

    Expected: 201
    Received: 401

      190 |         });
      191 |
    > 192 |       expect(response.status).toBe(201);
          |                               ^
      193 |       expect(response.body.quantity).toBe(5); // 2 + 3
      194 |     });
      195 |

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:192:31)

  ● Cart Module Integration Tests › POST /v1/cart/add › deve criar novo item quando cor/tamanho for diferente

    TypeError: Cannot read properties of undefined (reading 'items')

      220 |         .set("Authorization", `Bearer ${tokenA}`);
      221 |
    > 222 |       expect(listResponse.body.cart.items).toHaveLength(2);
          |                                     ^
      223 |     });
      224 |
      225 |     it("deve rejeitar product_id inexistente (404)", async () => {

      at Object.items (tests/modules/cart/integration/cart.int.spec.js:222:37)

  ● Cart Module Integration Tests › POST /v1/cart/add › deve rejeitar product_id inexistente (404)       

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 401

      229 |         .send({ product_id: 99999, quantity: 1 });
      230 |
    > 231 |       expect(response.status).toBe(404);
          |                               ^
      232 |       expect(response.body.message).toBe("Produto não encontrado.");
      233 |     });
      234 |

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:231:31)

  ● Cart Module Integration Tests › POST /v1/cart/add › deve rejeitar produto desabilitado (400)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      239 |         .send({ product_id: disabledProduct.id, quantity: 1 });
      240 |
    > 241 |       expect(response.status).toBe(400);
          |                               ^
      242 |       expect(response.body.message).toBe("Produto não está disponível.");
      243 |     });
      244 |

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:241:31)

  ● Cart Module Integration Tests › POST /v1/cart/add › deve retornar 400 com body inválido

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      249 |         .send({ quantity: 1 }); // sem product_id
      250 |
    > 251 |       expect(response.status).toBe(400);
          |                               ^
      252 |       expect(response.body.errors).toBeDefined();
      253 |     });
      254 |

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:251:31)

  ● Cart Module Integration Tests › PUT /v1/cart/update/:itemId › deve atualizar a quantidade de um item 

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      280 |         .send({ quantity: 5 });
      281 |
    > 282 |       expect(response.status).toBe(200);
          |                               ^
      283 |       expect(response.body.quantity).toBe(5);
      284 |     });
      285 |

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:282:31)

  ● Cart Module Integration Tests › PUT /v1/cart/update/:itemId › deve retornar 403 ao tentar atualizar item de outro usuário

    expect(received).toBe(expected) // Object.is equality

    Expected: 403
    Received: 401

      299 |         .send({ quantity: 10 });
      300 |
    > 301 |       expect(response.status).toBe(403);
          |                               ^
      302 |     });
      303 |
      304 |     it("deve retornar 404 para itemId inexistente", async () => {

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:301:31)

  ● Cart Module Integration Tests › PUT /v1/cart/update/:itemId › deve retornar 404 para itemId inexistente

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 401

      309 |         .send({ quantity: 5 });
      310 |
    > 311 |       expect(response.status).toBe(404);
          |                               ^
      312 |     });
      313 |
      314 |     it("deve retornar 400 para itemId inválido (não UUID)", async () => {

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:311:31)

  ● Cart Module Integration Tests › PUT /v1/cart/update/:itemId › deve retornar 400 para itemId inválido (não UUID)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      318 |         .send({ quantity: 5 });
      319 |
    > 320 |       expect(response.status).toBe(400);
          |                               ^
      321 |       expect(response.body.errors).toBeDefined();
      322 |     });
      323 |   });

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:320:31)

  ● Cart Module Integration Tests › DELETE /v1/cart/remove/:itemId › deve remover um item do carrinho    

    expect(received).toBe(expected) // Object.is equality

    Expected: 204
    Received: 401

      339 |         .set("Authorization", `Bearer ${tokenA}`);
      340 |
    > 341 |       expect(response.status).toBe(204);
          |                               ^
      342 |
      343 |       // Verifica que o carrinho está vazio
      344 |       const listResponse = await request(app)

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:341:31)

  ● Cart Module Integration Tests › DELETE /v1/cart/remove/:itemId › deve retornar 403 ao tentar remover item de outro usuário

    expect(received).toBe(expected) // Object.is equality

    Expected: 403
    Received: 401

      361 |         .set("Authorization", `Bearer ${tokenB}`);
      362 |
    > 363 |       expect(response.status).toBe(403);
          |                               ^
      364 |     });
      365 |
      366 |     it("deve retornar 404 para itemId inexistente", async () => {

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:363:31)

  ● Cart Module Integration Tests › DELETE /v1/cart/remove/:itemId › deve retornar 404 para itemId inexistente

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 401

      370 |         .set("Authorization", `Bearer ${tokenA}`);
      371 |
    > 372 |       expect(response.status).toBe(404);
          |                               ^
      373 |     });
      374 |   });
      375 |

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:372:31)

  ● Cart Module Integration Tests › DELETE /v1/cart/clear › deve limpar todos os itens do carrinho       

    expect(received).toBe(expected) // Object.is equality

    Expected: 204
    Received: 401

      394 |         .set("Authorization", `Bearer ${tokenA}`);
      395 |
    > 396 |       expect(response.status).toBe(204);
          |                               ^
      397 |
      398 |       // Verifica que o carrinho está vazio
      399 |       const listResponse = await request(app)

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:396:31)

  ● Cart Module Integration Tests › DELETE /v1/cart/clear › deve retornar 204 mesmo com carrinho vazio   

    expect(received).toBe(expected) // Object.is equality

    Expected: 204
    Received: 401

      409 |         .set("Authorization", `Bearer ${tokenA}`);
      410 |
    > 411 |       expect(response.status).toBe(204);
          |                               ^
      412 |     });
      413 |
      414 |     it("deve retornar 401 sem token", async () => {

      at Object.toBe (tests/modules/cart/integration/cart.int.spec.js:411:31)

 FAIL  tests/modules/product/integration/search-product.service.int.spec.js
  ● List Products - Integration Tests › GET /v1/product/search - Deve projetar campos (fields)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 500

      200 |     const response = await request(app).get("/v1/product/search?fields=name,slug");
      201 |
    > 202 |     expect(response.status).toBe(200);
          |                             ^
      203 |     const product = response.body.data[0];
      204 |     expect(product).toHaveProperty("name");
      205 |     expect(product).toHaveProperty("slug");

      at Object.toBe (tests/modules/product/integration/search-product.service.int.spec.js:202:29)       

 FAIL  tests/modules/category/integration/delete-category.service.int.spec.js
  ● Delete Category - Integration Tests › DELETE /v1/category/:id - Deve deletar categoria com sucesso (ADMIN)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      55 |     const response = await request(app).delete(`/v1/category/${category.id}`).set("Authorization", `Bearer ${token}`);
      56 |
    > 57 |     expect(response.status).toBe(200);
         |                             ^
      58 |     expect(response.body).toHaveProperty("id", category.id);
      59 |     expect(response.body.name).toBe(validCategory.name);
      60 |     expect(response.body.slug).toBe(validCategory.slug);

      at Object.toBe (tests/modules/category/integration/delete-category.service.int.spec.js:57:29)      

  ● Delete Category - Integration Tests › DELETE /v1/category/:id - Deve retornar 403 se o usuário não for ADMIN

    expect(received).toBe(expected) // Object.is equality

    Expected: 403
    Received: 401

      77 |     const response = await request(app).delete(`/v1/category/${category.id}`).set("Authorization", `Bearer ${token}`);
      78 |
    > 79 |     expect(response.status).toBe(403);
         |                             ^
      80 |     expect(response.body).toHaveProperty("error");
      81 |
      82 |     // Garante que a categoria permanece intacta no banco

      at Object.toBe (tests/modules/category/integration/delete-category.service.int.spec.js:79:29)      

  ● Delete Category - Integration Tests › DELETE /v1/category/:id - Deve retornar 400 quando ID não é UUID válido

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      119 |       .set("Authorization", `Bearer ${token}`);
      120 |
    > 121 |     expect(response.status).toBe(400);
          |                             ^
      122 |     expect(response.body).toHaveProperty("errors");
      123 |     expect(response.body.errors[0].field).toBe("id");
      124 |   });

      at Object.toBe (tests/modules/category/integration/delete-category.service.int.spec.js:121:29)     

  ● Delete Category - Integration Tests › DELETE /v1/category/:id - Deve retornar 404 quando categoria não existe

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 401

      130 |     const response = await request(app).delete(`/v1/category/${fakeId}`).set("Authorization",
 `Bearer ${token}`);
      131 |
    > 132 |     expect(response.status).toBe(404);
          |                             ^
      133 |     expect(response.body.message).toMatch(/não encontrado/i);
      134 |   });
      135 |

      at Object.toBe (tests/modules/category/integration/delete-category.service.int.spec.js:132:29)     

  ● Delete Category - Integration Tests › DELETE /v1/category/:id - Deve retornar 400 ao tentar deletar mesma categoria 2x (idempotência soft delete)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      143 |       .set("Authorization", `Bearer ${token}`);
      144 |
    > 145 |     expect(firstResponse.status).toBe(200);
          |                                  ^
      146 |
      147 |     // Segunda deleção - deve falhar (já soft-deletada, findById não encontra)
      148 |     const secondResponse = await request(app)

      at Object.toBe (tests/modules/category/integration/delete-category.service.int.spec.js:145:34)     

  ● Delete Category - Integration Tests › DELETE /v1/category/:id - Deve ignorar body extra e deletar normalmente

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      163 |       .send({ name: "Hackeado", extra_field: "malicioso", role: "ADMIN" });
      164 |
    > 165 |     expect(response.status).toBe(200);
          |                             ^
      166 |     expect(response.body.name).toBe(validCategory.name); // Nome original, não o do body     
      167 |
      168 |     // Verifica soft delete no banco

      at Object.toBe (tests/modules/category/integration/delete-category.service.int.spec.js:165:29)     

 FAIL  tests/modules/product/integration/delete-product.int.spec.js
  ● Delete Product Integration Test › deve deletar um produto com sucesso quando autenticado como ADMIN  

    expect(received).toBe(expected) // Object.is equality

    Expected: 204
    Received: 401

      85 |       .set("Authorization", `Bearer ${adminToken}`);
      86 |
    > 87 |     expect(response.status).toBe(204);
         |                             ^
      88 |
      89 |     // Verify it's gone from DB
      90 |     const foundProduct = await Product.findByPk(createdProduct.id);

      at Object.toBe (tests/modules/product/integration/delete-product.int.spec.js:87:29)

  ● Delete Product Integration Test › deve retornar 404 ao tentar deletar um produto inexistente

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 401

       98 |       .set("Authorization", `Bearer ${adminToken}`);
       99 |
    > 100 |     expect(response.status).toBe(404);
          |                             ^
      101 |     expect(response.body).toHaveProperty("message", "Recurso não encontrado.");
      102 |   });
      103 |

      at Object.toBe (tests/modules/product/integration/delete-product.int.spec.js:100:29)

  ● Delete Product Integration Test › deve retornar 403 ao tentar deletar como usuário não-ADMIN

    expect(received).toBe(expected) // Object.is equality

    Expected: 403
    Received: 401

      113 |       .set("Authorization", `Bearer ${userToken}`);
      114 |
    > 115 |     expect(response.status).toBe(403);
          |                             ^
      116 |   });
      117 |
      118 |   it("deve retornar 400 quando o ID for inválido", async () => {

      at Object.toBe (tests/modules/product/integration/delete-product.int.spec.js:115:29)

  ● Delete Product Integration Test › deve retornar 400 quando o ID for inválido

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      119 |     const response = await request(app).delete(`/v1/product/invalid-id`).set("Authorization",
 `Bearer ${adminToken}`);
      120 |
    > 121 |     expect(response.status).toBe(400);
          |                             ^
      122 |     expect(response.body).toHaveProperty("errors");
      123 |   });
      124 | });

      at Object.toBe (tests/modules/product/integration/delete-product.int.spec.js:121:29)

 FAIL  tests/modules/category/integration/update-category.service.int.spec.js
  ● Update Category - Integration Tests › PATCH /v1/category/:id - Deve atualizar categoria com sucesso (ADMIN)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      65 |       .send(validUpdateData);
      66 |
    > 67 |     expect(response.status).toBe(200);
         |                             ^
      68 |     expect(response.body).toHaveProperty("id", category.id);
      69 |     expect(response.body.name).toBe(validUpdateData.name);
      70 |     expect(response.body.slug).toBe(validUpdateData.slug);

      at Object.toBe (tests/modules/category/integration/update-category.service.int.spec.js:67:29)      

  ● Update Category - Integration Tests › PATCH /v1/category/:id - Deve retornar 403 se o usuário não for ADMIN

    expect(received).toBe(expected) // Object.is equality

    Expected: 403
    Received: 401

      86 |       .send(validUpdateData);
      87 |
    > 88 |     expect(response.status).toBe(403);
         |                             ^
      89 |     expect(response.body).toHaveProperty("error");
      90 |
      91 |     // Garante que não alterou no banco

      at Object.toBe (tests/modules/category/integration/update-category.service.int.spec.js:88:29)

  ● Update Category - Integration Tests › PATCH /v1/category/:id - Deve retornar 400 com erro de validação (campos ausentes)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      111 |       .send({}); // Body vazio
      112 |
    > 113 |     expect(response.status).toBe(400);
          |                             ^
      114 |     expect(response.body).toHaveProperty("errors");
      115 |     expect(response.body.errors.length).toBeGreaterThanOrEqual(3);
      116 |   });

      at Object.toBe (tests/modules/category/integration/update-category.service.int.spec.js:113:29)     

  ● Update Category - Integration Tests › PATCH /v1/category/:id - Deve retornar 400 com erro de validação (name/slug curtos)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      125 |       .send({ name: "A", slug: "B", use_in_menu: true }); // name e slug com menos de 2 chars
      126 |
    > 127 |     expect(response.status).toBe(400);
          |                             ^
      128 |     expect(response.body).toHaveProperty("errors");
      129 |   });
      130 |

      at Object.toBe (tests/modules/category/integration/update-category.service.int.spec.js:127:29)     

  ● Update Category - Integration Tests › PATCH /v1/category/:id - Deve retornar 400 com erro de validação (campos extras)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      138 |       .send({ ...validUpdateData, extra_field: "hack" }); // Campo extra rejeitado pelo .strict()
      139 |
    > 140 |     expect(response.status).toBe(400);
          |                             ^
      141 |     expect(response.body).toHaveProperty("errors");
      142 |   });
      143 |

      at Object.toBe (tests/modules/category/integration/update-category.service.int.spec.js:140:29)     

  ● Update Category - Integration Tests › PATCH /v1/category/:id - Deve retornar 404 quando categoria não existe

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 401

      151 |       .send(validUpdateData);
      152 |
    > 153 |     expect(response.status).toBe(404);
          |                             ^
      154 |     expect(response.body.message).toMatch(/não encontrado/i);
      155 |   });
      156 |

      at Object.toBe (tests/modules/category/integration/update-category.service.int.spec.js:153:29)     

  ● Update Category - Integration Tests › PATCH /v1/category/:id - Deve retornar 400 se o nome ou slug excederem o limite de caracteres

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      165 |       .send({ ...validUpdateData, name: longString, slug: longString });
      166 |
    > 167 |     expect(response.status).toBe(400);
          |                             ^
      168 |     expect(response.body).toHaveProperty("errors");
      169 |
      170 |     const errors = response.body.errors;

      at Object.toBe (tests/modules/category/integration/update-category.service.int.spec.js:167:29)     

 FAIL  tests/modules/category/integration/create-category.service.int.spec.js
  ● Create Category - Integration Tests › POST /v1/category - Deve criar uma categoria com sucesso (ADMIN)

    expect(received).toBe(expected) // Object.is equality

    Expected: 201
    Received: 401

      59 |       .send(validCategory);
      60 |
    > 61 |     expect(response.status).toBe(201);
         |                             ^
      62 |     expect(response.body).toHaveProperty("id");
      63 |     expect(response.body.name).toBe(validCategory.name);
      64 |     expect(response.body.slug).toBe(validCategory.slug);

      at Object.toBe (tests/modules/category/integration/create-category.service.int.spec.js:61:29)      

  ● Create Category - Integration Tests › POST /v1/category - Deve retornar 403 se o usuário não for ADMIN

    expect(received).toBe(expected) // Object.is equality

    Expected: 403
    Received: 401

      78 |       .send(validCategory);
      79 |
    > 80 |     expect(response.status).toBe(403);
         |                             ^
      81 |     expect(response.body).toHaveProperty("error");
      82 |     // Garante que não salvou no banco
      83 |     const count = await Category.count();

      at Object.toBe (tests/modules/category/integration/create-category.service.int.spec.js:80:29)      

  ● Create Category - Integration Tests › POST /v1/category - Deve retornar 400 se houver erro de validação (Schema)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      100 |     const response = await request(app).post("/v1/category").set("Authorization", `Bearer ${token}`).send(invalidData);
      101 |
    > 102 |     expect(response.status).toBe(400);
          |                             ^
      103 |     expect(response.body).toHaveProperty("errors");
      104 |   });
      105 |

      at Object.toBe (tests/modules/category/integration/create-category.service.int.spec.js:102:29)

  ● Create Category - Integration Tests › POST /v1/category - Deve retornar 400 se a categoria já existir (Duplicidade)

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      116 |       .send(validCategory);
      117 |
    > 118 |     expect(response.status).toBe(400);
          |                             ^
      119 |     expect(response.body.message).toMatch(/já existe/i);
      120 |   });
      121 |

      at Object.toBe (tests/modules/category/integration/create-category.service.int.spec.js:118:29)     

  ● Create Category - Integration Tests › POST /v1/category - Deve retornar 400 se o nome ou slug excederem o limite de caracteres

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      132 |     const response = await request(app).post("/v1/category").set("Authorization", `Bearer ${token}`).send(invalidData);
      133 |
    > 134 |     expect(response.status).toBe(400);
          |                             ^
      135 |     expect(response.body).toHaveProperty("errors");
      136 |
      137 |     // Verifica se os erros de validação contêm mensagens sobre o limite

      at Object.toBe (tests/modules/category/integration/create-category.service.int.spec.js:134:29)     

 FAIL  tests/modules/user/integration/user.routes.int.spec.js
  ● User Routes - Character Limits Integration Tests › PATCH /v1/user/:id › Deve retornar 400 se firstname ou surname excederem limite de 50 caracteres na atualização

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      60 |         .send(invalidData);
      61 |
    > 62 |       expect(response.status).toBe(400);
         |                               ^
      63 |       expect(response.body).toHaveProperty("errors");
      64 |
      65 |       const errors = response.body.errors;

      at Object.toBe (tests/modules/user/integration/user.routes.int.spec.js:62:31)

 FAIL  tests/modules/category/integration/get-category-by-id.service.int.spec.js
  ● Get Category By Id - Integration Tests › GET /v1/category/:id - Deve retornar a categoria com sucesso (usuário autenticado)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      55 |       .set("Authorization", `Bearer ${token}`);
      56 |
    > 57 |     expect(response.status).toBe(200);
         |                             ^
      58 |     expect(response.body).toHaveProperty("id", createdCategory.id);
      59 |     expect(response.body).toHaveProperty("name", "Eletrônicos");
      60 |     expect(response.body).toHaveProperty("slug", "eletronicos");

      at Object.toBe (tests/modules/category/integration/get-category-by-id.service.int.spec.js:57:29)   

  ● Get Category By Id - Integration Tests › GET /v1/category/:id - Deve retornar a categoria com sucesso (ADMIN)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      74 |       .set("Authorization", `Bearer ${token}`);
      75 |
    > 76 |     expect(response.status).toBe(200);
         |                             ^
      77 |     expect(response.body.id).toBe(createdCategory.id);
      78 |     expect(response.body.name).toBe("Eletrônicos");
      79 |   });

      at Object.toBe (tests/modules/category/integration/get-category-by-id.service.int.spec.js:76:29)   

  ● Get Category By Id - Integration Tests › GET /v1/category/:id - Deve retornar 404 quando a categoria não existe

    expect(received).toBe(expected) // Object.is equality

    Expected: 404
    Received: 401

      85 |     const response = await request(app).get(`/v1/category/${nonExistentId}`).set("Authorization", `Bearer ${token}`);
      86 |
    > 87 |     expect(response.status).toBe(404);
         |                             ^
      88 |     expect(response.body).toHaveProperty("message", "Recurso não encontrado.");
      89 |   });
      90 |

      at Object.toBe (tests/modules/category/integration/get-category-by-id.service.int.spec.js:87:29)   

  ● Get Category By Id - Integration Tests › GET /v1/category/:id - Deve retornar 400 quando o ID não é um UUID válido

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      94 |     const response = await request(app).get("/v1/category/invalid-id").set("Authorization", `Bearer ${token}`);
      95 |
    > 96 |     expect(response.status).toBe(400);
         |                             ^
      97 |     expect(response.body).toHaveProperty("errors");
      98 |     expect(response.body.errors[0]).toHaveProperty("field", "id");
      99 |     expect(response.body.errors[0].message).toMatch(/UUID/i);

      at Object.toBe (tests/modules/category/integration/get-category-by-id.service.int.spec.js:96:29)   

 FAIL  tests/modules/product/integration/upload-image.int.spec.js
  ● Upload Image - Integration Tests › POST /v1/product/upload-image - Deve fazer upload com JSON base64 (ADMIN)

    expect(received).toBe(expected) // Object.is equality

    Expected: 200
    Received: 401

      54 |       .send(payload);
      55 |
    > 56 |     expect(response.status).toBe(200);
         |                             ^
      57 |     expect(Array.isArray(response.body)).toBe(true);
      58 |     expect(response.body[0]).toHaveProperty("url");
      59 |     expect(response.body[0]).toHaveProperty("public_id");

      at Object.toBe (tests/modules/product/integration/upload-image.int.spec.js:56:29)

  ● Upload Image - Integration Tests › POST /v1/product/upload-image - Deve retornar 403 se o usuário não for ADMIN

    expect(received).toBe(expected) // Object.is equality

    Expected: 403
    Received: 401

      76 |       .send(payload);
      77 |
    > 78 |     expect(response.status).toBe(403);
         |                             ^
      79 |     expect(response.body).toHaveProperty("error");
      80 |   });
      81 |

      at Object.toBe (tests/modules/product/integration/upload-image.int.spec.js:78:29)

  ● Upload Image - Integration Tests › POST /v1/product/upload-image - Deve retornar 400 se faltar campo 'type'

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      104 |       .send(payload);
      105 |
    > 106 |     expect(response.status).toBe(400);
          |                             ^
      107 |     expect(response.body).toHaveProperty("errors");
      108 |     expect(response.body.errors).toEqual(expect.arrayContaining([expect.objectContaining({ field: "type" })]));
      109 |   });

      at Object.toBe (tests/modules/product/integration/upload-image.int.spec.js:106:29)

  ● Upload Image - Integration Tests › POST /v1/product/upload-image - Deve retornar 400 se faltar campo 'content'

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      120 |       .send(payload);
      121 |
    > 122 |     expect(response.status).toBe(400);
          |                             ^
      123 |     expect(response.body).toHaveProperty("errors");
      124 |     expect(response.body.errors).toEqual(expect.arrayContaining([expect.objectContaining({ field: "content" })]));
      125 |   });

      at Object.toBe (tests/modules/product/integration/upload-image.int.spec.js:122:29)

  ● Upload Image - Integration Tests › POST /v1/product/upload-image - Deve retornar 400 se 'type' não for image/*

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      137 |       .send(payload);
      138 |
    > 139 |     expect(response.status).toBe(400);
          |                             ^
      140 |     expect(response.body).toHaveProperty("errors");
      141 |     expect(response.body.errors).toEqual(
      142 |       expect.arrayContaining([

      at Object.toBe (tests/modules/product/integration/upload-image.int.spec.js:139:29)

  ● Upload Image - Integration Tests › POST /v1/product/upload-image - Deve retornar 400 se 'content' estiver vazio

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      161 |       .send(payload);
      162 |
    > 163 |     expect(response.status).toBe(400);
          |                             ^
      164 |     expect(response.body).toHaveProperty("errors");
      165 |     expect(response.body.errors).toEqual(
      166 |       expect.arrayContaining([

      at Object.toBe (tests/modules/product/integration/upload-image.int.spec.js:163:29)

  ● Upload Image - Integration Tests › POST /v1/product/upload-image - Deve retornar 400 se não enviar nem arquivo nem JSON

    expect(received).toBe(expected) // Object.is equality

    Expected: 400
    Received: 401

      181 |       .send({});
      182 |
    > 183 |     expect(response.status).toBe(400);
          |                             ^
      184 |     expect(response.body).toHaveProperty("errors"); // Validator retorna 'errors' array      
      185 |   });
      186 | });

      at Object.toBe (tests/modules/product/integration/upload-image.int.spec.js:183:29)


Test Suites: 11 failed, 23 passed, 34 total
Tests:       80 failed, 114 passed, 194 total
Snapshots:   0 total
Time:        96.38 s, estimated 125 s
Ran all test suites.