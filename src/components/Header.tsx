import { useNavigate } from "react-router-dom";
import "../general-styles/Header.scss"
import useAuth from "../store/auth"
import { useState } from "react";
import { Modal } from "antd";
import { USER_DATA } from "../constants";


const DashboardHeader = () => {
  const jsonUser = localStorage.getItem(USER_DATA) || ""
  const { name } = JSON.parse(jsonUser) || "User";

  const navigate = useNavigate();
  const { logout } = useAuth();


  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    logout(navigate)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="dashboard__header">
      <nav className="nav">
        <div className="container nav__container">
          <p className="nav__user">
            Hello, {name}
          </p>
          <div className="nav__controls">
            <button className="nav__btn" onClick={showModal}>Logout</button>
          </div>
        </div>
        <Modal title="Confirmation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          Do you want to log out ?
        </Modal>
      </nav>
    </header>
  )
}

export default DashboardHeader