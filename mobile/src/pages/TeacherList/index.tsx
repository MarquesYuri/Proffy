import React, { useState, useEffect } from 'react'
import { View, Text, TextInput } from 'react-native'
import { Feather } from '@expo/vector-icons'
import PageHeader from '../../components/PageHeader'
import TeacherItem, { Teacher } from '../../components/TeacherItem'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'
import { ScrollView, BorderlessButton, RectButton } from 'react-native-gesture-handler'
import api from '../../services/api'

function TeacherList() {
  const [ teachers, setTeachers ] = useState([])
  const [ favorites, setFavorites ] = useState<number[]>([])
  const [ subject, setSubject ] = useState('')
  const [ week_day, setWeekDay ] = useState('')
  const [ time, setTime ] = useState('')
  const [ isFiltersVisible, setIsFiltersVisible ] = useState(teachers.length === 0 ? true : false)

  function loadFavorites() {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          const favoritesTeachers = JSON.parse(response)
          const favoritesTeachersIds = favoritesTeachers.map((teacher: Teacher) => {
            return teacher.id
          })
          
          setFavorites(favoritesTeachersIds)
        }
      })
  }

  useEffect(() => {
    loadFavorites()
  }, [])
 
  function handleToggleFiltersVisible() {
    setIsFiltersVisible(!isFiltersVisible)
  }

  async function handleFiltersSubmit() {
    loadFavorites()

    await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })
      .then(response => {
        setTeachers(response.data)
        setIsFiltersVisible(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <View style={ styles.container }>
      <PageHeader title="Proffys disponíveis" headerRight={
        (
          <BorderlessButton onPress={ handleToggleFiltersVisible }>
            <Feather name="filter" size={20} color="#fff"/>
          </BorderlessButton>
        )
      }>
        {
          isFiltersVisible &&
          (<View style={ styles.searchForm } >
            <Text style={ styles.label }>Matéria</Text>
            <TextInput
              style={ styles.input }
              value={ subject }
              onChangeText={ text => setSubject(text) }
              placeholder="Qual a matéria"
              placeholderTextColor="#c1bccc"
              />
            <View style={ styles.inputGroup }>
              <View style={ styles.inputBlock }>
                <Text style={ styles.label }>Dia da Semana</Text>
                <TextInput
                  style={ styles.input }
                  value={ week_day }
                  onChangeText={ text => setWeekDay(text) }
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  />  
              </View>

              <View style={ styles.inputBlock }>
                <Text style={ styles.label }>Horário</Text>
                <TextInput
                  style={ styles.input }
                  value={ time }
                  onChangeText={ text => setTime(text) }
                  placeholder="Qual horário?"
                  placeholderTextColor="#c1bccc"
                  />  
              </View>
            </View>

            <RectButton onPress={ handleFiltersSubmit } style={ styles.submitButton }>
              <Text style={ styles.submitButtonText }>Buscar</Text>
            </RectButton>
          </View>)
        }
      </PageHeader>

      <ScrollView
        style={ styles.teacherList }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {
          teachers.map((teacher: Teacher) => {
            return (
              <TeacherItem
                key={ teacher.id }
                teacher={ teacher }
                favorite={ favorites.includes(teacher.id) }
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default TeacherList