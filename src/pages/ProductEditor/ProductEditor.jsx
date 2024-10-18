import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

const ProductEditor = () => {
  const [content, setContent] = useState(""); // Khởi tạo state content

  const handleEditorChange = (content, editor) => {
    setContent(content); // Cập nhật state khi có thay đổi
    console.log("Content was updated:", content);
  };

  const handleImageUpload = (blobInfo, success, failure) => {
    // Giả lập quá trình upload hình ảnh
    const formData = new FormData();
    formData.append("file", blobInfo.blob(), blobInfo.filename());

    // Thay thế API call bằng mô phỏng upload
    setTimeout(() => {
      success("https://your-server.com/path-to-image/" + blobInfo.filename()); // Đường dẫn đến ảnh upload
    }, 2000);
  };

  return (
    <div>
      <h2>My TinyMCE Editor</h2>
      <Editor
        apiKey="w2e3v5yxg0igv2wxy7v4uwhg2ej6nxi92gheov2zgbwhohk0" // API key của bạn
        value={content} // Giá trị hiện tại của content
        init={{
          height: 500,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code",
            "insertdatetime media nonbreaking table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern imagetools codesample",
            "image", // Thêm plugin hình ảnh
            "lists", // Thêm plugin danh sách
          ],
          toolbar:
            "undo redo | bold italic | fontfamily fontsizeselect lineheightselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | codesample | help",
          fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt",
          lineheight_formats: "1 1.2 1.5 1.8 2", // Định nghĩa chiều cao dòng tùy chỉnh
          formats: {
            lineheight: { selector: 'p,h1,h2,h3,h4,h5,h6', styles: { 'line-height': '%value' } }
          },
          content_style: `
            body {
              font-size: 14pt;
              padding: 10px;
              line-height: 1.6;
            }
            ul, ol {
              margin: 10px 0;
              padding-left: 40px;
              list-style-position: inside; /* Đảm bảo danh sách hiển thị đúng */
            }
            li {
              margin-bottom: 5px;
            }
          `,
          images_upload_handler: handleImageUpload, // Xử lý upload hình ảnh
        }}
        onEditorChange={handleEditorChange} // Gọi khi nội dung thay đổi
      />

      {/* Hiển thị output */}
      <div style={{ marginTop: "20px" }}>
        <h3>Editor Output:</h3>
        <div
          style={{ lineHeight: "1.6" }} // Đảm bảo chiều cao dòng trong output
          dangerouslySetInnerHTML={{ __html: content }} // Hiển thị HTML
        />
      </div>
    </div>
  );
};

export default ProductEditor;
