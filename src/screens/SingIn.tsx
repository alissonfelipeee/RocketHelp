import { useState } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import Logo from "../assets/logo_primary.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Envelope, Key } from "phosphor-react-native";
import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { notifyAuthError } from "../helpers/authErros";

export function SingIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password)
      return Alert.alert("Entrar", "Informe o e-mail e senha.");

    setIsLoading(false);
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        notifyAuthError(error.code);
      });
    setIsLoading(false);
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
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
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
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
    </VStack>
  );
}
