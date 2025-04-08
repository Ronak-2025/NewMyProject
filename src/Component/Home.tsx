
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./login"
import {SignUp} from "./Signup"
import {Visual} from "./Visual"
import ProtectedRoute from "./ProtectedRoute"
import AuthRoute from "./AuthRoute"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Detail from "./Detail"
import UseCart from "./UseCart"
import AddToCart from "./AddToCart"
import PersonalDetails from "./PersonalDetails"
const Home = () => {
  const isLoggedin =UseCart();
console.log(isLoggedin);
const queryClient = new QueryClient()
  return (
    <QueryClientProvider  client={queryClient}>
      <BrowserRouter>
    <Routes>
    <Route element={<AuthRoute />}>
        <Route path="/" element={<Login/>}  />
        <Route path="/signup" element={<SignUp/>}  />
        </Route>
<Route element={<ProtectedRoute />}>
<Route path="/" element={<Login/>}  />
<Route path="/product/:id" element={ <Detail/> } />
<Route path="/signup" element={<SignUp/>}  />
<Route path="/visual" element={<Visual/>}  />
<Route path="/detail" element={<Detail/>}  />
<Route path="/personalDetails" element={<PersonalDetails/>}  />
<Route path="/addtocart" element={<AddToCart/>}  />
</Route>
</Routes>
     </BrowserRouter>
 
    </QueryClientProvider>
  )
}

export default Home
