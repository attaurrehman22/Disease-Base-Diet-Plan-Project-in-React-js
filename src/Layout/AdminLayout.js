import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Adddoctor  from './Admin/Adddoctor';
// import {AddFoodItem} from './Admin/AddFoodItem';
// import AddIngredient from './Admin/AddIngredient';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="layout">
      <header className="Admin-header">
        <nav>
          <table className="Admin-table">
            <th>
              <Link className="layout-link" to="/Adddoctor">
                {" "}
                <p className="layout-para">Add Doctor</p>{" "}
              </Link>
            </th>
            <th>
              <Link className="layout-link" to="/AddFoodItem">
                {" "}
                <p className="layout-para">Add FoodItem</p>{" "}
              </Link>
            </th>
          </table>
          {/* <Route>
         <Route path="/Adddoctor" element={<AdminLayout><Adddoctor/></AdminLayout>}/>
        <Route path="/AddFoodItem" element={<AdminLayout><AddFoodItem/></AdminLayout>}/>
        <Route path="/AddIngredient" element={<AdminLayout><AddIngredient/></AdminLayout>}/>
         </Route> */}
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        {/* Footer content */}
        <p>Do you Know</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
