import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useThunkDispatch, Actions, useSelector, AppState } from '@job/redux';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 30,
  },
  login: {},
  heading: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 30,
    fontWeight: '600',
  },
  heading2Wrapper: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading2: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    backgroundColor: '#456ba9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    width: 40,
    height: 40,
    padding: 10,
    overflow: 'hidden',
    color: 'white',
  },
  formControl: {
    flex: 1,
    marginVertical: 15,
  },
  label: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderColor: 'rgba(39,41,61,.25)',
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: '#456ba9',
    justifyContent: 'center',
    paddingVertical: 10,
    marginVertical: 15,
  },
  loginButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  signupWrapper: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    fontWeight: '600',
  },
  signupButton: {
    marginLeft: 5,
    color: '#456ba9',
  },
  buttons: {
    marginBottom: 50,
  },
  socialButton: {
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 12,
  },
  socialButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 15,
  },
});

const Login = () => {
  const dispatch = useThunkDispatch();
  const authState = useSelector((state: AppState) => state.auth);

  return (
    <ScrollView style={{ width: '100%' }}>
      <View style={styles.screen}>
        <Text style={styles.heading}>Login To Account</Text>
        <View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Username / email</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              dispatch(
                Actions.loginUser({
                  password: '@Volimtejaa7',
                  username: 'halcika7',
                })
              )
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupWrapper}>
            <Text style={styles.signupText}>Don&apos;t have an account?</Text>
            <TouchableOpacity>
              <Text style={styles.signupButton}>Sign up here</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity>
              <Text style={{ color: '#456ba9' }}>Forgot password ?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.heading2Wrapper}>
            <View
              style={{
                width: 60,
                backgroundColor: '#466ca9',
                height: 1,
              }}
            />
            <Text style={styles.heading2}>Or</Text>
            <View
              style={{ width: 60, backgroundColor: '#466ca9', height: 1 }}
            />
          </View>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={{ ...styles.socialButton, backgroundColor: '#4267b2' }}
            >
              <Text style={styles.socialButtonText}>Login with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.socialButton, backgroundColor: '#d34836' }}
            >
              <Text style={styles.socialButtonText}>Login with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.socialButton, backgroundColor: '#1da1f2' }}
            >
              <Text style={styles.socialButtonText}>Login with Twitter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.socialButton, backgroundColor: '#0077b5' }}
            >
              <Text style={styles.socialButtonText}>Login with Linkedin</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;
