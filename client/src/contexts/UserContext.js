import React, { createContext, useState } from 'react';
import moment from 'moment';

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState('');
  const [budgets, setBudgets] = useState('');
  const [currentBudget, setCurrentBudget] = useState('');
  const [currentMonth, setCurrentMonth] = useState(moment().format('MMMM YYYY'));

  function updateTransactions(updatedTransactions) {
    setTransactions(updatedTransactions);
  }

  function updateBudgets(updatedBudgets) {
    setBudgets(updatedBudgets);
  }

  function updateCurrentBudget(updatedCurrentBudget) {
    setCurrentBudget(updatedCurrentBudget);
  }

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  function updateCurrentMonth(updatedCurrentMonth) {
    setCurrentMonth(updatedCurrentMonth);
  }


  return (
    <UserContext.Provider value={{ user, updateUser, transactions, budgets, currentBudget, updateTransactions, updateBudgets, updateCurrentBudget, currentMonth, updateCurrentMonth }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
