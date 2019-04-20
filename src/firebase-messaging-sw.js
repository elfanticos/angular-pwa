importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.4/firebase-messaging.js');


firebase.initializeApp({
    'messagingSenderId': '881453700326'
  });
  
  const messaging = firebase.messaging();
  