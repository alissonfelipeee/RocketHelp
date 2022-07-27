import { useState } from "react";
import {
  VStack,
  Heading,
  Icon,
  useTheme,
  KeyboardAvoidingView,
  Box,
} from "native-base";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Envelope, Key } from "phosphor-react-native";
import auth from "@react-native-firebase/auth";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { notifyAuthError } from "../helpers/authErros";
import { Header } from "../components/Header";

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { colors } = useTheme();

  function handleSingUp() {
    if (!email || !password || !confirmPassword)
      return Alert.alert("Registrar", "Preencha todos os campos.");

    if (password != confirmPassword)
      return Alert.alert("Registrar", "As senhas não combinam.");

    if (password.length < 6)
      return Alert.alert("Registrar", "A senha deve possuir 6 caracteres.");

    setIsLoading(false);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        userCredential.user.sendEmailVerification();
        Alert.alert(
          "Registrar",
          "A sua conta foi criada com sucesso e enviamos um e-mail de verificação."
        );
      })
      .catch((error) => {
        notifyAuthError("Registrar", error.code);
      });
    setIsLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} bg="gray.600">
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" bg="gray.600" px={8} pt={24}>
            <Logo />
            <Header title="Crie sua conta" />
            <Input
              placeholder="E-mail"
              marginBottom={4}
              InputLeftElement={
                <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={(text) => setEmail(text.trim())}
              value={email}
            />
            <Input
              placeholder="Senha"
              marginBottom={4}
              InputLeftElement={
                <Icon as={<Key color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <Input
              placeholder="Confirme a senha"
              InputLeftElement={
                <Icon as={<Key color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
            />
            <Button
              title="Criar sua conta"
              w="full"
              mt={8}
              isLoading={isLoading}
              isDisabled={!(email && password && confirmPassword)}
              onPress={handleSingUp}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
}
