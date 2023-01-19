import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";

import { Feather } from '@expo/vector-icons'

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import colors from "tailwindcss/colors";

const weekDaysNames = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekday(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));

    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual seu comprometimento?
        </Text>

        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focust:border-green-600"
          placeholder="Exercícios, dormir cedo, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="font-semibold mt-4 mb-3 text-white text-base"> 
          Qual a recorrência?
        </Text>

        {
          weekDaysNames.map( (name, i) => 
          <Checkbox 
            key={ name } 
            title={ name } 
            checked={ weekDays.includes(i) } 
            onPress={ () => handleToggleWeekday(i) }
          /> )
        }

        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
        >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />
          <Text className="font-semibold text-base text-white ml-2">Confirmar</Text>
        </TouchableOpacity>

        

        
          

      </ScrollView>
    </View>
  )
}