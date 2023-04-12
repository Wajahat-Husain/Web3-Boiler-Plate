import { Routes, Route } from 'react-router-dom';
import Main from '../src/components/Main'

function App() {
  return (
    <>
      <Routes>
          <Route path="/" element={<Main/>} />
      </Routes>
    </>
  );
}

export default App;
