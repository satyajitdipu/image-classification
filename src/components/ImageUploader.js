import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [predictions, setPredictions] = useState([]); // Array for multiple predictions
  const [imageURL, setImageURL] = useState(null); // Store the image URL

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile)); // Create a URL for the uploaded image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }

    const query = async (file) => {
      const data = await file.arrayBuffer();
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
        {
          headers: { Authorization: "Bearer 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" }, 
          method: "POST",
          body: data,
        }
      );
      const result = await response.json();
      return result;
    };

    try {
      const response = await query(file);
      if (response && response.length > 0) {
        setPredictions(response); // Store all predictions
      } else {
        setPredictions([]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Chat with NSFW Image Detection Bot</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
              <input type="file" className="form-control" onChange={handleFileChange} />
              <button type="submit" className="btn btn-primary">Upload</button>
            </div>
          </form>
          <div className="chatbox border rounded p-3 bg-light">
            {imageURL && (
              <div className="mb-3 text-center">
                <img src={imageURL} alt="Uploaded" className="img-fluid rounded" />
              </div>
            )}
            {predictions.length > 0 ? (
              predictions.map((prediction, index) => (
                <div key={index} className={`chat-message mb-3 ${index % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  <div className={`p-3 rounded ${index % 2 === 0 ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                    <h5 className="mb-1">Prediction {index + 1}</h5>
                    <p>Your uploaded image is <strong>{prediction.label}</strong> with a confidence score of <strong>{(prediction.score * 100).toFixed(2)}%</strong>.</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="chat-message text-center">
                <p className="text-muted">Upload an image to get predictions.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
