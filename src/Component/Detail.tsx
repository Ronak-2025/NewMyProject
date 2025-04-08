import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchIn } from './Fetch/Fetch';

const Detail = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetchIn(id),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  if (!data) return <div>No data available</div>;

  return (
    <div>
       {data &&  (
          <Box key={data.id} component="div">
            <Box
              component="img"
              src={data.image}
              sx={{ height: 290, width: 300 }}
            />
            <Typography>Name: {data.title}</Typography>
            <Typography variant="h5" color="red">
              Price: ${data.price}
            </Typography>
            <Typography variant="h5">Description: {data.description}</Typography>
            
          </Box>
        )
}
    </div>
  );
};
export default Detail;

