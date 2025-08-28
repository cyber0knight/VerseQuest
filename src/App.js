import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Practice from './components/Practice';

function App() {
  const [page, setPage] = useState('home');

  return (
    <div className="d-flex">
      <Sidebar page={page} setPage={setPage} />
      <div className="flex-grow-1">
        {page === 'home' && <Home />}
        {page === 'practice' && <Practice />}
      </div>
    </div>
  );
}

export default App;
