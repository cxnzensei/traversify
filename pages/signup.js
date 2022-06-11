import Photo from '../components/Photo'
import Signup from '../components/Signup'
import Head from 'next/head'

const signup = () => {
  return (
    <>
      <Head>
        <title>Traversify | Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/3">
          <Photo />
        </div>
        <div className="lg:w-2/3">
          <Signup />
        </div>
      </div>
    </>
  )
}

export default signup
