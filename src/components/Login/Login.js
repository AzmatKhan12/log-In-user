import React, { useState ,useEffect,useReducer,useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../Store/Auth-contex';

const emailReducer = (state,action)=>{
  if(action.type === 'USER-INPUT'){
    return { value: action.val, isvalid: action.val.includes("@") };
  }
  if(action.type ==='INPUT-BLUR'){
    return { value: state.value, isvalid: state.value.includes("@") };
  }

  return {value: '',isvalid:false}
}

const passwordReducer =(state,action) =>{
   if(action.type === 'USER-INPUT'){
    return { value: action.val, isvalid: action.val.trim().length > 6 };
  }

  if(action.type ==='INPUT-BLUR'){
    return { value: state.value, isvalid: state.value.trim().length > 6 };
  }

  return {value: '',isvalid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

 const [emailState, dispacthEmail] = useReducer(emailReducer, {
   value: "",
   isvalid: null,
 });

 const [passwordState,dispatchPassword]=useReducer(passwordReducer,{
   value: "",
   isvalid: null,
 });

 const {isvalid: emailIsValid} = emailState;
 const {isvalid: passwordIsValid} = passwordState;
 const authCtx = useContext(AuthContext);
   
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 2000);

    return () => {
      console.log("clean-up");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);


  const emailChangeHandler = (event) => {
    dispacthEmail({ type: "USER-INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER-INPUT", val: event.target.value});
  };

  const validateEmailHandler = () => {
    dispacthEmail({type: 'INPUT-BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT-BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isvalid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
