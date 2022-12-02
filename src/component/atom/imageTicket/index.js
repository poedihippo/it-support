import React from 'react';
import '../../../stylei.css'
const ImageTicket = ({srcImg}) => {
    console.log(srcImg, "check srcnya")
    return (
        <div className="form-line img-upld">
            <div className="preview-image">
                {srcImg === "" ? <div >Tidak ada gambar</div>:<img src={srcImg} alt="gambar ticket perbaikan"/>}
            </div>
        </div>
    )
}

export default ImageTicket