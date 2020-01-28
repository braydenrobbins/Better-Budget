import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Progress, Button, List } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import isEmpty from 'lodash';

function Budget() {
  const { user, updateUser, transactions, currentBudget, budgets, currentMonth, updateCurrentBudget } = useContext(UserContext);
  const { refresh, loading } = useContext(AuthContext);

  useEffect(() => {
    refresh();
  }, []);

  const categories = currentBudget.categories;

  function previousMonth() {
    updateCurrentBudget(currentBudget + 1);
  }

  function nextMonth() {
    updateCurrentBudget(currentBudget - 1);
  }

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
            <div>
            <Button onClick={() => previousMonth()}>Previous Month</Button>
            <span>{currentMonth}</span>
            <Button disabled={true} onClick={() => nextMonth()}>Next Month</Button>
            </div>
            <List
              grid={{ column: 3 }}
              bordered={true}
              itemLayout='vertical'
              className='categories-list'
              >
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={categories.housing} />
                  <h2>Housing</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={categories.transportation} />
                  <h2>Transportation</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={categories.expenses} />
                  <h2>Expenses</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={categories.debt} />
                  <h2>Debt</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={categories.savings} />
                  <h2>Savings</h2>
                </List.Item>
            </List>
          </div>
        </>
      }
    </>
  )
}

export default Budget;