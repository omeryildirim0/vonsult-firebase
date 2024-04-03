
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import SignIn from "./pages/AuthPages/SignIn"
import Layout from "./layouts/Layout"
import SignUp from "./pages/AuthPages/SignUp"
import BecomeACoach from "./pages/BecomeACoach/BecomeACoach"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import Dashboard from "./pages/Dashboard/Dashboard"
import CoachPublicProfile from "./pages/CoachPublicProfile/CoachPublicProfile"
import CheckoutForm from "./stripe/CheckoutForm"
import Return from "./stripe/Return"
import Success from "./stripe/Success"
import BlogMainPage from "./pages/Blog/BlogMain"
import ArticlePage from "./pages/Blog/ArticlePage"

function App() {
  const [authUser] = useAuthState(auth);

  return (
    
    <Layout>
      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/sign-in" element={!authUser ? <SignIn /> : < Navigate to='/' />} />
        <Route path="/sign-up" element={!authUser ? <SignUp /> : < Navigate to='/' />} />
        <Route path="/become-a-coach" element={<BecomeACoach />} />
        <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/coach/:coachId" element={<CoachPublicProfile />} />
        <Route path="/blog" element={<BlogMainPage />} />
        <Route path="/blog/:articleId" element={<ArticlePage />} />

        <Route path="/success" element={<Success />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="/return" element={<Return />} />
      </Routes>
    </Layout>
  )
}

export default App
