exports.updateProduct = (product, obj) => {
  product.name = obj.name ? obj.name : product.name;
  product.availableItems = obj.availableItems
    ? obj.availableItems
    : product.availableItems;
  product.price = obj.price ? obj.price : product.price;
  product.category = obj.category ? obj.category : product.category;
  product.description = obj.description ? obj.description : product.description;
  product.imageURL = obj.imageURL ? obj.imageURL : product.imageUrl;
  product.manufacturer = obj.name ? obj.name : product.manufacturer;

  return product;
};
