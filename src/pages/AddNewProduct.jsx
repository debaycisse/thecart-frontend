import ProductForm from '../components/ProductForm'

function AddNewProduct() {

    return (
        <div className='mx-4 lg:mx-60'>
            <h1 className='text-bold text-lg text-center'>Add A New Product</h1>
            <ProductForm />
        </div>
    );
}

export default AddNewProduct;