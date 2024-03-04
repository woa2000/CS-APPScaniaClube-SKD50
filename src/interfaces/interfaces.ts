interface NavigationParams {
  id: string | undefined,
  type: string | undefined,
  title: string | undefined,
  date: string | undefined,
  provider: Professional | undefined;
}

interface JWT {
  token: string | null,
  user: User | null,
  fileServer: string | null,
  error: string | null
}

interface User {
  id: string | undefined,
  nome: string | undefined,
  cpf: string | undefined,
  email: string | undefined,
  dataNascimento: string | undefined,
  celular: string | undefined,
  imgPerfil?: string | undefined,
  idioma?: string | undefined,
}

interface HomeObj{
  banners: object | null,
  likedActivities: object | null
}
interface Banner{
  id: string,
  title: string,
  title_EN: string,
  caption: string,
  caption_EN: string,
  mobileImageUrl: string,
  link: string
}

interface Activity{
  id: string,
  description: string,
  description_EN: string,
  image: string,
  icon: string,
  isLiked: boolean,
  subtitle?: string,
  needAppointments?: boolean,
  detailActivities?: {
    subtitle?: string,
    subtitle_EN?: string,
    description?: string,
    description_EN?: string,
  }
}

interface LikedActivity{
  id: string,
  description: string,
  description_EN: string,
  image: string,
}

interface ActivityPage {
  activities: object | null,
  lastReservations: object | null
}

interface ScheduleDates {
  dates: Date[] | null
}

interface ScheduleActivity {
  id: string,
  vacancies: number,
  dateLabel: string,
  scheduleLabel: string,
  vacanciesLabel: string,
  isScheduled: boolean,
  sheduledId: string | null
}

interface ModelResult {
  success: boolean,
  modelResult: DetailResult | null
}

interface DetailResult {
  success: boolean,
  message: ModelMessage[] 
}

interface ModelMessage {
  property: string,
  message: string,
}

interface PaymentModelResult {
  success: boolean,
  ticketCount: number,
  result: {
    sandboxInitPoint: string,
    totalPrice: number,
    payable: boolean
  },
  modelResult: DetailResult | null
}

interface ActivitySchedule {
  id: string,
  activityTitle: string,
  activityTitle_EN: string,
  date: string,
  startSchedule: string,
  endSchedule: string,
  scheduleLabel: string,
}

interface SpaceSchedule {
  id: string,
  date: string,
  startSchedule: string,
  endSchedule: string,
  activityTitle: string,
  activityTitle_EN: string,
  scheduleLabel: string,
}

interface BeautyCenterSchedule {
  id: string,
  date: string,
  startSchedule: string,
  endSchedule: string,
  activityTitle: string,
  activityTitle_EN: string,
  scheduleLabel: string,
}

interface Professional {
  id: string,
  nome: string,
  imgPerfil: string,
}

interface GraphicData {
  type: string | undefined,
  userGroupActivity: UserGroupActivity[] | undefined,
  totalTime: number | undefined,
}

interface UserGroupActivity {
  id: string,
  activityName: string,
  duration: number,
  percent: string, 
}

interface GraphicProps {
  x: string,
  y: number
}

interface EventReserveProps {
  id: string,
  title: string,
  title_EN: string,
  subtitle: string,
  subtitle_EN: string,
  date: string,
  forms: [
    {
      id: string,
      quantity: number,
      description: string,
      description_EN: string
    }
  ],
  hasName: boolean,
  hasRg: boolean,
  hasBirthDate: boolean,
  hasCellphone: boolean,
  hasRegister: boolean,
  documentRequired: boolean,
  birthDateRequired: boolean,
  cellRequired: boolean
}

interface EventProps {
  event: object | undefined
}

interface Event {
  id: string,
  title: string,
  title_EN: string,
  image: string,
  startEvent: string,
  icon: string,
}

