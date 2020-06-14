import React from 'react';
import ImageUploader from 'react-images-upload';
import './FileUploader.scss';

export default ({ onDrop, file }) => (
    <section className="file-preview">
        <ImageUploader
            singleImage
            withIcon
            buttonText="Choose image"
            onChange={onDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
        />
        {file && <img alt="preview" src={file} />}
    </section>
);
