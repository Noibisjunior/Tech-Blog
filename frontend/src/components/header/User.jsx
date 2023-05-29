import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiImageAddLine } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { BsBagCheck } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { GrHelp } from 'react-icons/gr'
import { BiLogOut } from 'react-icons/bi'
import account from "../../assets/images/account.jpg"

const User = () => {

  const user = true
const [profileOpen,setProfileOpen] = useState(false)

const close = () => {
  setProfileOpen(false)
}


  return (
    <>
      <div className="profile">
        {user ? (
          <>
            <button
              className="img"
              onClick={() => setProfileOpen(!profileOpen)}
            >
              <img
                src={account}
                alt="img"
              />
            </button>

            {profileOpen && (
              <div className="openProfile boxItems" onClick={close}>
                <Link to="/account">
                  <div className="image">
                    <div className="img">
                      <img
                        src={account}
                        alt="img"
                     />
                    </div>
                    <div className="text">
                      <h4>Cleric Coder</h4>
                      <p>Abuja, Nigeria</p>
                    </div>
                  </div>
                </Link>
                <Link to="/create">
                  <button className="box">
                    <RiImageAddLine className="icon" />
                    <h4>Create Post</h4>
                  </button>
                </Link>
                <Link to='/register'>
                <button className="box">
                  <IoSettingsOutline className="icon" />
                  <h4>Register</h4>
                </button>
                </Link>
                <button className="box">
                  <GrHelp className="icon" />
                  <h4>Help</h4>
                </button>
                <Link to='/login'>
                <button className="box">
                  <BiLogOut className="icon" />
                  <h4>Log Out</h4>
                </button>
                </Link>
              </div>
            )}
          </>
        ) : (
            <button>My Account</button>
        )}
      </div>
    </>
  );
};

export default User;
