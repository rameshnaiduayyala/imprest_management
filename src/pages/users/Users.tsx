import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReusableTable from '../../controls/Table';
interface Data {
  id: number;
  username: string;
  password: string;
}

const headCells= [
  { id: 'id', label: 'ID' },
  { id: 'username', label: 'User Name' },
  { id: 'password', label: 'Password' },
];
const Users: React.FC=() => {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://rameshayyala.vercel.app/users')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
 <ReusableTable
          columns={headCells}
          data={data} />
    </div>
  )
}

export default Users