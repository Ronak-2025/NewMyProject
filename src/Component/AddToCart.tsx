
import { Box, Button, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UseCart from './UseCart';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';

const AddToCart = () => {
    const {cast,addToCart,removeFromCart,minusFromCart} =UseCart();
    const navigate=useNavigate();
    if(cast.length <1)
    {
      return  "ADD SOMETHING HERE"
    }
  return (
    <>
      <Stack direction="row" spacing={2}>
     
        {cast.map( (product ,id: number) =>(
         
            <Stack>
         <Box
         component="img"
         key={product.id}
         src={product.image}
         sx={{ height: "100px", width: "100px" }}
       />
        
       <Button onClick={() => addToCart(product)}><AddIcon/></Button>
       <Typography >{product.quantity} </Typography>  
       <Button onClick={() => minusFromCart(product.id)}><RemoveIcon/></Button>
       <Button onClick={() =>  removeFromCart(product.id)}><DeleteForeverIcon/></Button>
       <Button onClick={ () => {navigate(`/product/${product.id}`)  }}><InfoIcon/></Button>
       
       </Stack>
        )
        )}

    

    </Stack> 

    </>
  )
}

export default AddToCart



