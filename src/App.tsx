import { BrowserRouter, Route, Routes } from 'react-router-dom';

import MofuPage from './routes/MofuPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<MofuPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
