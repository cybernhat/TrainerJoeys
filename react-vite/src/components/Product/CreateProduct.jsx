import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as productImageActions from "../../redux/productimage";

const UploadPicture = () => {
    const dispatch = useDispatch();

    const [productImageUrl, setProductImageUrl] = useState("");
    const [productImagePreview, setProductImagePreview] = useState(""); // store image preview URL
    const [productImageFilename, setProductImageFilename] = useState(""); // store the image file name
    const [productImageLoading, setProductImageLoading] = useState(false);
    const [productImageError, setProductImageError] = useState("");

    const fileWrap = (e) => {
        e.stopPropagation();
        const tempFile = e.target.files[0];

        if (tempFile.size > 5000000) {
            setProductImageError("Image exceeds the maximum file size of 5MB");
            setProductImagePreview("");
            setProductImageFilename("");
            return;
        }

        const newFilename = `product_image_${Date.now()}.${tempFile.name
            .split(".")
            .pop()}`;
        const newFile = new File([tempFile], newFilename, {
            type: tempFile.type,
        });
        const newProductImageURL = URL.createObjectURL(tempFile); // generate a local URL for the image preview

        setProductImagePreview(newProductImageURL);
        setProductImageUrl(newFile);
        setProductImageFilename(newFile.name);
        setProductImageError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productImageData = new FormData();

        productImageData.append("img_url", productImageUrl);
        productImageData.append("product_id", 100);
        productImageData.append("filename", productImageFilename);

        setProductImageLoading(true);
        await dispatch(productImageActions.postProductImage(productImageData));
        setProductImageLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div
                style={{
                    position: "relative",
                    height: "240px",
                    marginTop: "6px",
                }}
            >
                <div className="container-label-input-image">
                    <input
                        id="product-image-upload"
                        type="file"
                        accept="image/*"
                        name="img_url"
                        onChange={fileWrap}
                        className="input-file-image"
                    />
                    <label
                        htmlFor="product-image-upload"
                        className="image-label"
                    >
                        Upload Product Image
                    </label>
                </div>

                {productImagePreview && (
                    <img
                        src={productImagePreview}
                        alt="product image preview"
                        style={{ width: "100%", maxHeight: "135px" }}
                    />
                )}
                {productImageFilename && (
                    <span style={{ color: "#999", fontSize: "12px" }}>
                        {productImageFilename}
                    </span>
                )}
                {productImageLoading && (
                    <p style={{ color: "#999", fontSize: "12px" }}>
                        Uploading product image...
                    </p>
                )}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UploadPicture;
