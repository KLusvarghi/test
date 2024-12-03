import { useState } from "react";

export const types = {
  number: {
    // só aceita numero
    regex: /^\d+$/,
    message: "Apenas numeros são permitidos",
  },
  name: {
    // Nome com mais de 3 caracteres e apenas letras (pode incluir espaços para nomes compostos)
    regex: /^[A-Za-z\s]{3,}$/,
    message: "Precisa ter mais que 3 caracteres e apenas letras",
  },
  email: {
    // E-mail no formato típico (algo@dominio.com)
    regex: /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
    message: "Insira um email válido",
  },
  phone: {
    // Número de telefone com ou sem código de área, permitindo espaço, hífen ou parênteses
    regex: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
    message: "Insira um número de telefone válido",
  },
  text: {
    // Texto com pelo menos 5 caracteres
    regex: /^.{5,}$/,
    message: "Texto muito curto",
  },
  date: {
    // Texto com pelo menos 5 caracteres
    regex: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
    message: "Data inváldia",
  },
};

interface IFormProps {
  type?: keyof typeof types;
}

// Hook de form, afim de facilitar a validação de de inputs
const useForm = (type?: IFormProps["type"]) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<null | string>(null);

  // Função que valida o valor inserido no input conforme o type informado
  function validate(value: string | number | boolean) {
    const inputValue = value.toString();
    if (type) {
      if (inputValue.length === 0) {
        setError("Preencha um valor");
        return null;
      } else if (!types[type].regex.test(inputValue)) {
        setError(types[type].message);
        return false;
      } else {
        setError(null);
        return true;
      }
    }
    return true;
  }
  // Função responsavel por mudar o valor ao digitar no campo
  function onChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { value } = event.target;
    setValue(value);
    if (error) validate(value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
