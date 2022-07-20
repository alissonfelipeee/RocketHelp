import { Alert } from "react-native";

export function notifyAuthError(errorCode: string) {
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
  ];

  for (let i = 0; i < errorCodes.length; i++) {
    if (errorCode.includes(errorCodes[i].error)) {
      return Alert.alert("Entrar", errorCodes[i].message);
    }
  }
  return Alert.alert("Entrar", "Não foi possível acessar.");
}
