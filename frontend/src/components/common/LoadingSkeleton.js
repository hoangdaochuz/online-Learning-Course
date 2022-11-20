import React from 'react';

const LoadingSkeleton = ({width, height}) => {
    return (
        <div className="loading-skeleton" style={{
            width: width,
            height: height,
        }}>
            
        </div>
    );
};

export default LoadingSkeleton;