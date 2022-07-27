import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import firestore, { firebase } from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  FlatList,
  FormControl,
  Heading,
  HStack,
  IconButton,
  KeyboardAvoidingView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import {
  ChatTeardropText,
  CircleWavyCheck,
  Hourglass,
  IdentificationBadge,
  SignOut,
  Trash,
} from "phosphor-react-native";
import { useEffect, useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

import Logo from "../assets/logo_secondary.svg";
import { Button } from "../components/Button";
import { Filter } from "../components/Filter";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Loading } from "../components/Loading";
import { Order, OrderProps } from "../components/Order";
import { notifyAuthError } from "../helpers/authErros";
import { dateFormat } from "../helpers/firestoreDateFormart";

type RouteParams = {
  user: FirebaseAuthTypes.User;
};

export function Profile() {
  const route = useRoute();
  const { user } = route.params as RouteParams;
  const { colors } = useTheme();
  const { goBack, navigate } = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState(user.displayName);
  const [email, setEmail] = useState(user.email);

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert(
          "Desconectar",
          "Não foi póssivel desconectar no momento, tente novamente mais tarde."
        );
      });
  }

  function handleUpdateProfile() {
    setIsLoading(true);
    if (name === user.displayName && email === user.email) {
      setIsLoading(false);
      return Alert.alert("Perfil", "Não há dados para alterar.");
    }

    if (name != user.displayName) {
      auth()
        .currentUser.updateProfile({
          displayName: name,
        })
        .then(() => {
          Alert.alert("Perfil", "Dados atualizados com sucesso.");
          goBack();
        })
        .catch((error) => {
          console.log(error);
          notifyAuthError("Perfil", error.code);
        });
    }

    if (email) {
      auth()
        .currentUser.updateEmail(email)
        .then(() => {
          auth().currentUser.sendEmailVerification();
          Alert.alert(
            "Perfil",
            "E-mail alterado com sucesso, por motivos de segurança, a sua sessão foi encerrada e enviamos um e-mail de verificação."
          );
          auth().signOut();
        })
        .catch((error) => {
          console.log(error);
          notifyAuthError("Perfil", error.code);
        });
    }
    setIsLoading(false);
  }

  function deleteAccount() {
    auth()
      .currentUser.delete()
      .then(() => {
        Alert.alert(
          "Perfil",
          "Sentimos muito que você deseja isso, a sua conta foi excluida com sucesso :("
        );
      })
      .catch((error) => {
        notifyAuthError("Perfil", error.code);
      });
  }

  function handleDeleteAccount() {
    Alert.alert("Perfil", "Você confirma que deseja excluir a conta?", [
      {
        text: "Confirmar",
        onPress: () => deleteAccount(),
        style: "cancel",
      },
      {
        text: "Cancelar",
        style: "cancel",
      },
    ]);
  }

  return (
    <VStack flex={1} pb={6} bg="gray.500">
      <Box px={6} bg="gray.600">
        <Header title="Perfil" />
      </Box>

      <Box m={4}>
        <FormControl>
          <FormControl.Label>Nome</FormControl.Label>
          <Input
            placeholder="Digite seu nome"
            marginBottom={4}
            onChangeText={setName}
            value={name}
          />

          <FormControl.Label>E-mail</FormControl.Label>
          <Input
            placeholder="Digite seu e-mail"
            marginBottom={4}
            onChangeText={setEmail}
            value={email}
          />
          <HStack justifyContent="center" p={4}>
            {user.emailVerified ? (
              <CircleWavyCheck size={22} color={colors.green[300]} />
            ) : (
              <Hourglass size={22} color={colors.secondary[700]} />
            )}
            <Text
              fontSize="sm"
              color={
                user.emailVerified ? colors.green[300] : colors.secondary[700]
              }
              ml={2}
              textTransform="uppercase"
            >
              {user.emailVerified
                ? "E-mail verificado"
                : "E-mail não verificado"}
            </Text>
          </HStack>
        </FormControl>
      </Box>

      <Button
        title="Atualizar perfil"
        isLoading={isLoading}
        m={4}
        isDisabled={!(name && email)}
        onPress={handleUpdateProfile}
      />

      <Button
        title="Desconectar"
        isLoading={isLoading}
        m={4}
        leftIcon={<SignOut size={24} color="white" />}
        onPress={handleLogout}
      />
      <Button
        title="Excluir conta"
        isLoading={isLoading}
        m={4}
        leftIcon={<Trash size={24} color="white" />}
        onPress={handleDeleteAccount}
      />
    </VStack>
  );
}
