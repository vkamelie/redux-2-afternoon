import React, { Component } from 'react';
import {connect} from "react-redux";
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import {requestUserData} from "../../ducks/userReducer";
import {requestBudgetData} from "../../ducks/budgetReducer";
import Nav from './../shared/Nav';
import './Budget.css';


class Budget extends Component {

  componentDidMount(){
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    const {loading, purchases, budgetLimit} = this.props.budget
    const {email, firstName, lastName} = this.props.user
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} email={email}/>
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase />
              <DisplayPurchases purchases={purchases} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit}/>
              <Chart2  purchases={purchases}/>
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state){
  return{
    budget: state.budget,
    user: state.user
  }
}

const mapDispactchToProps = {
  requestUserData,
  requestBudgetData
}

export default connect(mapStateToProps, mapDispactchToProps)(Budget);
