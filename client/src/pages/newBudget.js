import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Tooltip, Icon, DatePicker, InputNumber, message, notification, Slider } from 'antd';
import NavBar from '../components/navBar';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import isEmpty from 'lodash';

function NewBudget() {
  const { MonthPicker } = DatePicker
  const { user, updateUser, token } = useContext(UserContext);
  const [totalIncome, setTotalIncome] = useState('');
  const [transportation, setTransportation] = useState(15);
  const [housing, setHousing] = useState(35);
  const [expenses, setExpenses] = useState(25);
  const [debt, setDebt] = useState(15);
  const [savings, setSavings] = useState(10);
  const [month, setMonth] = useState('');
  const { refresh, loading } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  let total = housing + transportation + expenses + debt + savings;

  useEffect(() => {
    if (!isEmpty(user)) return;
    refresh();
  });

  function clearFields() {
    setTotalIncome('');
  }

  function submitBudget() {
    const updatedUser = {
      _id: user._id,
      username: user.username,
      budgets: [
        ...user.budgets,
        {
          month,
          totalIncome,
          categories: { housing, transportation, expenses, debt, savings },
          transactions: []
        }
      ]
    };
    fetch(`${Config.websiteServiceUrl}budget`, {
      method: `PATCH`,
      headers: {
        "Content-Type": "application/JSON",
        "x-auth-token": token
      },
      body: JSON.stringify(updatedUser)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.msg);
        }
        updateUser(updatedUser);
        message.success('Your new budget was added');
        clearFields();
      })
      .catch(err => {
        notification.open(err);
      });
  }

  function checkPercentages() {
    if (total !== 100) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  function monthChange(_, dateString) {
    setMonth(dateString);
  }

  function totalIncomeChange(value) {
    setTotalIncome(value);
  }

  function housingChange(value) {
    setHousing(value);
  }

  function transportationChange(value) {
    setTransportation(value);
  }

  function expenseChange(value) {
    setExpenses(value);
  }

  function savingsChange(value) {
    setSavings(value);
  }

  function debtChange(value) {
    setDebt(value);
  }

  return (
    <>
      {loading ?
        <h1>Loading...</h1> :
        <>
          <NavBar />
          <div className='main-content'>
            <h1>Create a New Budget</h1>
            <Form layout='vertical' className='styled-form'>
              <Form.Item
                label={
                  <span>
                    Month&nbsp;
                <Tooltip title="Which month will this budget be for?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>}
              >
                <MonthPicker style={{ width: '100%' }} format={'MMMM YYYY'} placeholder="Select month" onChange={monthChange} />
              </Form.Item>
              <Form.Item
                label={
                  <span>
                    Total Household Income&nbsp;
                <Tooltip title="How much money will your household recieve this month?">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  defaultValue={0}
                  value={totalIncome}
                  onChange={totalIncomeChange}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
              <h1>Your Big 5 Categories</h1>
              <h3>We suggest that you stick to the suggested percentages as best you can, but obviously that isn't always possible for every individual.</h3>
              <h3>Here you can adjust the budget to fit your current situation better.</h3>

              <h2>Housing ({housing}%): ${Math.floor(totalIncome * (housing / 100))}</h2>
              <Slider defaultValue={35} onChange={housingChange} onAfterChange={checkPercentages} />

              <h2>Transportation ({transportation}%): ${Math.floor(totalIncome * (transportation / 100))}</h2>
              <Slider defaultValue={15} onChange={transportationChange} onAfterChange={checkPercentages} />

              <h2>Expenses ({expenses}%): ${Math.floor(totalIncome * (expenses / 100))}</h2>
              <Slider defaultValue={25} onChange={expenseChange} onAfterChange={checkPercentages} />

              <h2>Debt ({debt}%): ${Math.floor(totalIncome * (debt / 100))}</h2>
              <Slider defaultValue={15} onChange={debtChange} onAfterChange={checkPercentages} />

              <h2>Savings ({savings}%): ${Math.floor(totalIncome * (savings / 100))}</h2>
              <Slider defaultValue={10} onChange={savingsChange} onAfterChange={checkPercentages} />

              {disabled ? <h2 style={{ color: 'red' }}>Total Allocated: {total}%</h2> : ''}
              <Button htmlType="submit" disabled={disabled} className="login-form-button" onClick={() => submitBudget()}>
                Submit
              </Button>
            </Form>
          </div>
        </>
      }
    </>
  )
}

export default NewBudget;