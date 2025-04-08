import { Badge, Box, Button,Stack, Typography } from '@mui/material'
import ShopIcon from '@mui/icons-material/Shop';
import useAuth from "./UseAuth"
import {  useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import {fetchFunction} from "./Fetch/Fetch"
import  UseCart  from './UseCart';
import InfoIcon from '@mui/icons-material/Info';

export const Visual = () => {

 const {logout,username} =useAuth();
 const {addToCart,totalItems} =UseCart();

  const navigate=useNavigate();
 const {data,status,error} =useQuery ({
    queryKey :["products"],
    queryFn :  fetchFunction 


 })
 console.log(username);
 const submitted =() =>{
    console.log("data is logged out");
    alert("Successfully Logout") ;
    logout();
    navigate("/signup");
  }
  if (status === 'pending') {
    return <Box>Loading...</Box>
  }
  if (status === 'error') {
    return <Box>Error: {error.message}</Box>
  }
  
  return (<>
 <Badge color="secondary" badgeContent={totalItems} onClick={ () => navigate("/addtocart")} sx={{display :"flex" ,justifyContent : "flex-end"}}>
 <ShopIcon  />
      </Badge>
      <Box  sx={{display: "flex", justifyContent : "center"}}>
      <Typography>User Name :{username}</Typography>
   </Box>
      
    <Stack direction="row" spacing={2} sx={{display: "flex", justifyContent : "center"}}>
      
      {data.slice(0,6).map((product :any ) => (
         <Stack sx={{ display: "flex", justifyContent: "space-between"  }} >
           <Box key={product.id}   component="img" src={product.image} sx={{ height : "100px", width :"100px"} } />
         <Button onClick={() => {addToCart(product)} } >Add To Cart</Button>
         <Button onClick={ () => {navigate(`/product/${product.id}`)  }}><InfoIcon/></Button>
         </Stack>
   
      ))}
       
  </Stack>
   
      <Stack direction="column" sx={{display: "flex", justifyContent : "center"}}>
      <Button onClick={ () => navigate("/personalDetails")}>To Enter Detail</Button>
      <Button  onClick={submitted }> Logout</Button>
    </Stack>
    </>

  )
}






