import ProductItem from "./ProductItem";

/**
 * This components collects and lists out product items,
 * having received a list of product from the
 * ProductListingPage component
 */
function ProductList({ products }) {
  // If a user has logged, then display the below returned content
  return (
    <div className="mx-4 lg:mx-60 mb-4 rounded-lg bg-slate-400">
      <div className="mb-4 p-6">
        <div className="flex flex-row gap-10 flex-wrap">
          {products.map((product) => (
            <ProductItem product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
