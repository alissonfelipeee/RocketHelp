import { Alert } from "react-native";

export function notifyAuthError(title: string, errorCode: string) {
  const errorCodes = [
    {
      error: "auth/internal-error",
      message: "Erro interno, por gentileza tente novamente mais tarde.",
    },
    {
      error: "auth/invalid-email",
      message: "O endereço de e-mail é invalido.",
    },
    {
      error: "auth/wrong-password",
      message: "E-mail ou senha inválida.",
    },
    {
      error: "auth/user-not-found",
      message: "E-mail ou senha inválida.",
    },
    {
      error: "auth/email-already-in-use",
      message: "O endereço e-mail informado já foi cadastrado.",
    },
    {
      error: "auth/requires-recent-login",
      message: "Para realizar esta ação, precisamos que o login seja feito novamente."
    }
  ];

  for (let i = 0; i < errorCodes.length; i++) {
    if (errorCode.includes(errorCodes[i].error)) {
      return Alert.alert(title, errorCodes[i].message);
    }
  }
  return Alert.alert(
    title,
    "Não foi possível realizar esta ação, tente novamente mais tarde."
  );
}
