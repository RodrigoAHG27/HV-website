import { BrowserRouter, Route, Routes } from 'react-router-dom';

import FormPage from './routes/FormPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<FormPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
