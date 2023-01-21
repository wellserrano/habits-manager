//native
import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from "@react-navigation/native";

//hooks
import { useEffect, useState } from "react";

//components
import { Loading } from "../components/Loading";
import { Checkbox } from "../components/Checkbox";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { HabitsMessage } from "../components/HabitsMessage";

//utils
import { generateProgressPercentage } from "../utils/generate-progress-percentage";

//libs
import dayjs from "dayjs";

//server
import { api } from "../lib/axios";

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabits: string[];
  possibleHabits: {
    id: string;
    title: string;
  }[]
}

export function Habit() {
  const [loading, setLoading] = useState<Boolean>(true)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);

  const habitsProgress = dayInfo?.possibleHabits.length
    ? generateProgressPercentage(dayInfo?.possibleHabits.length, completedHabits.length) 
    : 0;

  const route = useRoute();
  const { date } = route.params as Params;

  const parsedDate = dayjs(date);
  const weekDay = parsedDate.format('dddd');
  const monthDay = parsedDate.format('DD/MM');

  async function fetchHabits() {
    try {
      setLoading(true)

      const response = await api.get('/day', { params: { date }});
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
      
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível carregar as informações dos hábitos')
    } finally {
      setLoading(false)
    }
  };

  async function handleToggleHabit(habitId: string) {
    if (completedHabits.includes(habitId)){
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
    } else {
      setCompletedHabits(prevState => [...prevState, habitId])
    }
  }

  useEffect(() => {
    fetchHabits();
  },[])

  if (loading) {
    return (
      <Loading />
    )
  }
  
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {weekDay}
        </Text>

        <Text className="text-white font-extrabold text-3xl">
          {monthDay}
        </Text>

        <ProgressBar progress={ habitsProgress }/>

        <View className="mt-6">
            {
              dayInfo?.possibleHabits.length ?
              dayInfo?.possibleHabits.map(habit => (
                <Checkbox 
                  key={ habit.id }
                  title={ habit.title }
                  checked={ completedHabits.includes(habit.id) }
                  onPress={ () => handleToggleHabit(habit.id) }
                />          
              ))
              :
              <HabitsMessage messageType="empty" /> 
            }            
          
        </View>

      </ScrollView>
    </View>
  )
}