import { transformData, type Activity, type ApiErrorResponse, type ApiResponse, type Year } from "@/lib/transform-github-activity";
import Calendar, {
  Skeleton,
  type Props as ActivityCalendarProps,
  type ThemeInput
} from 'react-activity-calendar';

export const CalendarSkeleton = Skeleton;

async function fetchCalendarData(username: string, year: Year): Promise<ApiResponse> {
  const apiUrl = 'https://github-contributions-api.jogruber.de/v4/'
  const response = await fetch(`${apiUrl}${username}?y=${String(year)}`)
  const data = (await response.json()) as ApiResponse | ApiErrorResponse

  if (!response.ok) {
    throw Error(
      `Fetching GitHub contribution data for "${username}" failed: ${(data as ApiErrorResponse).error}`,
    )
  }

  return data as ApiResponse
}

const gitHubTheme = {
  light: ['#ffffff', '#d3d3d3', '#a9a9a9', '#808080', '#000000'],
  dark: ['#000000', '#1a1a1a', '#333333', '#666666', '#ffffff'],
} satisfies ThemeInput;

const labels = {
  months: [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ],
  weekdays: [
    'Вс', // Воскресенье первым!
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
  ],
  totalCount: '{{count}} активностей в {{year}} году',
  legend: {
    less: 'Меньше',
    more: 'Больше',
  },
} satisfies ActivityCalendarProps['labels']

export type Props = {
  username: string
  errorMessage?: string
  throwOnError?: boolean
  transformData?: (data: Array<Activity>) => Array<Activity>
  transformTotalCount?: boolean
  year?: Year
} & Omit<ActivityCalendarProps, 'data'>

export default async function GitHubActivityMap({
  username,
  year = 'last',
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
  ...props
}: Props) {
  const data = await fetchCalendarData(username, year)

  const totalCount = year === 'last' ? data.total.lastYear : data.total[year]

  return (
    <Calendar
      {...props}
      data={transformData(data.contributions, transformFn) ?? []}
      labels={labels}
      showWeekdayLabels={["mon", "fri"]}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      weekStart={0}
      theme={gitHubTheme}
      maxLevel={4}
    />
  )
}
