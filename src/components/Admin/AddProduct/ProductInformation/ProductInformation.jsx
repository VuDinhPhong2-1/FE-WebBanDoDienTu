import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import "./ProductInformation.css";
import fetchWithAuth from "../../../../utils/authFetch";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ProductInformation() {
  const editorRef = useRef(null); // Ref for TinyMCE
  const [categories, setCategories] = useState([]);
  const [discounts, setDiscounts] = useState([]); // Corrected variable name
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [descriptionContent, setDescriptionContent] = useState("");
  const [previewProductImages, setPreviewProductImages] = useState([]);
  const [basePrice, setBasePrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [applyDate, setApplyDate] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [productImages, setProductImages] = useState([]);
  const apiUrl = "http://localhost:3001";

  const handleProductImagesChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewProductImages(imageUrls);
    setProductImages(files);
  };

  const handleEditorChange = (newContent) => {
    setDescriptionContent(newContent);
  };

  const handleDescriptionImageUpload = async (blobInfo, progress) => {
    try {
      const formData = new FormData();
      formData.append("file", blobInfo.blob());

      const response = await axios.post(`${apiUrl}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { src, publicId } = response.data;
      if (!src) {
        throw new Error("Invalid response from server.");
      }

      await axios.post(`${apiUrl}/temp-images`, {
        url: src,
        publicId,
      });

      return src;
    } catch (error) {
      console.log("Upload error:", error.response || error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await fetchWithAuth("/login", `${apiUrl}/categories`, {
        method: "GET",
      });
      console.log("Categories data:", data); // Kiểm tra dữ liệu trả về
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchDiscounts = async () => {
    try {
      const { data } = await fetchWithAuth("/login", `${apiUrl}/discounts`, {
        method: "GET",
      });
      setDiscounts(data);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  const handleDiscountChange = (e) => {
    setSelectedDiscount(e.target.value);
  };

  const fetchBrands = async () => {
    try {
      const { data } = await fetchWithAuth("/login", `${apiUrl}/brands`, {
        method: "GET",
      });
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchDiscounts();
  }, []);

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSelectedCategory(value);
  };

  const handleBrandChange = (e) => {
    console.log(e.target.value);
    setSelectedBrand(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    if (!productName.trim()) {
      toast.error("Product Name is required!", { position: "top-center" });
      return;
    }

    if (!quantity || parseInt(quantity, 10) <= 0) {
      toast.error("Quantity must be greater than 0!", {
        position: "top-center",
      });
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a category!", { position: "top-center" });
      return;
    }

    if (!selectedBrand) {
      toast.error("Please select a brand!", { position: "top-center" });
      return;
    }

    if (!descriptionContent.trim()) {
      toast.error("Description cannot be empty!", { position: "top-center" });
      return;
    }

    if (!basePrice || parseFloat(basePrice) <= 0) {
      toast.error("Base Price must be greater than 0!", {
        position: "top-center",
      });
      return;
    }

    if (!startDate) {
      toast.error("Start Date is required!", { position: "top-center" });
      return;
    }

    if (!endDate) {
      toast.error("End Date is required!", { position: "top-center" });
      return;
    }

    if (!applyDate) {
      toast.error("Apply Date is required!", { position: "top-center" });
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start Date cannot be later than End Date!", {
        position: "top-center",
      });
      return;
    }

    if (productImages.length === 0) {
      toast.error("Please upload at least one product image!", {
        position: "top-center",
      });
      return;
    }

    try {
      // Chuẩn bị dữ liệu để gửi
      const productData = {
        product: {
          name: productName,
          description: descriptionContent,
          quantity: parseInt(quantity, 10),
          brandId: parseInt(selectedBrand, 10),
          discountId: selectedDiscount ? parseInt(selectedDiscount, 10) : null,
        },
        salePrice: {
          price: parseFloat(basePrice),
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
          applyDate: new Date(applyDate).toISOString(),
        },
        categoryId: parseInt(selectedCategory, 10),
      };

      const formData = new FormData();
      formData.append("product", JSON.stringify(productData.product));
      formData.append("salePrice", JSON.stringify(productData.salePrice));
      formData.append("categoryId", JSON.stringify(productData.categoryId));
      productImages.forEach((image) => {
        formData.append("images", image);
      });

      const token = localStorage.getItem("access_token");

      // Gửi dữ liệu và hiển thị trạng thái
      await toast.promise(
        axios.post(`${apiUrl}/products`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }),
        {
          pending: "Submitting your product...",
          success: "Product saved successfully!",
          error: {
            render({ data }) {
              const message =
                data.response?.data?.message || "Failed to save product.";
              return message;
            },
          },
        },
        {
          position: "top-center",
          autoClose: 5000,
        }
      );

      // Reset các trường sau khi gửi thành công
      setProductName("");
      setQuantity("");
      setSelectedCategory("");
      setSelectedBrand("");
      setDescriptionContent("");
      setPreviewProductImages([]);
      setBasePrice("");
      setStartDate("");
      setEndDate("");
      setApplyDate("");
      setSelectedDiscount("");
      setProductImages([]);

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
      // Error đã được xử lý trong toast.promise
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="container">
        <section className="left-column">
          <div className="product-information">
            <div className="title">Product Information</div>

            {/* Product Name */}
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              placeholder="Enter product name"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            {/* Quantity */}
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              placeholder="Enter quantity"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            {/* Select */}
            <div className="select">
              {/* Category */}
              <label htmlFor="category">Category</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                id="category"
                required
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option value={category.categoryId} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* Brand */}
              <label htmlFor="brand">Brand</label>
              <select
                value={selectedBrand}
                onChange={handleBrandChange}
                id="brand"
                required
              >
                <option value="">Select Brand</option>
                {brands.map((brand, index) => (
                  <option value={brand.brandId} key={index}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TinyMCE Editor */}
            <label htmlFor="descriptionEditor">Description</label>
            <div>
              <Editor
                apiKey="w2e3v5yxg0igv2wxy7v4uwhg2ej6nxi92gheov2zgbwhohk0"
                onInit={(evt, editor) => (editorRef.current = editor)}
                value={descriptionContent}
                init={{
                  height: 500,
                  plugins: [
                    "advlist autolink lists link image charmap preview hr anchor pagebreak",
                    "searchreplace visualblocks visualchars code",
                    "insertdatetime media nonbreaking table contextmenu directionality",
                    "emoticons template paste textcolor colorpicker textpattern imagetools codesample",
                    "image",
                    "lists",
                  ],
                  toolbar:
                    "undo redo | bold italic | fontfamily fontsizeselect lineheightselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | codesample | help",
                  images_upload_handler: handleDescriptionImageUpload,
                }}
                onEditorChange={handleEditorChange}
              />
            </div>
          </div>
          <div className="product-image">
            <div className="title">Product Images</div>
            <div className="drop-zone">
              <div className="icon-upload">
                <FontAwesomeIcon icon={faUpload} />
              </div>
              <h4>Drag and Drop Your Images Here</h4>
              <span>or</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleProductImagesChange}
                style={{ display: "none" }}
                id="fileInput"
              />
              <button
                type="button"
                onClick={() => document.getElementById("fileInput").click()}
              >
                Browse Images
              </button>
            </div>
            <div className="preview-images">
              {previewProductImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`preview ${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    margin: "10px",
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="right-column">
          <div className="pricing">
            <div className="title">Pricing</div>
            <label htmlFor="basePrice">Base Price</label>
            <input
              type="text"
              id="basePrice"
              placeholder="Enter product base price"
              required
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
            />
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              placeholder="Enter product start date base price"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              placeholder="Enter product end date base price"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <label htmlFor="applyDate">Apply Date</label>
            <input
              type="date"
              id="applyDate"
              placeholder="Enter product apply date base price"
              required
              value={applyDate}
              onChange={(e) => setApplyDate(e.target.value)}
            />
            <label htmlFor="discount">Discount</label>
            <div className="select">
              <select
                value={selectedDiscount}
                onChange={handleDiscountChange}
                id="discount"
                required
              >
                <option value="">Select Discount</option>
                {discounts.map((item, index) => (
                  <option value={item.discountId} key={index}>
                    {item.discountPercent}
                  </option>
                ))}
              </select>
            </div>

            <div className="button-container">
              <button
                type="button"
                className="btn-create"
                onClick={handleFormSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProductInformation;
