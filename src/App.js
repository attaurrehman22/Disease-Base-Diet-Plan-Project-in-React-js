
import { Register } from './Register';
import { Login } from './Login';
import Adddoctor  from './Admin/Adddoctor';

import AddFoodItem from './Admin/AddFoodItem';
import AddIngredient from './Admin/AddIngredient';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddDisease from './Doctor/AddDisease';
import RestrictIngredient from './Doctor/RestrictIngredient';
import SuggestPlan from './Doctor/SuggestPlan';
import Userdisease from './User/Userdisease';
import CreatePlan from './User/CreatePlan';
import PlanDetails from './User/PlanDetails';
import DemoImage from './User/DemoImage';
import ProductDetail from './User/ProductDetail';
import ShowImage from './User/ShowImage';
import IngrdientDetails from './User/IngrdientDetails';
import { ViewPlan } from './User/ViewPlan';
import { ViewPlanDetails } from './User/ViewPlanDetails';
import {SuggestPlanDetails} from './Doctor/SuggestPlanDetails';
import {Suggestedplan} from './User/Suggestedplan';
 import{SuggestedPlanDetails} from './User/SuggestedPlanDetails'
import {ActivePlan} from './User/ActivePlan'
import { Alert } from './User/Alert';
import SuggestFoods from './Doctor/SuggestFood';
import Suggestedfoods from './User/Suggestedfoods';
import { SharedPlan } from './User/SharedPlan';
import { SaredPlanDetails } from './User/SaredPlanDetails';
import ResponsiveNavbar from './ResponsiveNavbar';
import { UpdatePlan } from './User/UpdatePlan';
import UpdatePlanDetails from './User/UpdatePlanDetails';
import DislikeFood from './User/DislikeFood';
import BlockFood from './Doctor/BlockFood';
import { Wellcome } from './User/Wellcome';

global.Apipath="http://172.16.3.49/";

function App() {
 
  return (
    <BrowserRouter >
   
    <div>
      <Routes >
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
       
        <Route path="/Adddoctor" element={<Adddoctor/>}/>
        <Route path="/AddFoodItem" element={<AddFoodItem/>}/>
        <Route path="/AddIngredient" element={<AddIngredient/>}/>
        <Route path="/AddDisease" element={<AddDisease/>}/>
        <Route path="/RestrictIngredient" element={<RestrictIngredient/>}/>
        <Route path="/SuggestPlan" element={<SuggestPlan/>}/>
        <Route path="/Userdisease" element={<Userdisease/>}/>
        <Route path="/CreatePlan" element={<CreatePlan/>}/>
        <Route path="/PlanDetails" element={<PlanDetails/>}/>
        <Route path="/DemoImage" element={<DemoImage/>}/>
        <Route path="/ProductDetail" element={<ProductDetail/>}/>
        <Route path="/ShowImage" element={<ShowImage/>}/>
        <Route path="/IngrdientDetails" element={<IngrdientDetails/>}/>
        <Route path="/ViewPlan" element={<ViewPlan/>}/>
        <Route path="/ViewPlanDetails" element={<ViewPlanDetails/>}/>
        <Route path="/SuggestPlanDetails" element={<SuggestPlanDetails/>}/>
        <Route path="/Suggestedplan" element={<Suggestedplan/>}/>
        <Route path="/SuggestedPlanDetails" element={<SuggestedPlanDetails/>}/>
        <Route path="/ActivePlan" element={<ActivePlan/>}/>
        <Route path="/Alert" element={<Alert/>}/>
        <Route path="/SuggestFoods" element={<SuggestFoods/>}/>
        <Route path="/Suggestedfoods" element={<Suggestedfoods/>}/>
        <Route path="/SharedPlan" element={<SharedPlan/>}/>
        <Route path="/SaredPlanDetails" element={<SaredPlanDetails/>}/>
        <Route path="/ResponsiveNavbar" element={<ResponsiveNavbar/>}/>
        <Route path="/UpdatePlan" element={<UpdatePlan/>}/>
        <Route path="/UpdatePlanDetails" element={<UpdatePlanDetails/>}/>
        <Route path="/DislikeFood" element={<DislikeFood/>}/>
        <Route path="/BlockFood" element={<BlockFood/>}/>
        <Route path="/Wellcome" element={<Wellcome/>}/>
        {/* <AdminLayout>
                <HomePage />
        </AdminLayout> */}
      </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
