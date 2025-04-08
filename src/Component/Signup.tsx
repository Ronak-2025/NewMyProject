
import { useForm,  FormProvider } from "react-hook-form";
import { Box, Button, Grid2, TextField, Typography } from '@mui/material';
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import useAuth from "./UseAuth";
const SignUpScheme   = z.object({
    email: z.string().nonempty({message:"Email is Required"}),
  username: z.string().nonempty({message:"Username is Required "}),
  password:z. string()
    .min(1, "Password is required")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm:z. string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

type ISignUp = z.infer<typeof SignUpScheme>;

 const SignUp = () => {
  const {register : register1} =useAuth();
  const methods = useForm<ISignUp>({
    resolver: zodResolver(SignUpScheme),
  defaultValues :{email :"" ,username :"" ,password:""}
 });
 const {register,handleSubmit,formState: {errors}}=methods;
  
 const navigate=useNavigate();
  const onSubmitHandler  = (data : ISignUp) =>{
         if(data.email && data.username && data.password === data.passwordConfirm)
         {
            localStorage.setItem(data.email,JSON.stringify(data));
            register1(data.username);
             navigate("/");
          }
       
        
  }
   
   
  return (
   
    <Grid2 container sx ={{display:"flex" ,justifyContent:"center" }} >
      <form  onSubmit={handleSubmit(onSubmitHandler) }>
        <Box  display="flex" flexDirection="column" >
        <FormProvider {...methods} >
        <Typography variant="h5"  sx={{mt:1 , display :"flex" , justifyContent:"center"}}>SignUp</Typography>
        <TextField  placeholder="Enter username"  type="username"   {...register('username')}   error={!!errors.username}   helperText={errors.username?.message} sx={{ mb: 2 }}/>
        <TextField placeholder="Enter Email"   type="email"  {...register('email')}    error={!!errors.email}   helperText={errors.email?.message} sx={{ mb: 2 }}/>
        
        <TextField  placeholder="Enter Password"  type="password" {...register('password')}   error={!!errors.password}   helperText={errors.password?.message} sx={{ mb: 2 }}  />
       
        <TextField  placeholder="ReEnter Password"  type="password" {...register('passwordConfirm')}   error={!!errors.passwordConfirm}   helperText={errors.passwordConfirm?.message} sx={{ mb: 2 }}  />
       <Button type="submit" >SignUp</Button>
       </FormProvider>
        </Box>
        </form>
        
    </Grid2>

    
    
 
    
  )
} 
export  {SignUp};

