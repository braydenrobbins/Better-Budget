import React, { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import NavBar from '../components/navBar';
import { Progress, List, Button } from 'antd';
import moment from 'moment';

function Budget() {
  // const { user, updateUser } = useContext(UserContext);
  const [budgetSelected, setBudgetSelected] = useState(0);

  const user = {
    name: 'test',
    email: 'brayden.robbins@ruralsourcing.com',
    transactions: [
      {
        amount: 8.98,
        merchant: 'Chick-Fil-A',
        category: 'Food',
        date: Date
      }
    ],
    budgets: [
      {
        month: 'January 2020',
        categories: { 'Food': 500, 'Rent': 750, 'Car Insurance': 378 }
      },
      {
        month: 'December 2019',
        categories: { 'Food': 550, 'Rent': 750, 'Car Insurance': 378 }
      },
      {
        month: 'November 2019',
        categories: { 'Food': 500, 'Rent': 800, 'Car Insurance': 378 }
      },
    ]
  }
  const currentMonth = user.budgets[budgetSelected].month === moment().format('MMMM YYYY');

  function previousMonth() {
    setBudgetSelected(budgetSelected + 1);
  }
  function nextMonth() {
    setBudgetSelected(budgetSelected - 1);
  }

  const allCategories = Object.keys(user.budgets[budgetSelected].categories)
  const filteredCategories = allCategories.filter((category, index) => allCategories.indexOf(category) === index)

  return (
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
          percent={20}
        />
        <h2>{user.budgets[budgetSelected].month}</h2>
        <Button onClick={() => previousMonth()}>Previous Month</Button>
        <Button disabled={currentMonth} onClick={() => nextMonth()}>Next Month</Button>
        <List
          grid={{ column: 3, row: 3 }}
          bordered={true}
          itemLayout='vertical'
          className='categories-list'
          dataSource={filteredCategories}
          renderItem={category => (
            <List.Item>
              <Progress type="circle" strokeColor='#0070A9' percent={20} />
              <h2>{category}</h2>
            </List.Item>
          )}
        />
      </div>
    </>
  )
}

export default Budget;