import React, {  useState } from 'react'
import './Add.css'
import { asset } from '../../assets/asset'
//import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'


const Add = ({url}) => {


const[image , setImage]= useState(false);
const[data , setData]= useState({
    name: '',   
    description: '',
    price: '',
    category:'Salad'
})

   const onChangeHandler = (event) => {
            const name =event.target.name;
            const value = event.target.value;
            setData(data =>({...data ,[name]:value}))

   }

   const onSubmithandler = async (event) => {
       event.preventDefault();
       const formData = new FormData();
       formData.append('name', data.name);
       formData.append('description', data.description);
       formData.append('price',Number( data.price));
       formData.append('category', data.category);
       formData.append('image', image);
       
       try {
       const response = await axios.post(`${url}/api/food/add`, formData);
       if(response.data.success){
        setData({
            name: '',
            description: '',
            price: '',
            category:'Salad'

        })
        setImage(false)
        toast.success(response.data.message)
       }else{
        toast.error(response.data.message)
       }
       } catch (error) {
        toast.error(error.response?.data?.message || "Unable to connect to the backend. Check the API service and database.")
       }

   }

   // its a function to check data in console
//    useEffect(()=>{
//     console.log(data);
    
//    } ,[data])
    return (
        <div>
            <div className="add">
                <form className="flex-col" onSubmit={onSubmithandler}>
                    <div className='add-img-upload flex-col'>
                        <p>Upload Image</p>
                        <label htmlFor="image">
                            <img src={image?URL.createObjectURL(image):asset.upload_area} alt="" />
                        </label>

                        <input onChange={(e)=>setImage(e.target.files[0])}type="file" id="image"  hidden=""  require="" className='button' />

                    </div>
                    <div className="add-product-name flex col">
                        <p>Product Name</p>
                        <input onChange={onChangeHandler} value={data.name}  type="text" name="name" placeholder="Enter product name" />

                    </div>
                    <div className="add-product-name  flex-col">
                        <p>Product Description</p>
                        <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Enter product description"></textarea>
                    </div>
                    <div className="add-category-price">
                        <div className="category flex-col">
                            <p>Category</p>
                            <select onChange={onChangeHandler}   name="category" >
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwiches">Sandwiches</option>
                                <option value="Cake">Cake</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>
                        <div className='add-price flex-Col'>
                            <p>Product Price</p>
                            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" />

                        </div>
                    </div>
                    <button type='Submit' className='add-btn'>ADD</button>
                </form>
            </div>
        </div>
    )
}

export default Add
