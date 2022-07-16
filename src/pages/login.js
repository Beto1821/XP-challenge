import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { func, string } from 'prop-types';
import { saveUser } from '../redux/actions/index';
import verifyValidation from '../validations/validateEmail';
import { useHistory } from 'react-router-dom';

const INITIAL_STATE = {
    inputEmail: '',
    inputPassword: '',
    disabled: true,
  }

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [userData, setUserData] = useState(INITIAL_STATE);

  const handleInput = ({ target: { name, value } }) => {
    setUserData(
      { [name]: value },
      () => setUserData({ disabled: verifyValidation(userData) }),
    );
  }

  const handleClick = () => {
    const { inputEmail } = userData;
    dispatch(saveUser(inputEmail))
    history.push('/carteira');
  }

  const handleEnterClick = (event) => {
    if (event.key === 'Enter') return handleClick();
  }

  const { inputEmail, inputPassword, disabled } = userData;

  return (
    <div>
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
                onClick={ handleClick }
            >
            Voltar
            </button>
            <button
                type="button"
                onClick={ handleClick }
                disabled={ disabled }
            >
            Entrar
            </button>
        </div>
    </div>
    </div>);
}

Login.propTypes = {
  history: string.isRequired,
  login: func.isRequired,
};

export default Login;
