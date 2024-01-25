function AnalysisResults ({analysisResults}) {
   return( 
    <>
    {analysisResults && (
    
<div>
      <h2>Analysis Results:</h2>
      <ul>
        {analysisResults.webEntities.map((entity, index) => (
          <li key={index}>{entity.description}</li>
        ))}
      </ul>

      <h2>Matching Images:</h2>
      <ul>
        {analysisResults.visuallySimilarImages.map((image, index) => (
          <li key={index}>
            <img src={image.url} alt={`Matching Image ${index + 1}`} />
            <p>URL: <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
          </li>
        ))}
      </ul>
    </div>
    
  )}
  </>
)};

export default AnalysisResults;