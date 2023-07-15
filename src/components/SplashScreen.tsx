const SplashScreen = () => {
  return (
    <>
    <div className='bg-accent w-screen h-screen absolute x-0 y-0 z-50 items-center justify-center flex'>
        <img className='w-1/6 rounded-3xl' src="/logo2.png" alt="logo" />
        <span className="loading loading-spinner loading-lg"></span>
    </div>
    </>
  )
}

export default SplashScreen