import { useEffect, useRef, useState } from 'react';
import { Field } from './components/field';
import {
	emailValidator,
	passwordMinValidator,
	passwordSymbolsValidator,
} from './valodators';
import styles from './app.module.css';

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordcheck, setPasswordcheck] = useState('');

	const [isEmailValid, setIsEmailValid] = useState(false);
	const [isPasswordValid, setIsPasswordValid] = useState(false);
	const [isPasswordcheckValid, setIsPasswordcheckValid] = useState(false);

	const submitButtonRef = useRef(null);

	const onSubmit = (event) => {
		event.preventDefault();
		console.log({ email, password });
	};

	const isFormValid = isEmailValid && isPasswordValid && isPasswordcheckValid;

	useEffect(() => {
		if (isFormValid) {
			submitButtonRef.current.focus();
		}
	}, [isFormValid]);

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<Field
					type="text"
					name="email"
					placeholder="Почта"
					value={email}
					setValue={setEmail}
					setIsValid={setIsEmailValid}
					validators={[emailValidator]}
				/>
				<Field
					type="password"
					name="password"
					placeholder="Пароль"
					value={password}
					setValue={setPassword}
					setIsValid={setIsPasswordValid}
					validators={[passwordMinValidator, passwordSymbolsValidator]}
				/>
				<Field
					type="password"
					name="passwordcheck"
					placeholder="Повтор пароля"
					value={passwordcheck}
					setValue={setPasswordcheck}
					setIsValid={setIsPasswordcheckValid}
					validators={[
						(value) => (value === password ? null : 'Пароли не совпадают'),
					]}
					dependencies={{ password }}
					forceValidation={(value) => value.length > 0}
				/>
				<button type="submit" disabled={!isFormValid} ref={submitButtonRef}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
