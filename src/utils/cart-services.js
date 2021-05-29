import {store} from "../vuex-store";

function addToChart(productId, quantity, productName, imageUrl, price) {
  let productsInCart = store.state.productsInCart;
  let productFoundAndUpdated = false;
  productsInCart.forEach(product => {
    if (product.productId === productId) {
      product.quantity += quantity;
      productFoundAndUpdated = true;
    }
  });
  if (!productFoundAndUpdated) {
    productsInCart.push({
      productId: productId,
      quantity: quantity,
      productName: productName,
      imageUrl: imageUrl,
      price: price,
    });
  }
  store.commit('updateCart', productsInCart);
}

function subtractProductQuantityFromChart(productId, quantity) {
  let productsInCart = store.state.productsInCart;
  let productRemoved = false;
  for (let i = 0; i < productsInCart.length; i++) {
    if (productsInCart[i].productId === productId) {
      productsInCart[i].quantity -= quantity;
      if (productsInCart[i].quantity <= 0) {
        productRemoved = true;
      }
      break;
    }
  }
  if (productRemoved) {
    productsInCart = productsInCart.filter(product => product.quantity > 0);
  }
  store.commit('updateCart', productsInCart);
}

function removeFromChart(productId) {
  let productsInCart = store.state.productsInCart;
  productsInCart = productsInCart.filter(product => {
    return product.productId !== productId;
  });
  store.commit('updateCart', productsInCart);
}

export {
  addToChart,
  subtractProductQuantityFromChart,
  removeFromChart,
}
