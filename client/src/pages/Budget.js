import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Progress, List, Button } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import moment from 'moment';

function Budget() {
  const { user } = useContext(UserContext);
  const [budgetSelected, setBudgetSelected] = useState('');
  const { refresh, loading, loggedIn } = useContext(AuthContext);

  useEffect(() => {
    refresh();
    console.log(user.budgets)
    setBudgetSelected(user.budgets.filter(budget => budget.month === moment().date("mmmm yyyy")))
  }, [])

  // ==============================================
  // function getValue() {
  //   const categories = Object.keys(categoryObj)
  //   const values = categories.map(category => {
  //       categoryObj.[category]
  //   })
  //   console.log(values);
  //   });
  // }
  //===============================================


  function previousMonth() {
    setBudgetSelected(budgetSelected + 1);
  }

  function nextMonth() {
    setBudgetSelected(budgetSelected - 1);
  }

  // const allCategories = Object.keys(user.budgets[budgetSelected].categories)
  // const uniqueCategories = allCategories.filter((category, index) => allCategories.indexOf(category) === index)

  return (
    <>
      {loading ?
        <h1>Loading...</h1> :
        <>
          <NavBar />
          <div className='main-content'>
            <h1>Your Budgets</h1>
            <Progress
              type="circle"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={100}
            />
            {/* <h2>{user.budgets[budgetSelected].month}</h2>
            <Button onClick={() => previousMonth()}>Previous Month</Button>
            <Button disabled={true} onClick={() => nextMonth()}>Next Month</Button>
            <List
              grid={{ column: 3 }}
              bordered={true}
              itemLayout='vertical'
              className='categories-list'
              dataSource={uniqueCategories}
              renderItem={category => (
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={20} />
                  <h2>{category}</h2>
                </List.Item>
              )}
            /> */}
          </div>
        </>
      }
    </>
  )
}

export default Budget;