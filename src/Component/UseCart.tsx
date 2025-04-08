import {create} from 'zustand'
import { persist } from "zustand/middleware";


type Product ={
    id: number;
    quantity :number;
    totalItems :number;
    image :string;
    isin : boolean;


};
interface state {
    cast :Product[];
    totalItems :number;
   
    addToCart : (product : Product) => void;
    removeFromCart : (id :number) =>void;
    minusFromCart  : (id :number) =>void;
    totalPrice : number;
   
} 
interface Action {
    cart : Product[];
  
}

 const UseCart =  create(persist<state & Action>((set,get) => ({
    cast : [],
    cart : [],
    totalItems : 0,totalPrice : 0,

      addToCart : (product :Product) => {
               
                const cast = get().cast ;
                 const id=cast.find((cast ) => cast.id === product.id);
                 if(!id)
                 {
                   const updatedcast = [...cast,{...product,quantity : 1,isin : true}];
                  
                  set((state) => ( {cast : updatedcast ,totalItems : state.totalItems+1 }));
                 
                 }
                 else
                 {
                   const updatedcast = cast.map((items) =>  
                      items.id ===product.id ? {...items,quantity  : items.quantity+1} : items
                 
                    )
                    set((state) => ( {cast : updatedcast ,totalItems : state.totalItems+1 ,}));
                 }
                 
      },
      removeFromCart : (id) => {
            const cast =get().cast;
             const list =cast.find((cast) =>cast.id === id  )
             if(list)
             {
                const less=list.quantity;
                set((state) => ({totalItems : state.totalItems -less}));
                
             }
             
                const updatedcast = cast.filter((cast) => cast.id!==id)
          
               set(() => ( {cast:updatedcast  }))
               
                

      },
      minusFromCart : (id) => {
         const cast =get().cast;
         const updatedcast = cast.map((items) => items.id==id ? {...items,quantity : items.quantity-1} : items )
         set((state) => ({cast:updatedcast,totalItems : state.totalItems-1}))
      },
    

}),
{
    name: "cast",
  }
 )
);

export default UseCart;