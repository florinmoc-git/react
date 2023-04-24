import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <div>ProductDetailPage</div>
      <p>Product id: {params.productId}</p>
    </>
  );
}

export default ProductDetailPage;
