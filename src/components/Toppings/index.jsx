import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Toppins = () => {
  const [data,setData]=useState([]);
  const [basket,setBasket]=useState([]);
  useEffect(()=>{
    axios
    .get("http://localhost:4090/toppings")
    .then((res)=>setData(res.data))
  },[])
  const handleChange=(isChecked,item)=>{
isChecked ? 
setBasket([...basket,item])
:setBasket(basket.filter((i)=>i.name !==item.name));
  };
  console.log(basket)
  return (
    <div>
    <h1>Sos Çeşitleri</h1>
    <p>Tanesi <span data-testid="total"
     className='text-success'> 3</span>tl</p>
   <h3>Soslar Ücreti  <span className='text-success'>{basket.length*3}</span> tl</h3>
   <div className='row mt-4 p-3 gap-3'>
    {data.map((i)=>(
      <div className='top-card col border' key={i.id}>
<label htmlFor={i.name}>
<img src={i.imagePath} height={100} />
<p className='text-nowrap text-center'>{i.name}</p>
</label>
<input onChange={(e)=>handleChange(e.target.checked,i)}
 id={i.name} type="checkbox" />
      </div>
    ))}
   </div>
    </div>
  )
}

export default Toppins