import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  quizText: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 25,
    fontWeight: '600',
    marginTop: 10,
  },
  ruleText: {
    marginLeft: 4,
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
  ruleContainer: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10,
    marginTop: 20,
  },
  imageSize: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  viewSmall: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  startText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    borderRadius: 25,
    width: 200,
    height: 50,
    alignSelf: 'center',
    padding: 12,
  },
  frontImage: {
    width: '100%',
    resizeMode: 'stretch',
    height: 350,
    marginTop: 20,
  },
});

export default styles;
