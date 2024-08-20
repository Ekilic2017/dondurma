import { render } from "@testing-library/react"
import Card from "."
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
const item={
    name:"Chocolate",
    imagePath:"/images/chocolate.png",
    id:"bd76",
};
test("Miktar,başlık ve fotoğraf gelen propa göre ekrana basılır",
   ()=> {
render(<Card item={item}
     amount={3} 
     addToBasket={()=>{}}
     removeFromBasket={()=>{}}
/>);
 //miktar spanını çağır
   const amount=screen.getByTestId("amount");
   //span içeriği 5 mi
   expect(amount.textContent).toBe("3");
   //chocolate yazısı ekrana geldimi kontrol et
   screen.getByText("chocolate");
   //resim elementini çağır
  const image= screen.getByAltText("çeşit-resim")
   //resmin kaynağı doğrumu kontrol et
   expect(image).toHaveAttribute("src","/images/chocolate.png");
   });

//ekle azalt butonlarında çalışacak fonksiyonun testleri

test ("Butonlara tıklanınca fonksiyonlar doğru parametre ile çalışır",async()=>{
  const user=userEvent.setup();
  const addMockFn=jest.fn();
  const removeMockFn=jest.fn();
  render(<Card 
    item={item} amount={5}
  addToBasket={addMockFn}
  removeFromBasket={removeMockFn}/>);

//butonları al
const addBtn = screen.getByRole("button", { name: /ekle/i });
const delBtn = screen.getByRole("button", { name: /azalt/i });
// ekle butonuna tıkla
await user.click(addBtn);
// addToBasket methodu doğru parametreler ile çağrıldı mı
expect(addMockFn).toHaveBeenCalledWith(item);
  // azalt butonuna tıkla
  await user.click(delBtn);
   // removeFromBasket methodu doğru parametrelerle çalışıyor mu
   expect(removeMockFn).toHaveBeenCalledWith(item.id);
  });
  // todo azalt butonunu aktiflik testleri
  describe("azalt butonu akitflik testleri", () => {
  it("miktar 1 den fazla ise buton aktiftir", () => {
    render(<Card item={item} amount={3} />);

    const button = screen.getByRole("button", { name: "Azalt" });

    expect(button).toBeEnabled();
  });

  it("miktar 0 ise buton inaktiftir", () => {
    render(<Card item={item} amount={0} />);

    const button = screen.getByRole("button", { name: "Azalt" });

    expect(button).toBeDisabled();
  });
});