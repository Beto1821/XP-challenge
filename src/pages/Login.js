import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/actions/index';
import verifyValidation from '../validations/validateEmail';
import { useHistory } from 'react-router-dom';
import { addAcessUserToLocal } from '../services/localStorage';
import { verifyExistence } from '../services/verifyExistenceUser';

const INITIAL_STATE = {
  inputEmail: '',
  inputPassword: '',
}

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState(INITIAL_STATE);
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    if(verifyValidation(userData)) {
      setDisableButton(false);
      return;
    }
    setDisableButton(true);
  }, [userData]);
  
  const handleInput = ({ target: { name, value } }) => {
    setUserData(prev => ({...prev, [name]: value }));
  }

  const handleClick = () => {
    const { inputEmail } = userData;
    dispatch(saveUser(inputEmail));
    const findUser = verifyExistence(inputEmail);
    if (findUser) {
      addAcessUserToLocal({ ...findUser, lastAcess: new Date()});
      return history.push('/wallet');
    }
    history.push('/not-found');
  }

  const handleEnterClick = (event) => {
    if (event.key === 'Enter') return handleClick();
  }

  const { inputEmail, inputPassword } = userData;

  return (
    <div>
      <div>
        <h1>Acesse sua conta</h1>
      </div>
      <section>
        <input
          type="text"
          onChange={ handleInput }
          onKeyDown={ handleEnterClick }
          value={ inputEmail }
          name="inputEmail"
          placeholder="Email"
        />
        <input
          autoComplete="off"
          type="password"
          onChange={ handleInput }
          onKeyDown={ handleEnterClick }
          value={ inputPassword }
          name="inputPassword"
          placeholder="Senha"
        />
      </section>
      <div>
        <h1>OU</h1>
        <h2>Faça login como {}</h2>
      </div>
      <div>
        <button
            type="button"
            onClick={ () => history.push('/') }
        >
        Voltar
        </button>
        <button
            type="button"
            onClick={ handleClick }
            disabled={ disableButton }
        >
        Entrar
        </button>
      </div>
    </div>);
}

export default Login;
