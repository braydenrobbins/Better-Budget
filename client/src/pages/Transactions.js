import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, InputNumber, Table, Modal, Radio, DatePicker, notification, message } from 'antd';
import NavBar from '../components/navBar';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';
import { AuthContext } from '../contexts/AuthContext';
import moment from 'moment';
import isEmpty from 'lodash';

function Transactions() {
  const { user, updateUser } = useContext(UserContext);
  const { refresh, loading, loggedIn } = useContext(AuthContext);
  const [month, setMonth] = useState(moment().format('MMMM YYYY'));
  const [transactions, setTransactions] = useState('');
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [merchant, setMerchant] = useState('');
  let currentBudget = {};

  useEffect(() => {
    if (isEmpty(user)) {
      refresh();
    }
    currentBudget = user.budgets.find(budget => budget.month === month)[0];
    setTransactions([...currentBudget.transactions]);
  }, []);

  function addTransaction() {
    const updatedUser = {
      _id: user._id,
      username: user.username,
      budgets: [
        ...user.budgets,
        {
          ...currentBudget,
          transactions: [
            ...currentBudget.transactions,
            { date, amount, merchant, category }
          ]
        }
      ]
    };
    fetch(`${Config.websiteServiceUrl}transaction`, {
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

  function handleOk() {
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
              <span>{month}</span>
              <Button>></Button>
            </div>
            <Button onClick={showModal} >Add Transaction</Button>
            <Table dataSource={transactions} columns={columns} />
            <Modal
              visible={visible}
              title="Create a new transaction"
              okText="Add"
              onCancel={onCancel}
              onOk={handleOk}
            >
              <Form layout="vertical">
                <>
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
                    <Input value={merchant} onChange={e => setMerchant(e.target.value(e))} />
                  </Form.Item>
                  <Form.Item label="Category">
                    <Radio.Group onChange={e => setCategory(e.target.value)} value={category}>
                      <Radio value='Housing'>Housing</Radio>
                      <Radio value='Transportation'>Transportation</Radio>
                      <Radio value='Expenses'>Expenses</Radio>
                      <Radio value='Debt'>Debt</Radio>
                      <Radio value='Savings'>Savings</Radio>
                    </Radio.Group>
                  </Form.Item>
                </>
              </Form>
            </Modal>
          </div>
        </>
      }
    </>
  )
}

export default Transactions;