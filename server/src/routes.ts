import { z } from "zod";
import dayjs from "dayjs";
import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";

export async function appRoutes(app: FastifyInstance) {
  
  app.post('/habits', async (req, res) => {

    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(
        z.number().min(0).max(6)
      )
    });

    const { title, weekDays } = createHabitBody.parse(req.body);
    const today = dayjs().startOf('day').toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,

        
        weekDays: {
          create: weekDays.map( weekDay => {
            return {
              week_day: weekDay
            }
          })
        }

      }
    })

  });

  app.patch('/habits/:id/toggle', async (req, res) => {
    const toggleHabitsParams = z.object({
      id: z.string().uuid()
    });

    const { id } = toggleHabitsParams.parse(req.params);

    const today = dayjs().startOf('day').toDate();

    let day = await prisma.day.findUnique({
      where: { date: today }
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        }
      });
    };

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        }
      }
    });

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: { id: dayHabit.id }
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      });
    };


  });


  app.get('/day', async (req, res) => {
    const getDayParams = z.object({
      date: z.coerce.date()
    })
    
    const { date } = getDayParams.parse(req.query)

    const parsedDate = dayjs(date).startOf('day')
    const weekDay = parsedDate.get('day')

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    })

    return {
      possibleHabits,
      completedHabits
    }
  });

  app.get('/summary', async (req, res) => {
    const summary = await prisma.$queryRaw`
      SELECT
        days.id,
        days.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits
          WHERE day_habits.day_id = days.id
        ) completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days
          JOIN habits ON habits.id = habit_week_days.habit_id
          WHERE 
            habit_week_days.week_day = cast(strftime('%w', days.date/1000, 'unixepoch') as int) 
            AND habits.created_at <= days.date
        ) amount
      FROM days
    `

    return summary
  });

}