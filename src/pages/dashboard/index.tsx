import DashboardHeader from "../../components/Header"
import DashboardTable from "../../components/Table"
import "./style.scss"

const AdminPage = () => {
  return (
    <div className="dashboard">
      <DashboardHeader />
      <DashboardTable />
    </div>
  )
}

export default AdminPage