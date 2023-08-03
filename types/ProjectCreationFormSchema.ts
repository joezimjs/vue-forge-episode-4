import { z } from "zod";

export const ProjectCreationFormSchema = z.object({
  title: z.string().min(10),
  description: z.string().nonempty(),
  image: z.string().nonempty(),
  categoryUuid: z.string().min(16),
  softCap: z.number().min(10_000).max(100_000),
  hardCap: z.number().min(10_000).max(100_000),
  startsAt: z.string().refine(
    (date) => {
      const selectedDate = new Date(`${date} 00:00:00`);
      const today = getStartOfToday();

      return selectedDate.getTime() >= today.getTime();
    },
    { message: "Start date must be a valid date that is today or later" }
  ),
  finishesAt: z.string().refine(
    (date) => {
      const selectedDate = new Date(`${date} 00:00:00`).getTime();
      const today = getStartOfToday();
      const futureDate = getDateXMonthsFromNow(6).getTime();

      return selectedDate > today.getTime() && selectedDate < futureDate;
    },
    { message: "Finish date must be a valid future date at most 6 months from now" }
  ),
});

export type ProjectCreationFormSchema = z.infer<typeof ProjectCreationFormSchema>;
