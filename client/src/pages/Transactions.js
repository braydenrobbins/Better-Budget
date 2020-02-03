import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, InputNumber, Table, Modal, Radio, DatePicker, message } from 'antd';
import NavBar from '../components/navBar';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import MonthSelector from '../components/monthSelector';

function Transactions() {
  const { user, updateUser, transactions, currentBudget, budgets, currentMonth, updateTransactions } = useContext(UserContext);
  const { refresh, loading } = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [merchant, setMerchant] = useState('');

  useEffect(() => {
    refresh();
  }, []);

  function addTransaction() {
    const newTransaction = { date, amount, merchant, category };
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
            newTransaction
          ]
        }
      ]
    };
    fetch(`${Config.websiteServiceUrl}budget/transaction`, {
      method: `PATCH`,
      headers: {
        "Content-Type": "application/JSON"
      },
      body: JSON.stringify(updatedUser)
    })
      .then(res => {
        if (!res.ok) throw Error(res.msg);
      })
      .then(authUser => {
        updateUser(updatedUser);
        updateTransactions([newTransaction, ...transactions]);
        message.success('Your transaction was added');
      })
      .catch(err => {
        message.error(err);
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
            <MonthSelector />
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