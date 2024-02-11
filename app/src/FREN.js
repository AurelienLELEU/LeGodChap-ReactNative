import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function FREN({ onLanguageChange }) {
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <View style={styles.container}>
      {language === 'FR' ? (
        <View style={styles.button}>
          <Button onPress={() => toggleLanguage('EN')} title="EN" color="white" />
        </View>
      ) : (
        <View style={styles.button}>
          <Button onPress={() => toggleLanguage('FR')} title="FR" color="white" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: 'white',
  },
  button: {
    backgroundColor: 'transparent', // Set background color to transparent to remove the default blue background
  },
});
