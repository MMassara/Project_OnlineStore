export async function getCategories() {
  // Implemente aqui
  try {
    const response = await fetch(
      'https://api.mercadolibre.com/sites/MLB/categories',
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Algo deu errado : ${error}`);
  }
}

export async function getProductsFromCategoryAndQuery(/* categoryId, query */) {
  // Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
}

export async function getProductById() {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
}
