import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function FREN({ onLanguageChange }) {
  const [language, setLanguage] = useState('EN');

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    onLanguageChange(lang);
  };

  return (
    <View style={styles.test}>
      {language === 'FR' ? <Button onPress={() => toggleLanguage('EN')} title="EN" /> : <Button onPress={() => toggleLanguage('FR')} title="FR" />}
    </View>
  );
}
const styles = StyleSheet.create({
  test: {
    flex: 1,
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
});
