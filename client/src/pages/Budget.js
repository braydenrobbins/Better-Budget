import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Progress, Button, List } from 'antd';
import { AuthContext } from '../contexts/AuthContext';

function Budget() {
  let isEmpty = require('lodash/isEmpty');
  const { user, updateUser, transactions, currentBudget, budgets, currentMonth, updateCurrentBudget } = useContext(UserContext);
  const { refresh, loading } = useContext(AuthContext);
  let housingPercent = '';
  let transportationPercent = '';
  let expensesPercent = '';
  let debtPercent = '';
  let savingsPercent = '';

  useEffect(() => {
    refresh();
  }, []);

  if(!isEmpty(transactions)) {
  const housingTransactions = transactions.filter(transaction => transaction.category === 'Housing');
  if(!isEmpty(housingTransactions)) {
  housingPercent = parseInt(100/(currentBudget.totalIncome/housingTransactions.reduce((a, b) => a.amount + b.amount)));
  }
  
  const transportationTransactions = transactions.filter(transaction => transaction.category === 'transportation');
  if(!isEmpty(transportationTransactions)) {
  transportationPercent = parseInt(100/(currentBudget.totalIncome/transportationTransactions.reduce((a, b) => a.amount + b.amount)));
  }

  const expensesTransactions = transactions.filter(transaction => transaction.category === 'expenses');
  if(!isEmpty(expensesTransactions)) {
  expensesPercent = parseInt(100/(currentBudget.totalIncome/expensesTransactions.reduce((a, b) => a.amount + b.amount)));
  }

  const debtTransactions = transactions.filter(transaction => transaction.category === 'debt');
  if(!isEmpty(debtTransactions)) {
  debtPercent = parseInt(100/(currentBudget.totalIncome/debtTransactions.reduce((a, b) => a.amount + b.amount)));
  }

  const savingsTransactions = transactions.filter(transaction => transaction.category === 'savings');
  if(!isEmpty(savingsTransactions)) {
  savingsPercent = parseInt(100/(currentBudget.totalIncome/savingsTransactions.reduce((a, b) => a.amount + b.amount)));
  }
}


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
                  <Progress type="circle" strokeColor='#0070A9' percent={housingPercent} />
                  <h2>Housing</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={transportationPercent} />
                  <h2>Transportation</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={expensesPercent} />
                  <h2>Expenses</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={debtPercent} />
                  <h2>Debt</h2>
                </List.Item>
                <List.Item>
                  <Progress type="circle" strokeColor='#0070A9' percent={savingsPercent} />
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