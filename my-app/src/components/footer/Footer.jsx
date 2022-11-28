import React from 'react';
import './footer.scss';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/userSlice/userSlice';

export default function Footer() {
  const { isAuth } = useAuth();

  const dispatch = useDispatch();

  const handleClick = (event, info) => {
    event.target.innerHTML = info;
  };

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='box'>
          <h3>Quick links</h3>
          <NavLink to={'/'}>Home</NavLink>
          <NavLink to={'/events'}>Events</NavLink>
          <NavLink to={'/packages'}>Packages</NavLink>
          <NavLink to={'/reviews'}>Reviews</NavLink>
          {isAuth ? (
            <NavLink
              to={'/'}
              onClick={() => {
                dispatch(removeUser());
              }}
              style={{ textTransform: 'none' }}
            >
              Log out
            </NavLink>
          ) : (
            <NavLink to={'/login'}>Login</NavLink>
          )}
        </div>

        <div className='box'>
          <h3>Contact info</h3>
          <span onClick={(event) => handleClick(event, '07737719798')}>
            <PhoneIcon className='icon' /> Phone number
          </span>
          <span
            onClick={(event) => handleClick(event, 'sashakoroviy@gmail.com')}
          >
            <MailIcon className='icon' /> Email
          </span>
          <span
            onClick={(event) => handleClick(event, 'koroviysasha@gmail.com')}
          >
            <MailIcon className='icon' /> Email
          </span>
        </div>

        <div className='box'>
          <h3>Follow us</h3>
          <a href={'https://www.instagram.com/oleksandr.lw/'}>
            <InstagramIcon className='icon' /> Instagram
          </a>
          <a href='https://github.com/Sir1ys'>
            <GitHubIcon className='icon' /> Github
          </a>
        </div>
      </div>

      <div className='credit'>
        Created by <div className='name'>Oleksandr Korovii</div>
      </div>
    </footer>
  );
}
