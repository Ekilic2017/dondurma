import axios from "axios"
import { useEffect, useState } from "react"
import Card from "../Card";

const Scoops = () => {
  const [data,setData]=useState([]);
  const [basket,setBasket]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:4090/scoops")
    .then((res)=>setData(res.data))
  },[])
  //sepete ekleme fonksiyonu
  const addToBasket=(item)=>{
   const found= basket.find((i)=>i.id===item.id)
    if (found){
      //güncel nesneyi oluşturur
      const updated={...found,amount:found.amount + 1}
//varsa miktarını arttırır
      const temp=basket.map((i)=>(i.id===found.id?updated:i));
   setBasket(temp);
    }
    else{
      //yoksa sepete ekleme
      setBasket([...basket,{...item,amount:1}]);
    }
  };
  console.log(basket)
  //sepetten çıkarma fonksiyonu
  const removeFromBasket=(id)=>{
    //miktar azalma işlemleri
    const found= basket.find((i)=>i.id===id)
    if (found.amount>1){
      const updated={...found,amount:found.amount - 1}
      const temp=basket.map((i)=>(i.id===found.id?updated:i));
   setBasket(temp);
    }
    else{
      setBasket(basket.filter((i)=>i.id !==id));
    }
  };
  //toplam fiyatı hesaplama
 const total= basket.reduce((total,i)=>total+i.amount*20,0)
  return (
    <div>
      <h1>Dondurma Çeşitleri</h1>
    <p>Tanesi
     <span className="text-success"> 20 </span>tl 
      </p>
      <h3>Çeşitler Ücreti
        <span data-testid={total}
        className="text-success  "> {total} </span> tl
      </h3>
      <div className="row p-3 gap-5 mt-4 justify-content-between">
        {data.map((i)=>{
          const found=basket.find((item)=>item.id===i.id)
      return(
          <Card
      amount= {found?.amount || 0}
        addToBasket={addToBasket}
         removeFromBasket={removeFromBasket}
          item={i} key={i.id}/>
        );
        })}</div>
    </div>
  )
}

export default Scoops