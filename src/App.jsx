
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import SignIn from "./pages/AuthPages/SignIn"
import Layout from "./layouts/Layout"
import SignUp from "./pages/AuthPages/SignUp"


function App() {


  return (
    
    <Layout>
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/sign-in" element={ <SignIn />} />
        <Route path="/sign-up" element={ <SignUp />} />
      </Routes>
    </Layout>
  )
}

export default App
