import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error fetching list');
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error('Error fetching list');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        await fetchList();
        toast.success(response.data.message);
      } else {
        toast.error('Error removing food item');
      }
    } catch (error) {
      console.error('Error removing food item:', error);
      toast.error('Error removing food item');
    }
  };

  return (
    <div className='list add flex-col'>
      <p>All Foods lists</p>
      <div className="list-table">
        <div className="list-table-format-title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.length > 0 ? (
          list.map((item, index) => {
            const imageUrl = `${url}/images/${item.image}`;
            console.log(imageUrl); // Log the image URL
            return (
              <div key={index} className='list-table-format'>
                <img
                  src={imageUrl}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'default_image_url'; // Provide a default image URL
                  }}
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
              </div>
            );
          })
        ) : (
          <p>No items found</p>
        )}
      </div>
    </div>
  );
};

export default List;
