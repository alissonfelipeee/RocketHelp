import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { VStack } from "native-base";
import { useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function RegisterOrder() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation();

  function handleNewOrderRegister() {
    if (!patrimony || !description)
      return Alert.alert("Registrar", "Preencha todos os campos.");

    setIsLoading(true);
    firestore()
      .collection("orders")
      .add({
        patrimony,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert(
          "Solicitação",
          "A sua solicitação foi registrada com sucesso."
        );
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        return Alert.alert(
          "Solicitação",
          "Não foi possível registrar a sua solicitação."
        );
      });
  }

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <VStack flex={1} p={6} bg="gray.600">
        <Header title="Nova solicitação" />

        <Input
          placeholder="Número do patrimônio"
          mt={4}
          onChangeText={setPatrimony}
        />
        <Input
          placeholder="Descrição do problema"
          flex={1}
          mt={5}
          multiline
          textAlignVertical="top"
          onChangeText={setDescription}
        />
        <Button
          title="Cadastrar"
          mt={5}
          isDisabled={!(patrimony && description)}
          isLoading={isLoading}
          onPress={handleNewOrderRegister}
        />
      </VStack>
    </TouchableWithoutFeedback>
  );
}
