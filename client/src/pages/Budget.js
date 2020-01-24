import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Progress, List, Button } from 'antd';
import { AuthContext } from '../contexts/AuthContext';

function Budget() {
  const { user } = useContext(UserContext);
  const [budgetSelected, setBudgetSelected] = useState(0 || '');
  // const currentMonth = user.budgets[budgetSelected].month
  // const lastMonth = user.budgets.length;
  const { refresh, loading, loggedIn } = useContext(AuthContext);

  useEffect(() => {
    refresh();
  }, [])


  function previousMonth() {
    setBudgetSelected(budgetSelected + 1);
  }

  function nextMonth() {
    setBudgetSelected(budgetSelected - 1);
  }

  const allCategories = Object.keys(user.budgets[budgetSelected].categories)
  const uniqueCategories = allCategories.filter((category, index) => allCategories.indexOf(category) === index)

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
            <h2>{user.budgets[budgetSelected].month}</h2>
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
            />
          </div>
        </>
      }
    </>
  )
}

export default Budget;