interface FormProps {
  eventId: string, 
  type: number, 
  name: string,
  RG?: string,
  birthDate?: string,
  cell?: string,
  register?: string,
  requestUserId: string, 
  paid: boolean
}

interface EventDetailProps {
  id: string,
  title: string,
  title_EN: string,
  subTitle: string,
  subTitle_EN: string,
  image: string,
  icon: string | undefined,
  startEvent: string,
  endEvent: string,
  description: string,
  description_EN: string,
  vacancies: number,
  remainingVacancies: number,
  totalRemainingVacancies: number,
  requestDocument: boolean,
  requestBirthDate: boolean,
  requestCell: boolean,
  documentRequired: boolean,
  birthDateRequired: boolean,
  cellRequired: boolean,
  eventsTicketTypes: EventsTicketTypesProps[] | undefined
}

interface EventsTicketTypesProps {
  id: string,
  cost: number,
  filledVacancies: number,
  quantity: number,
  quantityVacancies: number,
  remainingVacancies: number,
  ticketType: TicketTypeProps | undefined
}

interface TicketTypeProps {
  id: string,
  description: string,
  description_EN: string
}

interface SnackBarProps {
  id: string,
  name: string,
  image: string,
  openingHours: OpeningHours[] | undefined,
  contacts: Contact[] | undefined,
}

interface OpeningHours {
  id: string,
  description: string,
  labelTime: string
}

interface Contact {
  id: string,
}

interface DishOfDayProps {
  id: string,
  title: string,
  title_EN: string,
  subtitle: string,
  subtitle_EN: string,
  image: string,
  active: boolean,
  category: string,
  description: string,
  description_EN: string,
  dishDay: number,
  value: number,
}

interface SnackBarItem {
  id: string,
  title: string,
  title_EN: string,
  subtitle: string,
  subtitle_EN: string,
  description: string,
  description_EN: string,
  image: string,
  value: number,
}

interface SnackBarItemsProps {
  itens: SnackBarItem[],
  category: string,
  category_EN: string,
}

interface SnackFavoriteProps {
  id: string,
  title: string,
  title_EN: string,
  image: string,
  category: string,
  category_EN: string,
  value: number,
}

interface ActivityDetailParams {
  id: string
  title: string,
  title_EN: string,
  date: string
}

interface SheetTrainingProps {
  id: string,
  name: string,
  order: number,
}

interface ExerciseProps {
  id: string,
  name: string,
  name_EN: string,
  order: number,
  listExercises: ListExercises[]
}

interface ListExercises {
  id: string,
  name: string,
  name_EN: string,
  repettition: string
}

interface ExerciseDetailProps {
  id: string,
  name: string,
  name_EN: string,
  description: string,
  description_EN: string,
  linkVideo: string
}

interface ExamsProps {
  id: string,
  authorization: number,
  activity: string,
  sendDate: string,
  expirationDate: string,
  image: string
}

interface ExamNeedActivityProps {
  id: string,
  description: string
  description_EN: string
}

interface OperatingRule {
  id: string,
  activityId: string,
  title: string,
  title_EN: string,
  text: string,
  text_EN: string,
}

export {
  NavigationParams, 
  JWT, 
  User, 
  HomeObj, 
  Banner, 
  Activity, 
  LikedActivity, 
  ActivityPage, 
  ScheduleDates, 
  ScheduleActivity, 
  ModelResult, 
  ActivitySchedule,
  SpaceSchedule,
  BeautyCenterSchedule,
  Professional,
  GraphicData,
  UserGroupActivity,
  GraphicProps,
  EventReserveProps,
  EventProps,
  Event,
  FormProps,
  EventDetailProps,
  SnackBarProps,
  DishOfDayProps,
  SnackBarItemsProps,
  SnackFavoriteProps,
  SnackBarItem,
  ActivityDetailParams,
  SheetTrainingProps,
  ExerciseProps,
  ExerciseDetailProps,
  PaymentModelResult,
  ExamsProps,
  ExamNeedActivityProps,
  OperatingRule
};
