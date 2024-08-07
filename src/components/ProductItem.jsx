import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";


/**
 * This is a component for a single product item.
 * It is rendered by the ProductList component for every available product
 * 
 * It returnsa product's information, such as name, image and so on.
 */
function ProductItem({ product }) {


  return (
    <div className="max-w-40">
      <Link to={`/product-detail/${product.id}`}>
        <img
          src={product.image}
          className="max-w-20 max-h-20 rounded-sm"
          alt={product.name}
        />
        <h3 className="text-base font-bold mt-4 mb-2">{product.name}</h3>
        <p className="text-sm">
          <b>Unit Price</b>: ${" "}
          <NumericFormat
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            value={product.price}
            allowNegative={false}
            disabled={true}
            className="inline bg-inherit w-16"
          />
        </p>
        <p className="text-sm">
          <b>Available Units</b>: {product.quantity}
        </p>
      </Link>
    </div>
  );
}

export default ProductItem;
