import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import Login from "./routes/Login"
import { auth } from "./filebase"
import { useEffect, useState } from "react"
import Join from "./routes/Join"
import LoadingScreen from "./components/LoadingScreen"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import Profile from "./routes/Profile"
import Challenge from "./routes/Challenge"
import ScrollToTop from "./components/ScrollToTop"
import CheckInterest from "./routes/CheckInterest"
import Test from "./routes/Test"
import JoinChallenge from "./routes/JoinChallenge"
import Search from "./routes/Search"
import ChangeUserInfo from "./routes/ChangeUserInfo"
import ErrorPage from "./routes/ErrorPage"
import PaginationTest from "./routes/PaginationTest"
import Certificate from "./routes/Certificate"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "checkinterest",
        element: <CheckInterest />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "changeuserinfo",
        element: <ChangeUserInfo />
      },
    ]
  },
  {
    path: "/challenge",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: ":challengeId",
        element: <Challenge />
      },
    ]
  },
  {
    path: "/joinchallenge",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: ":challengeId",
        element: <JoinChallenge />
      },
    ]
  },
  {
    path: "/certificate",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: ":certificateId",
        element: <Certificate />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/join",
    element: <Join />
  },
  {
    path: "test",
    element: <Test />
  },
  {
    path: "pagination",
    element: <PaginationTest />
  },
  {
    path: "/error",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ErrorPage />
      }
    ]
  }
])

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setLoading(false);
  }
  
  useEffect(() => {init(), []})

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
