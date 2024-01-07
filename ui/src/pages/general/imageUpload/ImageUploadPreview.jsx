import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export function ImageUploadPreview({ files }) {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (files && files.length > 0) {
      const newPreviews = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    } else {
      setPreviews([]);
    }
  }, [files]);

  return (
    <div className='flex justify-center mt-4 flex-wrap'>
      {previews.map((preview, index) => (
        <img key={index} src={preview} alt="Preview" className="w-auto h-40 mb-4 mr-4 border"/>
      ))}
    </div>
  );
}

ImageUploadPreview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.instanceOf(File),
    PropTypes.instanceOf(Blob)
  ])),
};