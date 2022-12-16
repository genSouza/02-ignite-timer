import { NavLink } from 'react-router-dom';

import { Scroll, Timer } from 'phosphor-react';

import logoIgnite from '../../assets/logo-ignite.svg';

import * as s from './styles';

export function Header() {
  return (
    <s.HeaderContainer>
      <img src={logoIgnite} alt=""></img>
      <nav>
        <NavLink to="/" end title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </s.HeaderContainer>
  );
}
