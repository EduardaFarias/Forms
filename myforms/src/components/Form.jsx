import React, { useState, useEffect } from "react";
import "../styles/FormStyle.css"
// nome, email, senha, confirmar senha
// Recebo os dados
// Validar os dados recebidos nas entradas 
/**
 * - Entradas vazias
 * - Email: @
 * - senha: precisa de minimamente 6 dígitos 
 * - as senhas precisam coincidir 
 * BOTÃO:
 *  - Se tudo foi preenchido e está conforme os campos esperam (isValidForm)
 */
// Verificar se todos estão preenchidos 
// Fazer o cadastro

export default function Form() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const [erro, setErro] = useState({});
    const [isValidForm, setValidForm] = useState(false);
    const [isTouched, setTouched] = useState({});
    const [isSubmitted,setSubmitted ] = useState(false);


    const validate = () => {
        let newErros = {};
        if (!form.name || !form.email || !form.password || !form.passwordConfirmation) {
            newErros.geral = "Todos os campos devem ser preenchidos"
        }

        if (form.password.length < 6) {
            newErros.password = "A senha deve conter no mínimo 6 digitos"
        }

        if (form.password !== form.passwordConfirmation) {
            newErros.passwordConfirmation = "As senhas não coincidem"
        }

        setErro(newErros);
        setValidForm(Object.keys(newErros).length === 0);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleTouch = (e) => {
        setTouched({ ...isTouched, [e.target.name]: true })
    }

    const handleSubmit= (e) =>{
        e.preventDefault();
        validate();

        if(isValidForm){
            console.log("Cadastro realizado com sucesso", form);
            setSubmitted(true);


            // Limpeza do formulário
            setForm({
                name: "",
                email: "",
                password: "",
                passwordConfirmation: ""
            })
            setErro({});
            setTouched({});
        }
    }

    useEffect(() => {
        validate();
    }, [form])

    return (
        <div className="form-container">
            <h2>Form</h2>
            <input
                type="text"
                name="name"
                placeholder="Nome"
                value={form.name}
                onChange={handleChange}
                onBlur={handleTouch}
            />
            {isTouched.name && erro.geral && <p style={{ color: "red", fontSize: "12px" }}>{erro.geral}</p>}

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleTouch}
            />
            {isTouched.email && erro.geral && <p style={{ color: 'red', fontSize: '12' }}>{erro.geral}</p>}

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleTouch}
            />
            {isTouched.password && erro.password && <p style={{ color: "red", fontSize: "12px" }}>{erro.password}</p>}

            <input
                type="password"
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                value={form.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleTouch}
            />
            {isTouched.passwordConfirmation && erro.passwordConfirmation && <p style={{ color: "red", fontSize: "12px" }}>{erro.passwordConfirmation}</p>}

            <button
                disabled={!isValidForm} 
                onClick={handleSubmit}               
                >Cadastrar</button>
        </div>
    );
}