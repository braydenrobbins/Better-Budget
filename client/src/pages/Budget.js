import React, { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Progress, Button, List } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import MonthSelector from '../components/monthSelector';

function Budget() {
  let isEmpty = require('lodash/isEmpty');
  const { transactions, currentBudget } = useContext(UserContext);
  const { refresh, loading } = useContext(AuthContext);
  let housingAmount = '';
  let transportationAmount = '';
  let expensesAmount = '';
  let debtAmount = '';
  let savingsAmount = '';

  useEffect(() => {
    refresh();
  }, []);

  if (!isEmpty(transactions)) {
    const housingTransactions = transactions.filter(transaction => transaction.category === 'Housing');
    if (!isEmpty(housingTransactions)) {
      housingAmount = housingTransactions.map(transaction => transaction.amount).reduce((a, b) => a + b);
    }

    const transportationTransactions = transactions.filter(transaction => transaction.category === 'Transportation');
    if (!isEmpty(transportationTransactions)) {
      transportationAmount = transportationTransactions.map(transaction => transaction.amount).reduce((a, b) => a + b);
    }

    const expensesTransactions = transactions.filter(transaction => transaction.category === 'Expenses');
    if (!isEmpty(expensesTransactions)) {
      expensesAmount = expensesTransactions.map(transaction => transaction.amount).reduce((a, b) => a + b);
    }

    const debtTransactions = transactions.filter(transaction => transaction.category === 'Debt');
    if (!isEmpty(debtTransactions)) {
      debtAmount = debtTransactions.map(transaction => transaction.amount).reduce((a, b) => a + b);
    }

    const savingsTransactions = transactions.filter(transaction => transaction.category === 'Savings');
    if (!isEmpty(savingsTransactions)) {
      savingsAmount = savingsTransactions.map(transaction => transaction.amount).reduce((a, b) => a + b);
    }
  }

  let totalAmount = housingAmount + transportationAmount + expensesAmount + debtAmount + savingsAmount;

  return (
    <>
      {loading ?
        <h1>Loading...</h1> :
        <>
          <NavBar />
          <div className='main-content'>
            <h1>Your Budgets</h1>
            <MonthSelector />
            <h2>Total Amount Spent</h2>
            <h3>${totalAmount} of ${currentBudget.totalIncome}</h3>
            <Progress
              type="circle"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
              percent={Math.floor((totalAmount / currentBudget.totalIncome) * 100)}
            />
            <List
              grid={{ column: 3 }}
              bordered={true}
              itemLayout='vertical'
              className='categories-list'
            >
              <List.Item>
                <h2>Housing({currentBudget.categories?.housing}%)</h2>
                <h3>${housingAmount || 0} of ${(currentBudget.categories?.housing / 100) * currentBudget.totalIncome}</h3>
                <Progress type="circle" strokeColor='#0070A9' percent={Math.floor(housingAmount / ((currentBudget.categories?.housing / 100) * currentBudget.totalIncome) * 100)} />
              </List.Item>
              <List.Item>
                <h2>Transportation({currentBudget.categories?.transportation}%)</h2>
                <h3>${transportationAmount || 0} of ${(currentBudget.categories?.transportation / 100) * currentBudget.totalIncome}</h3>
                <Progress type="circle" strokeColor='#0070A9' percent={Math.floor(transportationAmount / ((currentBudget.categories?.transportation / 100) * currentBudget.totalIncome) * 100)} />
              </List.Item>
              <List.Item>
                <h2>Expenses({currentBudget.categories?.expenses}%)</h2>
                <h3>${expensesAmount || 0} of ${(currentBudget.categories?.expenses / 100) * currentBudget.totalIncome}</h3>
                <Progress type="circle" strokeColor='#0070A9' percent={Math.floor(expensesAmount / ((currentBudget.categories?.expenses / 100) * currentBudget.totalIncome) * 100)} />
              </List.Item>
              <List.Item>
                <h2>Debt({currentBudget.categories?.debt}%)</h2>
                <h3>${debtAmount || 0} of ${(currentBudget.categories?.debt / 100) * currentBudget.totalIncome}</h3>
                <Progress type="circle" strokeColor='#0070A9' percent={Math.floor(debtAmount / ((currentBudget.categories?.debt / 100) * currentBudget.totalIncome) * 100)} />
              </List.Item>
              <List.Item>
                <h2>Savings({currentBudget.categories?.savings}%)</h2>
                <h3>${savingsAmount || 0} of ${(currentBudget.categories?.savings / 100) * currentBudget.totalIncome} </h3>
                <Progress type="circle" strokeColor='#0070A9' percent={Math.floor(savingsAmount / ((currentBudget.categories?.savings / 100) * currentBudget.totalIncome) * 100)} />
              </List.Item>
            </List>
          </div>
        </>
      }
    </>
  )
}

export default Budget;