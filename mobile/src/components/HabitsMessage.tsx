import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

interface HabitsMessageProps {
  messageType: string;
}

export function HabitsMessage({messageType}: HabitsMessageProps) {
  const { navigate } = useNavigation();
  return (

    (messageType === "empty" )
    ? (
    <Text className="text-zinc-400 text-base ">
      Você não possui nenhuma monitoração de hábitos para este dia.{' '}
      <Text 
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate('new')}
      >
        Comece criando um novo hábito aqui.
      </Text>
    </Text>
    )
    :
    <Text className="text-zinc-400 text-base">
      
    </Text>
        
  )
}