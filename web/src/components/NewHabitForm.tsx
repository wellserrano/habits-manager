import * as Checkbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";
import { FormEvent, useState } from "react";

const availableWeekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'  
]

export function NewHabitForm() {
  const [title, setTitle] = useState('');
  const [weekDays, setWeekDays] = useState<number[]>([]);


  function createNewHabit(event: FormEvent) {
    event.preventDefault();
    console.log(weekDays)
  }

  function handleToggleWeekDay(weekDay: number) {
    setWeekDays(prevWeekDays => {
      return prevWeekDays.includes(weekDay) 
          ? prevWeekDays.filter(day => day !== weekDay) 
          : [...prevWeekDays, weekDay];
    });
  }


  return (
    <form onSubmit={ createNewHabit } className="w-full flex flex-col mt-6">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu comprometimento?
      </label>

      <input 
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir cedo, etc..."
        className="p-4 rounded-lg mt-3 bg-zinc-800 placeholder:text-zinc-400"
        autoFocus
        onChange={event => setTitle(event.target.value)}
      />

      <label htmlFor="" className="font-semibold leading-tight mt-4">
        Qual a recorrência?
      </label>


      <div className='flex flex-col gap-2 mt-3'>
        {
          availableWeekDays.map((name, index) => {return (
              <Checkbox.Root 
                key={ name }
                className='flex items-center gap-3 group'
                onCheckedChange={() => handleToggleWeekDay(index)}
              >

                <div 
                  className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500'
                >
                  <Checkbox.Indicator>
                    <Check size={20} className="text-white" />
                  </Checkbox.Indicator>
                </div>

                <span
                  className='text-white leading'
                >{ name }</span>
              </Checkbox.Root>

          )})
        }
      </div>

      <button type="submit" className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500">
        <Check size={20} weight="bold" />
        Confirmar
      </button>


    </form>
  )
}