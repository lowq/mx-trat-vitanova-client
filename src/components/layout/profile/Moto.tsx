import { useContext } from 'react'
import UserContext from '../../../constans/userContext'

const Moto = () => {

  const userContext = useContext(UserContext)

  return (
    <div className='m-4 text-accent text-xl'>
        {userContext.userInfo && userContext.userInfo.moto && (
            <h1>Moto: {userContext.userInfo.moto.brand} {userContext.userInfo.moto.model} {userContext.userInfo.moto.year} </h1>
            )
        }
    </div>
  )
}

export default Moto