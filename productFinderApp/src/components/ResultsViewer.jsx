import React from "react";

const ResultsViewer = ({ result }) => {
    return (
        <div>
            <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
    );
};

export default ResultsViewer