import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import LoginFooter from "./components/LoginFooter";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      {/* Link to pages using React Router DOM */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/signin"
            element={
              <>
                <Navbar /> <SignIn /> <LoginFooter />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
