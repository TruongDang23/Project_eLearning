import React, { useState } from 'react'
import styled from 'styled-components'

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      setSelectedFile(file)

      // Chỉ tạo URL preview nếu file là hình ảnh
      if (file.type.startsWith('image')) {
        const fileUrl = URL.createObjectURL(file)
        setPreviewUrl(fileUrl)
      } else {
        setPreviewUrl(null)
      }
    }

    // Đặt lại giá trị của input để cho phép chọn lại cùng một file
    event.target.value = null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (selectedFile) {
      console.log('File to upload:', selectedFile)
      // Thực hiện hành động upload tại đây
    } else {
      alert('Please select a file to upload.')
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }

  return (
    <UploadFileWrapper>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,application/pdf,.xlsx,video/*"
        />
        <button id="btn-secondary" type="submit">
          Upload
        </button>
      </form>

      <div className="upload-detail">
        {selectedFile && (
          <div className="upload-file">
            <h4>File Details:</h4>
            <p>File Name: {selectedFile.name}</p>
            <p>File Type: {selectedFile.type}</p>
            <p>File Size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
            <button onClick={handleRemoveFile}>Remove File</button>
          </div>
        )}

        {previewUrl && (
          <div className="upload-preview">
            <h4>Image Preview:</h4>
            <img
              src={previewUrl}
              alt="Preview"
              style={{ width: '200px', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </UploadFileWrapper>
  )
}

const UploadFileWrapper = styled.div`
  .upload-form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;

    input {
      font-size: 1.6rem;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      outline: none;
    }

    button {
      background-color: #6c757d;
      color: #fff;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 1.6rem;
      font-weight: 700;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: 0.3s all ease;

      span svg {
        font-size: 1.6rem;
      }

      &:hover {
        background-color: #fff;
        color: #6c757d;
        box-shadow: 0 0 0 2px #6c757d;
      }
    }
  }

  .upload-detail {
    display: flex;
    gap: 20px;
    .upload-file {
      width: 50%;
      margin-bottom: 20px;
      p {
        font-size: 1.6rem;
        margin: 5px 0;
      }

      button {
        background-color: #f44336;
        color: white;
        padding: 5px 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1.4rem;
        transition: background-color 0.3s ease;

        &:hover {
          background-color: #d32f2f;
        }
      }
    }

    .upload-preview {
      width: 50%;
      img {
        border-radius: 5px;
      }
    }
  }
`

export default UploadFile
