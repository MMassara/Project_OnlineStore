export async function getCategories() {
  // Implemente aqui
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const category = categoryId || '$CATEGORY_ID';
  const realQuery = query || '$QUERY';
  try {
    const productsFromCategory = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${category}&q=${realQuery}}`);
    const items = await productsFromCategory.json();
    return items;
  } catch (error) {
    console.log('erro');
  }
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
