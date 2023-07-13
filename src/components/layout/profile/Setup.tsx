import { useContext, useState } from 'react'
import UserContext from '../../../constans/userContext'
import { toast } from 'react-toastify';
import axios from 'axios';

interface props {
    brands: [];
    categories: [];
    isClose: (boolean: boolean) => void
}

const Setup: React.FC<props> = ({brands, categories, isClose}) => {
  const [addMoto, setaddMoto] = useState(true);
  const [age, setage] = useState(0)
  const [year, setyear] = useState(0)
  const [category, setcategory] = useState("")
  const [brand, setbrand] = useState("")
  const [model, setmodel] = useState("")

  const userContext = useContext(UserContext)

  const handleAddAge = (e: any) => {
    setage(e.target.value)
  }

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
  
  const handleSubmit = (e: any) => {
    e.preventDefault();

    try {
        const formdata = new FormData;
        formdata.append('age', age.toString())
        formdata.append('category', category)
        if (!addMoto) {
            formdata.append('year', year.toString())
            formdata.append('brand', brand)
            formdata.append('model', model)
        }

        axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/profile/userInfo`, formdata, {
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
    setage(0);
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
    <>
        <div className="flex-row m-4 text-center text-accent">
            <form action="">
                <div className='my-2'>
                    <h1 className=' '>Age: {age}</h1>
                    <input className='w-full border border-accent bg-neutral' min={0} max={99}  type="range"
                    value={age}
                    onChange={handleAddAge}
                    required />
                </div>
                <div className='my-2'>
                    <h1 className=' '>Category: </h1>
                    
                    <select className="select w-full max-w-xs" required onChange={handleCategory}>
                        <option disabled selected>Nastav svoju kategóriu</option>
                        {categories.map((item,id) => (<option  key={id}>{item}</option>))}
                </select>
                </div>
                {addMoto ? (<button className='my-4 btn border-accent text-accent' onClick={() => setaddMoto(false)}>
                    Pridať motorku
                </button>) : (
                    <div className='my-4'>
                        <h1 className='my-2 text-2xl'>Pridanie motorky</h1>
                        <select className="select w-full max-w-xs " required onChange={handleBrand}>
                            <option disabled selected>Nastav značku tvojej motorky</option>
                            {brands.map((item, id) => (<option  key={id}>{item}</option>))}
                        </select>
                        <h1 className='my-1'>Model: </h1>
                            <input className='w-full border border-accent bg-neutral' type="text" required onChange={handleModel} value={model}/>
                        <h1 className='my-1'>Year: {year}</h1>
                        <input className='w-full border border-accent bg-neutral' min={1980} max={2025}  type="range"
                            value={year}
                            onChange={handleYear}
                            required />
                    </div>
                )}
            </form>
            <button
                    onClick={handleSubmit}
                    className="m-4 btn border-accent text-accent"
                    >
                    Ulož
                </button>
                <button
                    onClick={handleClose}
                    className="mx-4 btn border-accent text-accent"
                  >
                    Close setup
                  </button>
        </div>
    </>
  )
}

export default Setup