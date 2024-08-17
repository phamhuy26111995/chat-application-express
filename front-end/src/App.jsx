import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/sign_up/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext.jsx";
import { useState } from "react";
import Modal from "./components/modal/Modal";

function App() {
  const { authUser } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
      </Routes>
      <Toaster />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Chào mừng đến với Modal!"
      >
        <p>
          Đây là nội dung của modal. Bạn có thể thêm bất kỳ React component nào
          vào đây.
        </p>
      </Modal>
	  <button className="btn" onClick={openModal}>Mở Modal</button>
    
    </div>
  );
}

export default App;
