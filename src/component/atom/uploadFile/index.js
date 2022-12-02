import React from 'react';
import '../../../stylei.css'
const UpldFile = ({preImage,isHtmlFor, isId, isName, handleChangeImage, handleRemoveImage}) => {
   
    return (
        <>
            <div className="form-line img-upld">
                <div className="preview-image">
                    <div className={`remove-image ${preImage === "" ?"hiden":"showd"}`} onClick={handleRemoveImage}>X</div>
                    {preImage === "" ? <div >Upload your image</div>:<img src={preImage} />}
                </div>
                <label htmlFor={isHtmlFor} style={{cursor: "pointer"}}>Pilih File</label>
                <input
                  style={{display:"none"}}
                    type="file"
                    className="form-control no-resize"
                    id={isId}
                    name={isName}
                    onChange={handleChangeImage}
                    accept="image/*"
                />
                  
            </div>
        </>
    )
}
export default UpldFile