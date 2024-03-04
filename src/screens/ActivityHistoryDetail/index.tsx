import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { View, Text, FlatList } from 'react-native'
import { VictoryPie } from 'victory-native'
import { styles } from './styles'
import { theme } from '../../global/styles/theme'
import { useAuth } from '../../contexts/auth'
import * as activityService from '../../services/activity'
import { GraphicData, GraphicProps, UserGroupActivity } from '../../interfaces/interfaces'
import { ItemListActivity } from '../../components/ItemListActivity'

import { useTranslation } from 'react-i18next';
import { useTrasnlactionDynamic } from '../../languages/translateDB';


const graphicColor = [ 
  '#8A56AC', 
  '#4F8DCB', 
  '#9599B3', 
  '#fa0979', 
  '#5fd619', 
  '#4219d6',
  '#1F2C73'
]

export function ActivityHistoryDetail() {
  const { user } = useAuth()
  const [graphicData, setGraphicData] = useState<GraphicData[]>([] as GraphicData[])
  const [graphicDataWeek, setGraphicDataWeek] = useState([] as GraphicProps[])
  const [graphicDataMonth, setGraphicDataMonth] = useState([] as GraphicProps[])
  const [graphicDataYear, setGraphicDataYear] = useState([] as GraphicProps[])
  const [graphicOption, setGraphicOption] = useState('Week')

   const {t, i18n} = useTranslation();
  const tDynamic = useTrasnlactionDynamic;
  const td = (pt : string, en: string) => {
    let lang = i18n.language;
    return tDynamic(pt, en, lang);
  };


  async function getGraphicData() {
    const response = await activityService.getGraphUserActivity(user?.id as string)
    setGraphicData(response as GraphicData[])
  }

  async function getGraphicDataWeek() {
    const data = graphicData[0].userGroupActivity as UserGroupActivity[]
    
    const dataWeek = data.map(item => {
      return {
        x: item.activityName,
        y: item.duration
      }
    })

    await setGraphicDataWeek(dataWeek)

    return setGraphicOption('Week')
  }

  async function getGraphicDataMonth() {
    const data = graphicData[1].userGroupActivity as UserGroupActivity[]
    
    const dataMonth = data.map(item => {
      return {
        x: item.activityName,
        y: item.duration
      }
    })

    await setGraphicDataMonth(dataMonth)

    return setGraphicOption('Month')
  }

  async function getGraphicDataYear() {
    const data = graphicData[2].userGroupActivity as UserGroupActivity[]
    
    const dataYear = data.map(item => {
      return {
        x: item.activityName,
        y: item.duration
      }
    })

    await setGraphicDataYear(dataYear)

    return setGraphicOption('Year')
  }
  
  useEffect(() => {
    getGraphicData()
    
  }, [])
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.contentButtons}>
          <TouchableOpacity 
            style={graphicOption === 'Week' ? styles.buttonActive : styles.buttonInactive} 
            onPress={getGraphicDataWeek}
          >
            <Text style={graphicOption === 'Week' ? styles.textButtonActive : styles.textButtonInactive}>
              {t("Semana")}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={graphicOption === 'Month' ? styles.buttonActive : styles.buttonInactive} 
            onPress={getGraphicDataMonth}
          >
            <Text style={graphicOption === 'Month' ? styles.textButtonActive : styles.textButtonInactive}>
              {t("Mês")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={graphicOption === 'Year' ? styles.buttonActive : styles.buttonInactive} 
            onPress={getGraphicDataYear}
          >
            <Text style={graphicOption === 'Year' ? styles.textButtonActive : styles.textButtonInactive}>
              {t("Ano")}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <FlatList
            style={{ height: 120 }}
            data={graphicOption === 'Week' ? graphicDataWeek : graphicOption === 'Month' ? graphicDataMonth : graphicDataYear}
            keyExtractor={item => item.x}
            renderItem={({ item }) => (
              <ItemListActivity ball={'#1F2C73'} label={item.x} timing={item.y} />
            )}
          />
        </View>
        

        <View style={styles.contentGraphic}>
        {
          graphicOption === 'Week' && (
            <>
              <VictoryPie
                data={graphicDataWeek}
                colorScale={graphicColor}
                style={{ 
                  labels: { 
                    fill: '#8A56AC', 
                    fontSize: 12, 
                  } 
                }}
                height={280}
                width={280}
                padAngle={1}
                innerRadius={75}
                animate={{ easing: 'exp'}}
              />
              <View style={styles.contentGraphicText}>
                <Text style={styles.text}>{graphicDataWeek.length}</Text>
                <Text style={styles.total}>{t("Total Atividades")}</Text>
              </View>
            </>
          ) 
        }

        {
          graphicOption === 'Month' && (
            <>
              <VictoryPie
                animate={{ easing: 'exp'}}
                data={graphicDataMonth}
                colorScale={graphicColor}
                style={{ 
                  labels: { 
                    fill: '#8A56AC', 
                    fontSize: 12, 
                  } 
                }}
                height={280}
                width={280}
                padAngle={1}
                innerRadius={75}
              />
              <View style={styles.contentGraphicText}>
                <Text style={styles.text}>{graphicDataMonth.length}</Text>
                <Text style={styles.total}>{t("Total Atividades")}</Text>
              </View>
            </>
          ) 
        }

        {
          graphicOption === 'Year' && (
            <>
              <VictoryPie
                data={graphicDataYear}
                colorScale={graphicColor}
                style={{ 
                  labels: { 
                    fill: '#8A56AC', 
                    fontSize: 12, 
                  } 
                }}
                height={280}
                width={280}
                padAngle={1}
                innerRadius={75}
                animate={{ easing: 'exp'}}
              />
              <View style={styles.contentGraphicText}>
                <Text style={styles.text}>{graphicDataYear.length}</Text>
                <Text style={styles.total}>{t("Total Atividades")}</Text>
              </View>
            </>
          ) 
        }
        </View>
        <Text>
        </Text>
      </View>
    </View>
  )
}