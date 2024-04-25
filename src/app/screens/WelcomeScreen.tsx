import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

interface WelcomeScreenProps {}

export default function WelcomeScreen(props: WelcomeScreenProps) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#007BFF' }}>
      <View
        style={{ flex: 1, justifyContent: 'space-around', marginVertical: 4 }}
      >
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 40,
            textAlign: 'center',
          }}
        >
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Image
            source={require('../../assets/images/pexels-tomfisk-3856433.jpg')}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
            style={{
              paddingVertical: 10,
              backgroundColor: '#1E40AF',
              marginHorizontal: 7,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ fontWeight: 'bold', color: '#333' }}> Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
