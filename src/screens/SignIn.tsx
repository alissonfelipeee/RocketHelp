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
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate } = useNavigation();
  const { colors } = useTheme();

  function handleSingUp() {
    navigate("SignUp");
  }

  function handleSignIn() {
    if (!email || !password)
      return Alert.alert("Entrar", "Informe o e-mail e senha.");

    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        notifyAuthError("Entrar", error.code);
      });
    setIsLoading(false);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} bg="gray.600">
        <KeyboardAvoidingView behavior="position" enabled>
          <VStack alignItems="center" px={8} pt={24}>
            <Logo />
            <Heading color="gray.100" fontSize="xl" mt={16} mb={6}>
              Acesse sua conta
            </Heading>
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
              InputLeftElement={
                <Icon as={<Key color={colors.gray[300]} />} ml={4} />
              }
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <Button
              title="Entrar"
              w="full"
              mt={8}
              isLoading={isLoading}
              isDisabled={!(email && password)}
              onPress={handleSignIn}
            />
            <Button
              title="Criar sua conta"
              variant="secondary"
              my={4}
              w="full"
              onPress={handleSingUp}
            />
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
}
