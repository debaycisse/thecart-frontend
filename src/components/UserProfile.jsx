import React from 'react';
import UserProfileForm from './UserProfileForm';

function UserProfile() {
  return (
    <div className="mx-4 lg:mx-60 mt-5">
      <h2 className='text-center font-bold text-base'>User Profile</h2>
      {/* <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Update Profile</button>
      </form> */}
      <UserProfileForm />
    </div>
  );
}

export default UserProfile;
