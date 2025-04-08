
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface Action  {
    username : string,
    isLoggedin :boolean;
    login :() =>void;
    logout : () =>void;
    register : (data :string  ) =>void;
}
const UseAuth =  create(persist<Action >((set) => ({
    cast : [],
    username: "",
    totalItems : 0,
      isLoggedin :window.localStorage.getItem("loggedIn") === "true",
      login : ()=>{
         
          window.localStorage.setItem("loggedIn","true");
           set({isLoggedin:true});




      },
      logout :() =>{
          
             set({isLoggedin :false ,username : ""});
             window.localStorage.setItem("loggedIn","false");
             localStorage.clear();
             
             
             

      },
      register : (data) => {
             set({username : data});
      },
      
}),
{

  name :"cast",

})
);

export default UseAuth
