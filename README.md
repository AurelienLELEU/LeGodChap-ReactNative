# LeGodChap-ReactNative

## Overview
The Supabase User Management System is a mobile application designed to manage user authentication, registration, and profile management using the Supabase platform. It allows users to sign up, log in, update their profiles, and perform various account-related tasks.

## Features
1. **User Authentication:** Users can securely log in to their accounts using their credentials.
2. **User Registration:** New users can register for an account by providing necessary details like username, email, and password.
3. **Profile Management:** Users can update their profile information including username, email, password, profile picture, and description.
4. **Error Handling:** The application provides error messages to inform users about any issues encountered during login, registration, or profile updates.
5. **Duplicate Username/Email Check:** The system checks for duplicate usernames and emails during registration and displays an alert if the chosen username or email is already taken.

## Technologies Used
- **React Native:** The frontend of the application is built using React Native, a popular framework for building mobile applications.
- **Supabase:** Supabase is used as the backend service to manage user authentication, database, and storage.
- **AsyncStorage:** AsyncStorage is used to store user authentication tokens and profile information locally on the device.
- **@react-native-async-storage/async-storage:** This library is used to asynchronously store and retrieve data in React Native applications.
- **@supabase/supabase-js:** The Supabase JavaScript client library is used to interact with the Supabase API from the frontend.

## Getting Started
To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure Supabase by creating an account and obtaining the Supabase URL and API key.
4. Replace the `supabaseUrl` and `supabaseKey` variables in the code with your Supabase URL and API key.
5. Run the application using `npm start`.

## Contributing
Contributions to the project are welcome. If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Additionnal documentation:
- Use Case : https://www.canva.com/design/DAF8SLjRXb4/73h3y8gGI6VpmKYNvoiwDg/edit?utm_content=DAF8SLjRXb4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton
- Database schematics : https://dbdiagram.io/d/65c5f539ac844320aecc3e84
- Flux Diagram : https://app.diagrams.net/#G1HJ8fJg3hgSjpXS5Kdk5Yq6zaepN9_90s
- Gant Diagram : ![image](https://github.com/AurelienLELEU/LeGodChap-ReactNative/assets/33595582/7a9eeddd-d556-440d-a067-facfa4f15a66)
