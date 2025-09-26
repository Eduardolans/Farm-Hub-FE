import { useNavigate, Link } from 'react-router-dom';

import logic from '../logic';

import Field from '../components/core/Field/Field';
import Title from '../components/core/Title/Title';
import Button from '../components/core/Button/Button';
import useContext from '../useContext';

import './Register.css';
import { SystemError } from '../../com/errors';

function Register() {
    const navigate = useNavigate();

    const { alert } = useContext();

    const handleRegisterSubmit = (event) => {
        event.preventDefault();

        const form = event.target;

        const name = form.name.value;
        const surname = form.surname.value;
        const email = form.email.value;
        const username = form.username.value;
        const password = form.password.value;
        const passwordRepeat = form.passwordRepeat.value;

        try {
            logic
                .registerUser(
                    name,
                    surname,
                    email,
                    username,
                    password,
                    passwordRepeat
                )
                .then(() => {
                    navigate('/login');
                })
                .catch((error) => {
                    if (error instanceof SystemError) {
                        alert(error.message);

                        return;
                    }
                    alert(error.message);
                });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <Title className="text-4xl mt-6 mb-6 text-green-600">
                Farm-Hub
            </Title>

            <form className="RegisterForm" onSubmit={handleRegisterSubmit}>
                <Title>Register</Title>

                <Field id="name" type="text" placeholder="name">
                    Name
                </Field>

                <Field id="surname" type="text" placeholder="surname">
                    Surname
                </Field>

                <Field id="email" type="email" placeholder="name@example.com">
                    E-mail
                </Field>

                <Field id="username" type="text" placeholder="username">
                    Username
                </Field>

                <Field id="password" type="password" placeholder="password">
                    Password
                </Field>

                <Field
                    id="passwordRepeat"
                    type="password"
                    placeholder="password repeat"
                >
                    Password Repeat
                </Field>

                <Button type="submit">Register</Button>
            </form>
            <Link className="Link" to="/login">
                Login
            </Link>
        </div>
    );
}

export default Register;
