import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { generateRangeDaysYear } from "../utils/generate-range-days-year"
import { HabitDay } from "./HabitDay"



const weekDays = [
  'D',
  'S',
  'T',
  'Q',
  'Q',
  'S',
  'S'
]

const summaryDates = generateRangeDaysYear();
const summaryDatesSize = 18 * 7;
const amountDaysToFill = summaryDatesSize - summaryDates.length;

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])
  
  useEffect(() => {
    api.get('/summary').then( response => {
      setSummary(response.data)
    })
  }, [])

  return(
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {
          weekDays.map((day, i) => {
            return (
              <div 
              key={`${day}-${i}`} 
              className="text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-items-center">
                { day }
              </div>
            )
          })
        }  
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {
          summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, 'day')
            })
            return (
              <HabitDay 
                key={ date.toString() }
                date={ date }
                completed={ dayInSummary?.completed }
                amount={ dayInSummary?.amount}
              />
            )
          })            
        }
        {
          amountDaysToFill > 0 && 
          Array.from({ length: amountDaysToFill}).map((_, i) => 
          <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>
          )
        }
      </div>

    </div>
  )
}