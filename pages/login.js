import Login from '../components/Login'
import Head from 'next/head'

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Traversify | Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Login />
      </div>
    </>
  )
}

export default LoginPage