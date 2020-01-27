// import React, { useState, useEffect, useContext } from 'react';
// import { Form, Input, Button, Tooltip, Icon, DatePicker, InputNumber, message, notification, Tag } from 'antd';
// import NavBar from '../components/navBar';
// import Config from '../config/app.local.config';
// import { UserContext } from '../contexts/UserContext';
// import { AuthContext } from '../contexts/AuthContext';

// function Transactions() {
//   const { user, updateUser, token } = useContext(UserContext);
//   const { refresh, loading, loggedIn } = useContext(AuthContext);

//   useEffect(() => {
//     refresh();
//   }, [])

//   function clearFields() {

//   }

//   return (
//     <>
//       {loading ?
//         <h1>Loading...</h1> :
//         <>
//           <NavBar />
//           <div className='main-content'>
//             <h1>Transactions</h1>
//             <Form layout='vertical' className='styled-form'>
//               <Form.Item
//                 label={
//                   <span>
//                     Month&nbsp;
//                 <Tooltip title="What month will this budget be for?">
//                       <Icon type="question-circle-o" />
//                     </Tooltip>
//                   </span>}
//               >
//               </Form.Item>
//               <Button htmlType="submit" className="login-form-button" onClick={() => submitBudget()}>
//                 Submit
//             </Button>
//             </Form>
//           </div>
//         </>
//       }
//     </>
//   )
// }

// export default Transactions;