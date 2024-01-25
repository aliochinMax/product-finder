function AnalysisResults({ analysisResults }) {
  return (
    <div>
      {analysisResults && (
        <>
          {analysisResults.pagesWithMatchingImages && (
            <>
              <h2>Pages with Matching Images:</h2>
              <ul>
                {analysisResults.pagesWithMatchingImages.map((page, index) => (
                  <li key={index}>
                    URL: <a href={page.url} target="_blank" rel="noopener noreferrer">{page.url}</a>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2>Visually Similar Images:</h2>
          <ul>
            {analysisResults.visuallySimilarImages && analysisResults.visuallySimilarImages.map((image, index) => (
              <li key={index}>
                <img src={image.url} alt={`Matching Image ${index + 1}`} />
                <p>URL: <a href={image.url} target="_blank" rel="noopener noreferrer">{image.url}</a></p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default AnalysisResults;
