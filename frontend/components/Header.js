import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';
import Search from './Search';

const Logo = styled.h1`
  margin-left: 6rem;
  //transform: skew(-7deg);
  /* display: flex;
  align-items: center; 
  //background: var(--gradient-right);
    a {
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    color: white;
  } */
`;

const HeaderStyles = styled.header`
  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    background: linear-gradient(to right, #be93c5, #7bc6cc);
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }

  .logo {
    height: 90px;
    width: 220px;
    filter: brightness(0) invert(1);
  }
`;

//<Link href="/">Clothify</Link>
//

export default function () {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <a href="/">
            <img className="logo" src="/static/logo.png" />
          </a>
        </Logo>

        <Nav />
      </div>
      <Search />
      <Cart />
    </HeaderStyles>
  );
}
