
import { useForm, SubmitHandler} from "react-hook-form";
import { Box, Button, Grid2, TextField, Typography } from '@mui/material';
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
  import UseAuth from "./UseAuth";
const loginScheme   = z.object({
    email: z.string().nonempty({message:"Email is Required"}),
 
  password:z. string()
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
});
type Ilogin = z.infer<typeof loginScheme>;


 const login = () => {
  const {login:login1} =UseAuth();
  const navigation =useNavigate();
   const methods = useForm<Ilogin>({
     
      resolver: zodResolver(loginScheme),
      defaultValues :{email :""  ,password:""}
     
    
    });
 
 
     const {register,handleSubmit,formState: {errors}}=methods;

const onSubmit :SubmitHandler<Ilogin> = (data :Ilogin ) =>
{ 
    const loggedin =localStorage.getItem(data.email);
    if(!loggedin)
    {
      alert('No User Found Please Signup First')
      return;
    }
    const userData: Ilogin = JSON.parse(loggedin);
    if(data.email=== userData.email && data.password === userData.password)
    {
      alert("You Successfully Login");
      login1();
      navigation("/visual")
      
    }
    else{
      alert("Email Id or Password is incorrect");
    } 
}

  return (
    <Grid2 container sx ={{display:"flex" ,justifyContent:"center" }} >
    <form  onSubmit={handleSubmit(onSubmit)}>
      <Box  display="flex" flexDirection="column" >
     
      <Typography variant="h5"  sx={{mt:1 , display :"flex" , justifyContent:"center"}}>Login </Typography>
      <TextField placeholder="Enter Email"   type="email"  {...register('email')}   error={!!errors.email}   helperText={errors.email?.message} sx={{ mb: 2 }}/>
  
      <TextField  placeholder="Enter Password"  type="password" {...register('password')}   error={!!errors.password}   helperText={errors.password?.message} sx={{ mb: 2 }}  />
      <Button type="submit" >Log In</Button>
      <Button onClick={ () =>  navigation("/signup")  }  >Sign Up</Button>
      </Box>
      </form>
      
  </Grid2>
    
 
    
  )
}



export default login;


