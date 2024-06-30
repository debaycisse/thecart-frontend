import React from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
    // TODO: Product Details Components
    const {productId} = useParams();

    return (
        <div className="mx-4 lg:mx-60 ">
            <h1>Product Details</h1>
            <p>The parameter, passed is {productId}</p>
        </div>
    );
}


export default ProductDetail;