// Import necessary components and modules from React Native
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Functional component for language toggle
export default function LanguageToggle({ onLanguageChange }) {
  // State variable for storing the selected language
  const [language, setLanguage] = useState('FR');

  // Function to toggle between languages
  const toggleLanguage = (lang) => {
    setLanguage(lang); // Set the selected language
    onLanguageChange(lang); // Invoke the callback function with the selected language
  };

  return (
    // View container for the language toggle buttons
    <View style={styles.container}>
      {/* Conditional rendering based on the selected language */}
      {language === 'FR' ? (
        // Button for switching to English language
        <View style={styles.button}>
          <Button onPress={() => toggleLanguage('EN')} title="FR" color="white" />
        </View>
      ) : (
        // Button for switching to French language
        <View style={styles.button}>
          <Button onPress={() => toggleLanguage('FR')} title="EN" color="white" />
        </View>
      )}
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    color: 'white', // Setting color here won't have any effect as it's not applicable for a View component
  },
  button: {
    backgroundColor: 'transparent', // Set background color to transparent to remove the default blue background
  },
});
