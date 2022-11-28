import React, { useState } from 'react';
import './header.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice/userSlice';
import Modal from '../modals/Modal';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import UpdateProfile from '../updateProfile/UpdateProfile';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Cart from '../cart/Cart';

export default function Header() {
  const { isAuth, img, isManager } = useAuth();

  const dispatch = useDispatch();

  const [active, setActive] = useState(false);
  const [activeCart, setActiveCart] = useState(false);

  const handleCartActive = () => {
    setActiveCart(true);
  };

  const handleActive = (selector) => {
    document.querySelector(selector).classList.add('active');
  };

  const handleClose = (selector) => {
    document.querySelector(selector).classList.remove('active');
  };

  return (
    <header className='header'>
      <NavLink to={'/'} className='logo'>
        Travel
      </NavLink>

      <div className='header__menu'>
        <nav className='navbar'>
          <CloseIcon
            id='nav-close'
            onClick={() => handleClose('.header .header__menu .navbar')}
          />

          <ul>
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/events'}>Events</NavLink>
            </li>
            <li>
              <NavLink to={'/packages'}>Packages</NavLink>
            </li>
            <li>
              <NavLink to={'/reviews'}>Reviews</NavLink>
            </li>

            {isAuth ? (
              <li>
                <NavLink
                  to={'/'}
                  onClick={() => {
                    dispatch(removeUser());
                  }}
                  style={{ textTransform: 'none' }}
                >
                  Log out
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink to={'/login'}>Login</NavLink>
              </li>
            )}
          </ul>

          <div className='avatar' onClick={() => setActive(true)}>
            {isAuth ? (
              <>
                <img
                  src={
                    img !== ''
                      ? img
                      : 'https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg'
                  }
                  alt=''
                />
                <span>Update</span>
              </>
            ) : null}
          </div>
        </nav>

        <div className='icons'>
          {isManager === true || isAuth === false ? null : (
            <ShoppingCartIcon onClick={handleCartActive} />
          )}
          <MenuIcon
            id='menu-btn'
            onClick={() => handleActive('.header .header__menu .navbar')}
          />
        </div>
      </div>

      <Modal active={active} setActive={setActive}>
        <UpdateProfile setActive={setActive} />
      </Modal>

      <Modal active={activeCart} setActive={setActiveCart}>
        <Cart setActive={setActiveCart}/>
      </Modal>
    </header>
  );
}
