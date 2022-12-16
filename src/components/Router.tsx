import { Route, Routes } from 'react-router-dom';

import { DefaultLayout } from '../layouts/DefaultLayout';
import { History } from '../pages/History/index.page';
import { Home } from '../pages/Home/index.page';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
