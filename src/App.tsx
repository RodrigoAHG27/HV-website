import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FormPage from './routes/FormPage';
import MainPage from './components/MainPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
