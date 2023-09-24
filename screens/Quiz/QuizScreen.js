import {Text, View, SafeAreaView, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import Question from '../../data/Question';
import {useNavigation} from '@react-navigation/native';
import {thumbdown, thumbup} from '../../assets';

const QuizScreen = () => {
  const navigation = useNavigation();
  const data = Question;
  const totalQuestion = data.length;

  const [points, setPoints] = useState(0);
  const [index, setIndex] = useState(0);
  const currentQuestion = data[index];

  const [answerStatus, setanswerStatus] = useState(null);

  const [answers, setAnswers] = useState([]);

  const [selectedAnswerIndex, setSelectedAanwserIndex] = useState(null);

  const [counter, setCounter] = useState(15);

  let interval = null;

  const progressPercentage = Math.floor((index / totalQuestion) * 100);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.correctAnswerIndex) {
        setPoints(points + 10);
        setanswerStatus(true);
        answers.push({
          question: index + 1,
          answer: true,
          sawal: currentQuestion,
          uttar: currentQuestion?.correctAnswerIndex,
        });
      } else {
        setanswerStatus(false);
        answers.push({
          question: index + 1,
          answer: false,
          sawal: currentQuestion,
          uttar: currentQuestion?.correctAnswerIndex,
        });
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAanwserIndex(null);
    setanswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter(counter - 1);
      }
      if (counter === 0) {
        setIndex(index + 1);
        setCounter(15);
      }
    };
    interval = setTimeout(myInterval, 1000);
    return () => {
      clearTimeout(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);

  useEffect(() => {
    if (index + 1 > data.length) {
      navigation.navigate('Result', {
        answers: answers,
        points: points,
      });
    }
  }, [currentQuestion]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text>Quiz Challenge</Text>
        <Pressable
          style={{padding: 10, backgroundColor: 'green', borderRadius: 20}}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '500',
            }}>
            {counter}
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 10,
        }}>
        <Text>Your Progress</Text>
        <Text>
          ({index}/{totalQuestion} ) question answered
        </Text>
      </View>
      {/* { progees bar} */}
      <View
        style={{
          backgroundColor: 'white',
          width: '95%',
          flexDirection: 'row',
          alignItems: 'center',
          height: 10,
          borderRadius: 30, // Apply borderRadius to the outer View
          justifyContent: 'center',
          marginTop: 20,
          margin: 10,
          overflow: 'hidden', // Hide overflow for rounded corners
        }}>
        <Text
          style={{
            backgroundColor: 'green',
            borderRadius: 30, // Apply borderRadius to the inner Text
            position: 'absolute',
            left: 0,
            height: 10,
            right: 0,
            width: `${progressPercentage}%`,
            marginTop: 20,
          }}
        />
      </View>

      <View
        style={{
          backgroundColor: '#F0F8FF',
          marginTop: 35,
          padding: 10,
          borderRadius: 6,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          {currentQuestion?.question}
        </Text>
        <View style={{marginTop: 15}}>
          {currentQuestion?.options.map((item, index) => (
            <Pressable
              key={index}
              onPress={() =>
                selectedAnswerIndex === null && setSelectedAanwserIndex(index)
              }
              style={
                selectedAnswerIndex === index &&
                index === currentQuestion.correctAnswerIndex
                  ? {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 0.5,
                      marginVertical: 10,
                      borderColor: '#00FFFF',
                      borderRadius: 20,
                      backgroundColor: 'green',
                    }
                  : selectedAnswerIndex !== null &&
                    selectedAnswerIndex === index
                  ? {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 0.5,
                      marginVertical: 10,
                      borderColor: '#00FFFF',
                      borderRadius: 20,
                      backgroundColor: 'red',
                    }
                  : {
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 0.5,
                      marginVertical: 10,
                      borderColor: '#00FFFF',
                      borderRadius: 20,
                    }
              }>
              {selectedAnswerIndex === index &&
              index === currentQuestion?.correctAnswerIndex ? (
                <Image
                  style={{
                    resizeMode: 'contain',
                    borderColor: '#00FFFF',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                    borderWidth: 0.5,
                  }}
                  source={thumbup}
                />
              ) : selectedAnswerIndex !== null &&
                selectedAnswerIndex === index ? (
                <Image
                  style={{
                    resizeMode: 'contain',
                    borderColor: '#00FFFF',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                    borderWidth: 0.5,
                  }}
                  source={thumbdown}
                />
              ) : (
                <Text
                  style={{
                    borderColor: '#00FFFF',
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    padding: 10,
                    borderWidth: 0.5,
                    fontWeight: '700',
                    color: 'red',
                    textAlign: 'center',
                  }}>
                  {item?.id}
                </Text>
              )}

              <Text style={{marginLeft: 10, color: 'black'}}>
                {item?.answer}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View
        style={
          answerStatus == null
            ? null
            : {
                marginTop: 45,
                backgroundColor: '##F0F8FF',
                padding: 10,
                borderRadius: 7,
                height: 120,
              }
        }>
        {answerStatus === null ? null : (
          <Text
            style={
              answerStatus == null
                ? null
                : {
                    fontSize: 18,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'black',
                  }
            }>
            {!!answerStatus ? 'Correct Answer ' : 'Wrong Answer'}
          </Text>
        )}
        {index + 1 >= totalQuestion ? (
          <Pressable
            onPress={() =>
              navigation.navigate('Result', {
                points: points,
                answers: answers,
              })
            }
            style={{
              backgroundColor: 'green',
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
              borderRadius: 6,
            }}>
            <Text style={{color: 'white'}}>Done</Text>
          </Pressable>
        ) : answerStatus === null ? null : (
          <Pressable
            onPress={() => setIndex(index + 1)}
            style={{
              backgroundColor: 'green',
              padding: 10,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 20,
              borderRadius: 6,
            }}>
            <Text style={{color: 'white'}}>Next Question</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;
