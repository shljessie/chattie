import './App.css';

import React, { useEffect, useState } from 'react';

import CsvLoader from './components/CSVLoader';
import logo from './logo.svg';

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
      <CsvLoader />
      {data}
      </body>
    </div>
  );
}

export default App;
