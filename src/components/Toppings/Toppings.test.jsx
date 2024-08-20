import Toppings from".";
import { findAllByRole, render } from "@testing-library/react";
import {userEvent} from "@testing-library/user-event"
test ("sosları ekleme ve çıkarma işleminin toplam fiyata etkisi",
    async()=>{
       const user= userEvent.setup();
       //bileşeni renderla
       render(<Toppings/>);
       //bütün sos checkboxları al
       const toppings=await screen.findAllByRole("checkbox");
    //toplam spanı al
    const total=await screen.getByTestId("total");
      //tüm checkboxların tiksiz olduğunu kontrol et
      toppings.forEach((i) => expect(i).not.toBeChecked());
      //toplam ücret 0 mı kontrol et
      expect(total.textContent).toBe("0");
      //soslardan birine tıkla
      await user.click(toppings[4]);
      //toplam ücreti kontrol et
      expect(total.textContent).toBe("3");
      //farklı bir sosa tıkla
      await user.click(toppings[0]);
      //toplam ücreti kontrol et
      expect(total.textContent).toBe("6");
      //soslardan birinin tikini kaldır
      await user.click(toppings[0]);
      //toplam ücreti kontrol et
      expect(total.textContent).toBe("3");
      //soslardan birinin tikini kaldır
      await user.click(toppings[4]);
     //toplam ücreti kontrol et
     expect(total.textContent).toBe("0")





   
   
   
   
    })
