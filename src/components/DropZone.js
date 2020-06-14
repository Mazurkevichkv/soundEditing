import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Typography from '@material-ui/core/Typography';

export default ({ onFileLoad }) => {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        onFileLoad(acceptedFiles);
        console.log(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop
    });

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Typography variant="h5" component="h6">
                    Drop the files here ...
                </Typography>
            ) : (
                <Typography variant="h5" component="h6">
                    Drag 'n' drop some files here, or click to select files
                </Typography>
            )}
        </div>
    );
};
