import React from 'react';
import { useGetAllUsersQuery } from '../services/userAuthApi';

function UserList() {
  const { data, error, isLoading } = useGetAllUsersQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mt-4">
      <table className="table table-secondary table-striped">
        <thead>
          <tr>
            <th className='text-center'>Vehicle Number</th>
            <th className='text-center'>User Name</th>
            <th className='text-center'>Phone Number</th>
            <th className='text-center'>Alt Phone Number</th>
            <th className='text-center'>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td className='text-center'>{user.v_number}</td>
              <td className='text-center'>{user.name}</td>
              <td className='text-center'>{user.phone_number}</td>
              <td className='text-center'>{user.alternate_number}</td>
              <td className='text-center'>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
