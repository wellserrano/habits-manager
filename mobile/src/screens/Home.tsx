import { View, Text, ScrollView, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'

//Components
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'

//Utils
import { generateRangeDaysYear } from '../utils/generate-range-days-year'

import { api } from '../lib/axios'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateRangeDaysYear();
const minimumSummaryDatesSize = 18 * 5;
const amounDaysToFill = minimumSummaryDatesSize - summaryDates.length +1

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function Home(){
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null);

  const { navigate } = useNavigation();

  async function fetchData(){
    try {
      setLoading(true);

      const response = await api.get('/summary')

      setSummary(response.data)
      
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o resumo')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <View className='flex-1 bg-background px-8 pt-16'>

      <Header />

      <View className='flex-row mt-6 mb-2 '>
        {
          weekDays.map((day, i) => (
            <Text 
              key={`${day}-${i}`}
              className='text-zinc-400 text-xl font-bold text-center mx-1'
              style={{ width: DAY_SIZE }}
            >
              { day }
            </Text>
          ))
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100}}
      >
        {
          summary &&
          <View className='flex-row flex-wrap'>
            {
              summaryDates.map( date => {
                const dayHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })
                return (
                  <HabitDay
                  key={ date.toISOString() }
                  onPress={() => navigate('habit', { date: date.toISOString() })}
                  amountOfHabits={ dayHabits?.amount }
                  amountCompleted={ dayHabits?.completed }
                  date={ date }
                  />
                )
              })
            }
            {
              amounDaysToFill > 0 &&
              Array.from({ length: amounDaysToFill }).map((_, i) => (
                <View
                  key={i}
                  className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))
            }
          </View>
        }
      </ScrollView>


   


    </View>
  )
}