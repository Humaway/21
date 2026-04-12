// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXmjZBRGqhSPSTTxTDappbJOaFerRQwBw",
  authDomain: "messenger-cfa6e.firebaseapp.com",
  projectId: "messenger-cfa6e",
  storageBucket: "messenger-cfa6e.firebasestorage.app",
  messagingSenderId: "710266615819",
  appId: "1:710266615819:web:cadeb12f54c0f861032f0e",
  measurementId: "G-8P070D3ENF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get references to our HTML elements
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesContainer = document.getElementById('messages-container');

// Reference the "messages" collection in the database, ordered by time
const messagesRef = collection(db, 'messages');
const q = query(messagesRef, orderBy('createdAt', 'asc'));

// Listen for updates in real-time
onSnapshot(q, (snapshot) => {
    messagesContainer.innerHTML = ''; // Clear current messages
    
    snapshot.forEach((doc) => {
        const data = doc.data();
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = data.text;
        messagesContainer.appendChild(messageDiv);
    });
    
    // Automatically scroll to the newest message at the bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Handle sending a new message
messageForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    
    const text = messageInput.value.trim();
    
    if (text) {
        try {
            // Push the message to Firebase
            await addDoc(messagesRef, {
                text: text,
                createdAt: serverTimestamp()
            });
            // Clear the input box after sending
            messageInput.value = '';
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    }
});
