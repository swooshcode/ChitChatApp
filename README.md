# Welcome to the ChitChat GitLab!

This is where the source code for ChitChat will be stored and shared with developers on the team.

Product: Chat Application(SaaS)

Description:
The Chat Application is a mobile app developed using React Native that allows users to have real-time conversations with other users through text messages. The app provides a simple and intuitive user interface for sending and receiving messages in individual and group chats.

Key Features:
1. Real-time Chat: Users can have real-time conversations with other users through text messages. We provide a seamless chatting experience. Sent and received messages are instant.

2. Group Chats: Users can create and participate in group chats with multiple participants. Group chats support numerous users and facilitate group discussions.

3. Pinned Chats: Users can easily pin essential or frequently accessed chats. Pinned chats appear at the top of the chat list, making finding and accessing crucial conversations convenient.

4. Push Notifications: The app supports push notifications, which keep users informed of new messages even when the app is not actively running. This feature ensures that users get all essential messages.

5. User Authentication: Users can create accounts and log in securely using their email or social media accounts. User authentication ensures the privacy and security of conversations.

6. User Profile: Each user has a profile that includes their name, profile picture, and other relevant information. Users can update their profiles and view other users' profiles.

7. Message Formatting: The app supports basic message formatting such as text formatting (bold, italic, etc.) and emoticons to add a personal touch to messages.

8. Last Seen Status: The app displays the last seen status of users in individual chats, showing when the other user was last active.

9. Message History: Users can view their message history and scroll through past conversations to refer to previous messages.

10. Offline Support: The app provides offline support, allowing users to view previously loaded messages and compose messages even when connected to the internet. Once the internet connection returns, the app will synch the offline notes and memos.

11. Easy Navigation: The app has a user-friendly navigation system, making it easy for users to switch between chats, access the chat list, and use other app features.

12. Responsive Design: The app is responsive and works seamlessly on different screen sizes and orientations, providing a consistent user experience across various devices.

Technology Stack:
- React Native: For building the cross-platform mobile app.
- Firebase: For real-time messaging, user authentication, and cloud storage.
- React Navigation: For handling app navigation and routing.
- Gifted Chat Library: For implementing the chat interface and functionality.
- Firestore Database: For storing chat data and user information.
- Cloud Functions: For handling server-side logic and push notifications.

Note: This documentation provides a high-level overview of the app's features and technology stack. Please refer to the source code and relevant documentation files for detailed technical documentation and code implementation.

## Installation:

### IOS

1. Clone repo, navigate to source code folder
2. Ensure Node 16+, Ruby 2.7.5+ and the latest version of Xcode are installed on the system
3. run `npm install`
4. run `bundle install`
5. navigate to ios folder and run `pod install`
6. Go back to source code folder and run `npm run ios`

---

### ANDROID

1. Setup Android dev environment for your system using [these instructions](https://reactnative.dev/docs/environment-setup#development-os)

- (AKA install Node, watchman, JAVA, and the android sdk) Skip installing the React-Native Command Line Interface, that's done on the next step. Just install the mentioned prerequesites and setup the Android SDK including editing your PATH, nothing more

2. run `npm install`
3. run `npm run android`

## Authors and acknowledgment

Nigel Phillips, Jake Brown, Kushagra Mallick, Rahul Rajendran, Jason Xiong, Wade Desir

## License

Copyright ChitChat
