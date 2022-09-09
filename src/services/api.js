export async function getCategories() {
  // Implemente aqui
  try {
    const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
    const data = response.json();
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
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

export async function getProductById(id) {
  try {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(`${error}`);
  }
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
