import axios from "axios"
const api =axios.create({
    baseURL :"https://fakestoreapi.com",
})
export const fetchFunction =async () => {
    try{
        const res=await api.get('/products')
        return res.status===200 ? res.data :[];}
        catch(error) {console.log(error)};


}



const aps=axios.create({
    baseURL:"https://fakestoreapi.com/products",
})

export const fetchIn =async ( id :number) => {

        try {
                const res =await aps.get(`/${id}`)
                return res.status===200 ? res.data: []  ;
        }
        catch(error)
        {
            return error; 
        }

}








