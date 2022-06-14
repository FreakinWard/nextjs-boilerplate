import { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState();

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = '/api/upload';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>React File Upload</h1>
      <input type="file" onChange={handleChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

Upload.title = 'Upload Demo';
