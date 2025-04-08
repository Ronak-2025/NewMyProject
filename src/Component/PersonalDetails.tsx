import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import {z} from "zod";
import AddIcon from '@mui/icons-material/Add';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
const detailSchema = z.object ({
    firstname :z.string().nonempty({message : "Enter  first name"}),
    lastname : z.string().nonempty({message :"Enter Last Name"}),
    // mobilenumber: z.string().nonempty({message : "Enter Your Mobile Number"})
    mobilenumber: z.string().regex(phoneRegex, 'Invalid Number!'),

})

type IDetail = z.infer<typeof detailSchema>
const PersonalDetails = () => {
const {
        register,
        control,
        handleSubmit,
       watch,reset,
        formState: { errors },
      } = useForm<{ details: IDetail[]}>({
        resolver: zodResolver(z.object({ details: z.array(detailSchema) })),
        defaultValues: {
          details: [{ firstname: "", lastname: "", mobilenumber: "" }],
        },
      });
  const { fields, append, remove } = useFieldArray({
            control,
            name: "details",
 });
  const copy = () => {
          append({ firstname: "", lastname: "", mobilenumber: "" });
  };
  const dlt = (index: number) => {
    remove(index);
  };
  const watchfield=watch("details")
const onSubmit = () => {
  alert("YOu submitted data successfully");
  {watchfield.map((items)=> (
      console.log(items.firstname ,items.mobilenumber)

  ))}
   reset();
  
}

  return (  
     <>
    <form onSubmit={handleSubmit(onSubmit)}>
         {fields.map((item, index) => (
          <Box key={item.id}>
            <TextField placeholder="Enter First Name"  type="text" {...register(`details.${index}.firstname`)} error={!!errors.details?.[index]?.firstname} 
             helperText={errors.details?.[index]?.firstname?.message} />
            <TextField  placeholder="Enter Last Name"  type="text" {...register(`details.${index}.lastname`)} error={!!errors.details?.[index]?.lastname}
              helperText={errors.details?.[index]?.lastname?.message}  />
            <TextField placeholder="Enter Mobile Number" type="text" {...register(`details.${index}.mobilenumber`)} error={!!errors.details?.[index]?.mobilenumber}
              helperText={errors.details?.[index]?.mobilenumber?.message}/>
            <Button onClick={copy} variant="outlined" color="primary"><AddIcon /></Button>
            {fields.length > 1 && (
              <Button onClick={() => dlt(index)} variant="outlined" color="secondary"> Delete</Button>
            )}
          </Box>
        ))}
       <Button type="submit" variant="contained" color="primary">
                  Submit
        </Button>
      </form>
    
    </>
  )
}

export default PersonalDetails
















