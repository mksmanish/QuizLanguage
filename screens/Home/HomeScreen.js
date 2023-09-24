import {
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import {quiz, like} from '../../assets';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import SwitchSelector from 'react-native-switch-selector';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const options = [
    {label: 'English', value: 'en'},
    {label: 'Hindi', value: 'hd'},
    {label: 'French', value: 'fr'},
  ];
  const navigation = useNavigation();
  const {t, i18n} = useTranslation();
  return (
    <SafeAreaView style={{marginTop: 10}}>
      <StatusBar
        backgroundColor={'white'}
        barStyle="dark-content"
        translucent={false}
      />
      <View>
        <SwitchSelector
          options={options}
          initial={0}
          selectedColor={'white'}
          buttonColor={'blue'}
          onPress={language => {
            i18n.changeLanguage(language);
          }}
        />
        <Image style={styles.frontImage} source={quiz} />
        <View style={styles.mainContainer}>
          <Text style={styles.quizText}>{t('headerText')}</Text>
          <View style={styles.ruleContainer}>
            <View style={styles.viewSmall}>
              <Image style={styles.imageSize} source={like} />
              <Text style={styles.ruleText}>{t('rule1')}</Text>
            </View>
            <View style={styles.viewSmall}>
              <Image style={styles.imageSize} source={like} />
              <Text style={styles.ruleText}>{t('rule2')}</Text>
            </View>
            <View style={styles.viewSmall}>
              <Image style={styles.imageSize} source={like} />
              <Text style={styles.ruleText}>{t('rule3')}</Text>
            </View>
            <View style={styles.viewSmall}>
              <Image style={styles.imageSize} source={like} />
              <Text style={styles.ruleText}>{t('rule4')}</Text>
            </View>
          </View>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => {
            navigation.navigate('Quiz');
          }}>
          <Text style={styles.startText}>{t('startQuiz')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
