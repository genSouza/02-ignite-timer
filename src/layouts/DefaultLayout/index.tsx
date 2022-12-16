import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header';

import * as s from './styles';

export function DefaultLayout() {
  return (
    <s.LayoutContainer>
      <Header />
      <Outlet />
    </s.LayoutContainer>
  );
}
