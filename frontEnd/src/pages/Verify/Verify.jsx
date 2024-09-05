import React, { useContext, useEffect } from 'react'
import "./Verify.css";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

function Verify() {
    const [serchParams, setSearchParams] = useSearchParams();
    const success = serchParams.get("success");
    const orderId = serchParams.get("OrderId");
    const navigate = useNavigate();
    const {url} = useContext(StoreContext);
    const VerifyPayment = async () =>{
        const response  = await axios.post(url+"/api/order/verify", {success, orderId})
        if(response.data.success){
            navigate("/myorders")


            
        }else{
            navigate("/")
        }
    }
    useEffect(()=>{
        VerifyPayment();

    },[])

    console.log(success, orderId)
  return (
    <div className='verify'>
        <div className="spinner">'

        </div>

      
    </div>
  )
}

export default Verify
