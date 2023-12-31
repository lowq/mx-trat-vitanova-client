import { useContext } from 'react'
import UserContext from '../../../constans/userContext';

const UserInfo = () => {

    const userContext = useContext(UserContext);

  return (
    <>
    {userContext.userInfo && (
        <div className='m-4 text-primary-content text-xl'>
          Age: {userContext.userInfo.age}
        </div>
    )}
    </>
    
  )
}

export default UserInfo