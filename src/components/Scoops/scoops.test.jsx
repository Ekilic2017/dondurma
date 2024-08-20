import { findAllByRole, render, screen } from "@testing-library/react"
import Scoops from "."
import userEvent from "@testing-library/user-event";
it("API'dan alınan veriler için ekrana kartlar basılır",async()=>{
   //userEvent kurulumu
  const user= userEvent.setup();
    render(<Scoops/>);
    //ekrana basılan kartları al
  const images=  await screen.findAllByRole("img");
//ekrandaki resimleri uzunluğunu kontrol eder.
expect(images.length).toBeGreaterThanOrEqual(1);
});
it("çeşitlerin ekleme ve azaltma özelliklerinin toplam fiyata etkisi",
   async ()=>{
        //test edilecek bileşen render edilir.
render (<Scoops/>)
        //bütün ekleme ve azaltma butonlarını çağır
       const addBtns= await screen.findAllByRole("button",{name:"Ekle"});
       const delBtns= await screen.findAllByRole("button",{name:"Azalt"})
        //toplam fiyat elementini çağır
        const total=screen.getByTestId("total");
        //toplam fiyatı kontrol et
        expect(total.textContent).toBe("0");
        //chocaletın ekle butonunu tıkla
        await user.click(addBtns[2])
        //toplam fiyatı kontrol et
        expect(total.textContent).toBe("20");
        //vanilyanın ekle butonuna iki kez tıkla
        await user.dblClick(addBtns[1]);
        //toplam fiyatı kontrol et
        expect(total.textContent).toBe("60");
        //vanilyanın azalt butonuna tıkla
        await user.click(delBtns[1]);
        //toplam fiyatı kontrol et
        expect(total.textContent).toBe("40");
        //vanilyanın azalt butonuna tıkla
        await user.click(delBtns[1]);
        //toplam fiyatı kontrol et
        expect(total.textContent).toBe("20");
        //chocaletın azalt butonunu tıkla
        await user.click(delBtns[2]);
        //toplam fiyatı kontrol et
        expect(total.textContent).toBe("0");
    })