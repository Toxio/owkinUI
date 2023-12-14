import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export function ImageUploadPreview({ file }) {
  const [preview, setPreview] = useState('');

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className='flex justify-center mt-4 '>
      {preview && file && <img src={preview} alt="Preview" className="w-auto h-40 mb-4 border"/>}
    </div>
  );
}

ImageUploadPreview.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};