import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'

import { Header } from '../components/Header'

import { ActivityHistoryDetail } from '../screens/ActivityHistoryDetail'
import { BeautyCenterReserve } from '../screens/BeautyCenterReserve'
import { BeautyCenterHistory } from '../screens/BeautyCenterHistory'
import { SelectProfessional } from '../screens/SelectProfessional'
import { AgreeTermsReserves } from '../screens/AgreeTermsReserves'
import { ExamAddAttachment } from '../screens/ExamAddAttachment'
import { ActivitysHistory } from '../screens/ActivitysHistory'
import { TrainingHistory } from '../screens/TrainingHistory'
import { ActivityReserve } from '../screens/ActivityReserve'
import { OtherActivitys } from '../screens/OtherActivitys'
import { ActivityDetail } from '../screens/ActivityDetail'
import { ChangePassword } from '../screens/ChangePassword'
import { ExerciseDetail } from '../screens/ExerciseDetail'
import { SnackBarItems } from '../screens/SnackBarItems'
import { BeautyCenter } from '../screens/BeautyCenter'
import { EventReserve } from '../screens/EventReserve'
import { EventDetail } from '../screens/EventDetail'
import { MenuProfile } from '../screens/MenuProfile'
import { ExamDetail } from '../screens/ExamDetail'
import { Activitys } from '../screens/Activitys'
import { Reserves } from '../screens/Reserves'
import { Settings } from '../screens/Settings'
import { SnackBar } from '../screens/SnackBar'
import { Payment } from '../screens/Payment'
import { Profile } from '../screens/Profile'
import { Events } from '../screens/Events'
import { Snack } from '../screens/Snack'
import { Home } from '../screens/Home'
import { Exams } from '../screens/Exams'
import { Language } from '../screens/Language'
import { Squares } from '../screens/Squares'
import { Kiosks } from '../screens/Kiosks'
import { OtherActivitiesWithoutAppointments } from '../screens/OtherActivitiesWithoutAppointments'

import { useTranslation } from 'react-i18next';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabs() {
     const {t, i18n} = useTranslation();
  

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#D97D54',
                tabBarStyle: {
                    position: 'absolute',
                    paddingTop: 15,
                    paddingBottom: 15,
                    height: 70
                }
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="home" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name={t("Atividades")}
                component={ActivitysHistory}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="activity" color={color} size={size} />
                    ),
                    headerShown: true,
                    header: () => <Header title={t("Atividades")} showBack={true} />
                }}
            />
            <Tab.Screen
                name={t("Centro Estético")}
                component={BeautyCenterHistory}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="users" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name={t("Espaços")}
                component={Reserves}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="book-open" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />

            <Tab.Screen
                name={t("Perfil")}
                component={MenuProfile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" color={color} size={size} />
                    ),
                    headerShown: true,
                    header: () => <Header title={t("Perfil")} showBack={true} showConfig={false} />
                }}
            />
        </Tab.Navigator>
    )
}

export function AppRoutes() {
    const {t, i18n} = useTranslation();

    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={HomeTabs} />
            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Configurações")} showBack={true} />
                }}
            />
            <Stack.Screen
                name="Activitys"
                component={Activitys}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ActivityHistoryDetail"
                component={ActivityHistoryDetail}
                options={{
                    headerShown: true,
                    header: () => <Header title={t('Atividades')} showBack={true} />
                }}
            />
            <Stack.Screen
                name="ActivityDetail"
                component={ActivityDetail}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TrainingHistory"
                component={TrainingHistory}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ExerciseDetail"
                component={ExerciseDetail}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Detalhe")} showBack={true} />
                }}
            />
            <Stack.Screen
                name="ActivityReserve"
                component={ActivityReserve}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BeautyCenter"
                component={BeautyCenter}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SelectProfessional"
                component={SelectProfessional}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BeautyCenterReserve"
                component={BeautyCenterReserve}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SnackBar"
                component={SnackBar}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="SnackBarItems"
                component={SnackBarItems}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Snack"
                component={Snack}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Events"
                component={Events}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Squares"
                component={Squares}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="Kiosks"
                component={Kiosks}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="EventDetail"
                component={EventDetail}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="EventReserve"
                component={EventReserve}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Eventos")} showBack={true} />
                }}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: true,
                    header: () => <Header title= {t("Meus Dados")} showBack />
                }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Trocar Senha")} showBack />
                }}
            />
            <Stack.Screen
                name="Payment"
                component={Payment}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Pagamentos")} showBack={false} />
                }}
            />

            <Stack.Screen
                name="AgreeTermsReserves"
                component={AgreeTermsReserves}
                options={{
                    headerShown: true,
                    header: () => <Header title={t('Regra de funcionamento')} showBack={false} />
                }}
            />

            <Stack.Screen
                name="Exams"
                component={Exams}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Exames")} showBack />
                }}
            />

            <Stack.Screen
                name="Language"
                component={Language}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Idioma")} showBack />
                }}
            />

            <Stack.Screen
                name="ExamDetail"
                component={ExamDetail}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Exames")} showBack />
                }}
            />

            <Stack.Screen
                name="ExamAddAttachment"
                component={ExamAddAttachment}
                options={{
                    headerShown: true,
                    header: () => <Header title={t("Anexar Exame")} showBack />
                }}
            />

            <Stack.Screen
                name="OtherActivitys"
                component={OtherActivitys}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="OtherActivitiesWithoutAppointments"
                component={OtherActivitiesWithoutAppointments}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}