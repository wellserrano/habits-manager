import { View, Text, ScrollView } from 'react-native'

//Components
import { Header } from '../components/Header'
import { HabitDay, DAY_SIZE } from '../components/HabitDay'

//Utils
import { generateRangeDaysYear } from '../utils/generate-range-days-year'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateRangeDaysYear();
const minimumSummaryDatesSize = 18 * 5;
const amounDaysToFill = minimumSummaryDatesSize - summaryDates.length +1

export function Home(){
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
        <View className='flex-row flex-wrap'>
          {
            summaryDates.map( date => (
              <HabitDay
                key={ date.toISOString() }
              />
            ))
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
      </ScrollView>


   


    </View>
  )
}