import React, { useState, useContext, useEffect } from 'react';
import { Form, List, Button, Tooltip, Icon, DatePicker, InputNumber, message, notification, Tag, Slider } from 'antd';
import NavBar from '../components/navBar';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';

function NewBudget() {
  const { user, updateUser, token } = useContext(UserContext);
  const [totalIncome, setTotalIncome] = useState('');
  const [transportation, setTransportation] = useState('');
  const [housing, setHousing] = useState('');
  const [livingExpenses, setLivingExpenses] = useState('');
  const [debt, setDebt] = useState('');
  const [savings, setSavings] = useState('');
  const { refresh, loading, loggedIn } = useContext(AuthContext);

  useEffect(() => {
    refresh();
  }, [])

  function clearFields() {
    setTotalIncome('');
    setTransportation('');
    setHousing('');
    setLivingExpenses('');
    setDebt('');
    setSavings('');
  }

  function submitBudget() {
    const updatedUser = {
      _id: user._id,
      username: user.username,
      budgets: [
        ...user.budgets,
        {
          totalIncome,
          categories: { housing, transportation, livingExpenses, debt, savings },
          transactions: [...user.transactions]
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

  function totalIncomeChange(value) {
    setTotalIncome(value);
  }

  function housingChange(value) {
    setHousing(value);
  }

  function transportationChange(value) {
    setTransportation(value);
  }

  function livingExpenseChange(value) {
    setTotalIncome(value);
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
                    Total Household Income&nbsp;
                <Tooltip title="How much money will you make this month?">
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
              <h1>My Big 5</h1>
              <List>
                <List.Item>
                  <h1>Housing</h1>
                  <Slider defaultValue={35} onAfterChange={housingChange} />
                </List.Item>
                <List.Item>
                  <h1>Transportation</h1>
                  <Slider defaultValue={15} onAfterChange={transportationChange} />
                </List.Item>
                <List.Item>
                  <h1>Other Living Expenses</h1>
                  <Slider defaultValue={25} onAfterChange={livingExpenseChange} />
                </List.Item>
                <List.Item>
                  <h1>Debt Payoff</h1>
                  <Slider defaultValue={15} onAfterChange={debtChange} />
                </List.Item>
                <List.Item>
                  <h1>Savings</h1>
                  <Slider defaultValue={10} onAfterChange={savingsChange} />
                </List.Item>
              </List>

              <Button htmlType="submit" className="login-form-button" onClick={() => submitBudget()}>
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