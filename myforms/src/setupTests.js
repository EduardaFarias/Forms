// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './components/Form';

test("Os campos atualizam corretamente", () =>{
    render(<Form/>)
    const inputName = screen.getByPlaceholderText("Nome");
    fireEvent.change(inputName, {target: {value: "Jõao"}});
    expect(inputName.value).toBe("Jõao")


    const inputEmail = screen.getByPlaceholderText("Email");
    fireEvent.change(inputEmail, {target:{value:"joao@gmail.com"}})
    expect(inputEmail.value).toBe('joao@gmail.com')
    expect(inputEmail.value).to
})

test("Exibe mensagem de erro caso os campos estejam vazios", () =>{
    render(<Form/>)
    const inputName = screen.getByPlaceholderText("Nome");
    fireEvent.change(inputName, {target: {value: ""}});
    fireEvent.blur(inputName); // Simula o usuário saindo do campo
    expect(screen.getByText("Todos os campos devem ser preenchidos")).toBeInTheDocument();
})

test("Exibe Mensagem de erro caso a senha seja menor que 6", () =>{
    render(<Form/>)
    const inputPassword = screen.getByPlaceholderText("Password");
    fireEvent.change(inputPassword, {target: {value: 1234}})
    fireEvent.blur(inputPassword);
    expect(screen.getByText("A senha deve conter no mínimo 6 digitos")).toBeInTheDocument();
})

test("Exibe mensagem de erro quando as senhas não coicidem",() =>{
    render(<Form/>)
    const inputPassword = screen.getByPlaceholderText("Password");
    fireEvent.change(inputPassword, {target: {value: 123456}});
    fireEvent.blur(inputPassword);
    const inputPasswordConfirmation = screen.getByPlaceholderText("Password Confirmation");
    fireEvent.change(inputPasswordConfirmation, {target: {value: 12345678}});
    fireEvent.blur(inputPasswordConfirmation);
    expect(screen.getByText("As senhas não coincidem")).toBeInTheDocument();
})


test("O botão de cadastrar é desabilitado enquanto os campos não são preenchidos corretamente", () =>{
    render(<Form/>)
    const nameInput = screen.getByPlaceholderText("Nome");
    const emailInput = screen.getByPlaceholderText("Email");
    const formButton = screen.getByText("Cadastrar");

    fireEvent.change(nameInput, {target: {value:""}});
    fireEvent.change(emailInput, {target:{value:"fulainho@gmail"}})
    expect(formButton).toBeDisabled();
});

test("O botão cadastar só é habilitado quando todos os campos forem preenchidos corretamente", () => {
    render(<Form/>)
    const nameInput = screen.getByPlaceholderText("Nome") ;
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmationIput = screen.getByPlaceholderText("Password Confirmation");
    const buttonForm = screen.getByText("Cadastrar");

    fireEvent.change(nameInput, {target:{value: "Eduarda"}})
    fireEvent.change(emailInput, {target:{value: "maria@email.com"}})
    fireEvent.change(passwordInput, {target:{value:1234567}})
    fireEvent.change(passwordConfirmationIput, {target:{ value:1234567}})
    expect(buttonForm).toBeEnabled();
})


test("Limpando o formulário após cadastro bem sucedido", () =>{
    render(<Form/>);
    const nameInput = screen.getByPlaceholderText("Nome");
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput =  screen.getByPlaceholderText("Password");
    const passwordConfirmationIput = screen.getByPlaceholderText("Password Confirmation");
    const buttonForm = screen.getByText("Cadastrar")
    fireEvent.change(nameInput, {target:{value: "Livia Siqueira"}})
    fireEvent.change(emailInput, {target:{value: "livia@gmail.com"}})
    fireEvent.change(passwordInput, {target:{value:"bts123"}})
    fireEvent.change(passwordConfirmationIput, {target:{value:"bts123"}})
    fireEvent.click(buttonForm)

    // Como foi o cadastro foi bem sucedido
    expect(nameInput.value).toBe("");
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
    expect(passwordConfirmationIput.value).toBe("");

});