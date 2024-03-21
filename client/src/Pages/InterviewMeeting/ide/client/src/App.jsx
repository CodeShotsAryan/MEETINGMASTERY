import React, { useState } from 'react';

const OnlineIDE = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('cpp'); // Default language is C++
  const [loading, setLoading] = useState(false);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleCompileAndRun = async () => {
    setLoading(true);
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientId: 'YOUR_JDOODLE_CLIENT_ID',
        clientSecret: 'YOUR_JDOODLE_CLIENT_SECRET',
        script: code,
        language: language,
        versionIndex: '0', // Use 0 for the latest version of the selected language
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (data.error) {
      setOutput(data.error);
    } else {
      setOutput(data.output);
    }
  };

  return (
    <div>
      <h1>Online IDE with JDoodle   </h1>
      <div>
        <label htmlFor="language">Select language:</label>
        <select id="language" value={language} onChange={handleLanguageChange}>
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          {/* Add other language options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="code">Enter your code:</label>
        <textarea id="code" value={code} onChange={handleCodeChange} rows={10} cols={50}></textarea>
      </div>
      <button onClick={handleCompileAndRun} disabled={loading}>Compile & Run</button>
      {loading && <p>Loading...</p>}
      <div>
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default OnlineIDE;
