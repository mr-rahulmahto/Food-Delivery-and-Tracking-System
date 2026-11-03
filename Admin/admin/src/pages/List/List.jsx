import React, { useCallback, useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = useCallback(async () => {
    const response = await axios.get(`${url}/api/food/list`);
    //console.log(response.data); //Check  the data in the console they are coming in the correct format or not
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  }, [url]);

  const removeFood =async(foodId) =>{
     //console.log(foodId); // check food ID
     const response =await axios.post(`${url}/api/food/remove` , {id : foodId});
     await fetchList();
     //console.log(response.data); // check the response data
     if(response.data.success){
      toast.success("Food Delete successfully");
     }else{
      toast.error("Error");
     }


  }
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return (
    <div className="lists flex-col">
      <p>
        <b>ALL FOODS LIST</b>
      </p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
            {list.map((item ,index)=>{
                 return(
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/image/`+item.image} alt="food" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <button onClick={()=>removeFood(item._id)}>Delete</button>
                    </div>
                 )   
            })}
      </div>
    </div>
  );
};

export default List;
