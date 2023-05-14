import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG"];

function DragDrop({handle}) {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
        setFile(file);
        handle(file)
    };
    return (
        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    );
}

export default DragDrop;