import React, { useState, useContext } from 'react';
import { Form, Input, Button, Tooltip, Icon, DatePicker, InputNumber, message, notification, Tag } from 'antd';
import NavBar from '../components/navBar';
import Config from '../config/app.local.config';
import { UserContext } from '../contexts/UserContext';

function NewBudget() {
  const { user, updateUser, token } = useContext(UserContext);
  const { MonthPicker } = DatePicker;
  const [month, setMonth] = useState();
  const [totalExpenditure, setTotalExpenditure] = useState('');
  const [category, setCategory] = useState('');
  const [categoryExpense, setCategoryExpense] = useState('');
  const [tags, setTags] = useState([]);

  function clearFields() {
    setMonth('');
    setTotalExpenditure('');
    setCategory('');
    setCategoryExpense('');
    setTags('');
  }

  function addCategory() {
    const categoryString = ` ${category}: ${categoryExpense} `;
    setTags([...tags, categoryString]);
    setCategory('');
    setCategoryExpense('');
  }

  function deleteCategoryTag(removedTag) {
    const updatedTags = tags.filter(tag => tag !== removedTag);
    setTags(updatedTags);
  }

  function submitBudget() {
    const categoryArray = tags.map(t => eval(`({${t}})`));
    const newBudget = { username: user.username, month, totalExpenditure, categoryArray };
    console.log(newBudget);
    fetch(`${Config.websiteServiceUrl}budget`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/JSON",
        "x-auth-token": token
      },
      body: JSON.stringify(newBudget)
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.msg);
        }
        message.success('Your helicopter was saved!');
        clearFields();
      })
      .catch(err => {
        notification.open(err);
      });
  }

  function monthChange(date, dateString) {
    setMonth(dateString);
  }

  function totalExpenditureChange(value) {
    setTotalExpenditure(value);
  }

  function categoryExpenseChange(value) {
    setCategoryExpense(value);
  }

  return (
    <>
      <NavBar />
      <div className='main-content'>
        <h1>Create a New Budget</h1>
        <Form layout='vertical' className='styled-form'>
          <Form.Item
            label={
              <span>
                Month&nbsp;
                <Tooltip title="What month will this budget be for?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>}
          >
            <MonthPicker style={{ width: '100%' }} placeholder="Select month" onChange={monthChange} />
          </Form.Item>
          <Form.Item
            label={
              <span>
                Total Predicted Expenditure&nbsp;
                <Tooltip title="How much money will you spend or save this month in total?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>}
          >
            <InputNumber
              style={{ width: '100%' }}
              defaultValue={0}
              value={totalExpenditure}
              onChange={totalExpenditureChange}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>
          <h1>Divide up your Total Predicted Expenditure</h1>
          <Form.Item style={{ marginBottom: 0 }} >
            <Form.Item
              style={{ width: '44%', display: 'inline-block', marginRight: '2%' }}
              label={
                <span>
                  Category&nbsp;
                    <Tooltip title="Break up your monthly spending into categories e.g. mortgage, food, water etc.">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>}
            >
              <Input value={category} onChange={e => setCategory(e.target.value)} />
            </Form.Item>
            <Form.Item label='Planned Amount(USD)' style={{ width: '44%', display: 'inline-block' }}>
              <InputNumber
                style={{ width: '100%' }}
                defaultValue={0}
                value={categoryExpense}
                onChange={categoryExpenseChange}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
            <Form.Item style={{ width: '10%', display: 'inline-block', marginTop: '3vh' }}>
              <Button onClick={() => addCategory()} icon='plus-circle' type='primary'>Add</Button>
            </Form.Item>
          </Form.Item>
          <h1>Current Categories</h1>
          {tags.map(c => <Tag key={c} closable onClose={e => deleteCategoryTag(c)} >{c}</Tag>)}
          <br />
          <br />
          <Button htmlType="submit" className="login-form-button" onClick={() => submitBudget()}>
            Submit
            </Button>
        </Form>
      </div>
    </>
  )
}

export default NewBudget;