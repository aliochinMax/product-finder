import ProductCarousel from "./ProductCarousel";
import ProductGrid from "./ProductGrid";
import AnalysisResults from "./analysisResults";

const ProductDisplay = ({ productData, analysisResults, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {productData && Array.isArray(productData) && productData.length > 0 && (
        <div>
          <ProductCarousel products={productData} />
          <ProductGrid products={productData} />
        </div>
      )}
      <AnalysisResults analysisResults={analysisResults} />
    </>
  );
};

export default ProductDisplay;