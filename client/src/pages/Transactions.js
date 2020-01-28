import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, InputNumber, Table, Modal, Radio, DatePicker, notification, message } from 'antd';
import NavBar from '../components/navBar';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import moment from 'moment';

function Transactions() {
  const { user, updateUser, transactions, currentBudget, budgets, currentMonth } = useContext(UserContext);
  const { refresh, loading } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [merchant, setMerchant] = useState('');

  useEffect(() => {
    refresh();
    console.log('firing');
  }, []);

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
    const budgetMonths = budgets.map(budget => budget.month);
    const sortedMonths = budgetMonths.sort((a, b) => monthNames[budgetMonths[a.split(' ')[0]]] - monthNames[budgetMonths[b.split(' ')[0]]]);
    console.log(sortedMonths);
  }

  function addTransaction() {
    const budgetsWithoutCurrentBudget = budgets.filter(budget => budget.month !== currentMonth);
    setVisible(false);
    const updatedUser = {
      _id: user._id,
      username: user.username,
      budgets: [
        ...budgetsWithoutCurrentBudget,
        {
          ...currentBudget,
          transactions: [
            ...currentBudget.transactions,
            { date, amount, merchant, category }
          ]
        }
      ]
    };
    fetch(`${Config.websiteServiceUrl}budget`, {
      method: `PATCH`,
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(updatedUser)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.msg);
        }
        updateUser(updatedUser);
        message.success('Your new budget was added');
      })
      .catch(err => {
        notification.open(err);
      });
  }

  function showModal() {
    setVisible(true);
  }

  function onCancel() {
    setVisible(false);
  }

  function dateChange(_, dateString) {
    setDate(dateString);
  }

  function amountChange(value) {
    setAmount(value);
  }

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
  ];

  return (
    <>
      {loading ?
        <h1>Loading...</h1> :
        <>
          <NavBar />
          <div className='main-content'>
            <h1>Transactions</h1>
            <div>
              <Button>{`<`}</Button>
              <span>{currentMonth}</span>
              <Button>></Button>
            </div>
            <Button onClick={showModal} >Add Transaction</Button>
            <Table dataSource={transactions} columns={columns} />
            <Modal
              visible={visible}
              title="Create a new transaction"
              okText="Add"
              onCancel={onCancel}
              onOk={addTransaction}
            >
              <Form layout="vertical">
                <Form.Item label="Date">
                  <DatePicker style={{ width: "100%" }} format="DD MMMM YYYY" onChange={dateChange} />
                </Form.Item>
                <Form.Item label="Amount">
                  <InputNumber
                    style={{ width: '100%' }}
                    defaultValue={0}
                    value={amount}
                    onChange={amountChange}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
                <Form.Item label="Merchant">
                  <Input onChange={e => setMerchant(e.target.value)} />
                </Form.Item>
                <Form.Item label="Category">
                  <Radio.Group onChange={e => setCategory(e.target.value)}>
                    <Radio value='Housing'>Housing</Radio>
                    <Radio value='Transportation'>Transportation</Radio>
                    <Radio value='Expenses'>Expenses</Radio>
                    <Radio value='Debt'>Debt</Radio>
                    <Radio value='Savings'>Savings</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </>
      }
    </>
  )
}

export default Transactions;