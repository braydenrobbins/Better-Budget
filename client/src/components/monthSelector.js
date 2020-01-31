import React, { useContext, useState, useEffect } from 'react';
import { Button } from 'antd';
import { UserContext } from '../contexts/UserContext';

function MonthSelector() {
  const { currentMonth, updateCurrentMonth, updateCurrentBudget, currentBudget, budgets } = useContext(UserContext);
  const [sortedMonths, setSortedMonths] = useState([]);
  useEffect(() => {
    sortMonths()
  }, []);

  const monthIndex = sortedMonths.findIndex(month => month === currentMonth);
  const first = monthIndex === 0 ? true : false;
  const last = monthIndex === budgets.length - 1 ? true : false;

  const monthNames = {
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12
  };

  function sortMonths() {
    const budgetMonths = budgets ? budgets.map(budget => budget.month) : '';
    setSortedMonths(budgets ? budgetMonths.sort((a, b) => monthNames[budgetMonths[a.split(' ')[0]]] - monthNames[budgetMonths[b.split(' ')[0]]]) : '');
  }

  function previousMonth() {
    updateCurrentBudget(currentBudget + 1);
  }

  function nextMonth() {
    updateCurrentBudget(currentBudget - 1);
  }

  return (
    <div>
      <Button disabled={first} onClick={() => previousMonth()}>{`<`}</Button>
      <span>{currentMonth}</span>
      <Button disabled={last} onClick={() => nextMonth()}>></Button>
    </div>
  )
}

export default MonthSelector;