import { useContext, useEffect, useState } from 'react'
import UserContext from '../../../constans/userContext'
import { toast } from 'react-toastify';
import axios from 'axios';

interface props {
  brands: [];
  categories: [];
  isClose: (boolean: boolean) => void
}

const Edit: React.FC<props> = ({brands, categories, isClose}) => {
  const [addMoto, setaddMoto] = useState(true);
  const [year, setyear] = useState(0)
  const [category, setcategory] = useState("")
  const [brand, setbrand] = useState("")
  const [model, setmodel] = useState("")

  const userContext = useContext(UserContext)

  const handleYear = (e: any) => {
    setyear(e.target.value)
  }

  const handleCategory = (e: any) => {
    setcategory(e.target.value)
  }

  const handleBrand = (e: any) => {
    setbrand(e.target.value)
  }

  const handleModel = (e: any) => {
    setmodel(e.target.value)
  }

  useEffect(() => {
    if (userContext.userInfo)
      setcategory(userContext.userInfo.category)
    if (userContext.userInfo.moto){
      setaddMoto(false)
      setbrand(userContext.userInfo.moto.brand)
      setmodel(userContext.userInfo.moto.model)
      setyear(userContext.userInfo.moto.year)
    }
  }, []);
  
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(category === "") 
    {
        toast.warning("Nenastavil si kategóriu");
        return;
    }
    if(brand === "") 
    {
        toast.warning("Nenastavil si značku moto");
        return;
    }
    if(model === "") 
    {
        toast.warning("Nenastavil si model moto");
        return;
    }
    if(year === 0) 
    {
        toast.warning("Nenastavil si rok moto");
        return;
    }


    try {
        const formdata = new FormData;
        formdata.append('id', userContext.userInfo.id.toString());
        formdata.append('category', category)
        if (!addMoto) {
            formdata.append('year', year.toString())
            formdata.append('brand', brand)
            formdata.append('model', model)
        }

        axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/profile/userInfo`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userContext.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200 && response.data.status === true) {
            handleClose();
          }
        });
        
    } catch (error: any) {
        toast.warning(error.message);
    }
  }

  const clearData = () => {
    setaddMoto(true);
    setbrand("");
    setcategory("");
    setmodel("");
    setyear(0);
  }

  const handleClose = () => {
    clearData();
    isClose(false);
    window.location.reload()
  }
  return ( 
    <div className="flex-row m-4 text-center text-primary-content">
    <form action="">
        <div className='my-2'>
            <h1 className=' '>Age: {userContext.userInfo.age}</h1>
        </div>
        <div className='my-2'>
            <h1 className=' '>Category: </h1>
            
            <select className="select w-full max-w-xs" required onChange={handleCategory}>
                <option disabled selected>Nastavená kategória: {category}</option>
                {categories.map((item, id) => (<option  key={id}>{item}</option>))}
        </select>
        </div>
        {addMoto ? (<button className='my-4 btn border-primary-content text-primary-content' onClick={() => setaddMoto(false)}>
            Pridať motorku
        </button>) : (
            <div className='my-4'>
                <h1 className='my-2 text-2xl'>Pridanie motorky</h1>
                <select className="select w-full max-w-xs " required onChange={handleBrand}>
                    <option disabled selected>{addMoto ? ("Značka motorky:" + brand) : ("Nastav značku tvojej motorky")}</option>
                    {brands.map((item, id) => (<option key={id}>{item}</option>))}
                </select>
                <h1 className='my-1'>Model: </h1>
                    <input className='w-full border border-primary-content bg-neutral' type="text" required onChange={handleModel} value={model}/>
                <h1 className='my-1'>Year: {year}</h1>
                <input className='w-full border border-primary-content bg-neutral' min={1980} max={2025}  type="range"
                    value={year}
                    onChange={handleYear}
                    required />
            </div>
        )}
    </form>
    <button
            onClick={handleSubmit}
            className="m-4 btn border-primary-content text-primary-content"
            >
            Ulož
        </button>
        <button
            onClick={handleClose}
            className="mx-4 btn border-primary-content text-primary-content"
          >
            Close edit
          </button>
</div>
  )
}

export default Edit
