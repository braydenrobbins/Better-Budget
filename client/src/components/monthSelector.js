import React, { useContext } from 'react';
import { Select } from 'antd';
import { UserContext } from '../contexts/UserContext';

function MonthSelector() {
  const { Option } = Select;
  // const isEmpty = require('lodash/isEmpty');
  const { currentMonth, updateCurrentMonth, updateCurrentBudget, budgets, updateTransactions } = useContext(UserContext);

  function handleChange(value) {
    updateCurrentMonth(value);
    updateCurrentBudget(budgets.find(budget => budget.month === value));
    updateTransactions(budgets.find(budget => budget.month === value).transactions);
  }

  return (
    <div>
      <Select defaultValue={currentMonth} onChange={handleChange} className='month-selector'>
        {budgets ? budgets.map(budget => <Option valuie={budget.month} key={budget.month}>{budget.month}</Option>) : ''}
      </Select>
    </div>
  )
}

export default MonthSelector;