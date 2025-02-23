<template>
    <div class="chat">
      <h2>Chat Room: {{ roomId }}</h2>
      <div class="messages">
        <div v-for="(message, index) in messages" :key="index" class="message">
          <strong>{{ message.pseudo }}:</strong>
          <p>{{ message.content }}</p>
          <small>{{ message.dateEmis }}</small>
        </div>
      </div>
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Tapez votre message" />
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  export default {
    data() {
      return {
        socket: null,
        roomId: 'general',
        pseudo: 'User_' + Math.floor(Math.random() * 1000),  
        newMessage: '',
        messages: []
      };
    },
    created() {
      this.connectSocket();
    },
    methods: {
      connectSocket() {
        // Connexion au serveur Socket.IO
        this.socket = io('http://mohammedelmehdi.makhlouk.angers.mds-project.fr:40220');
        
        // Join la room
        this.socket.emit('chat-join-room', {
          pseudo: this.pseudo,
          roomId: this.roomId
        });
  
        // Écouter les messages entrants
        this.socket.on('chat-msg', (data) => {
          this.messages.push(data);
        });
      },
      sendMessage() {
        if (this.newMessage.trim() === '') return;
  
        // Préparer le message à envoyer
        const messageData = {
          msg: this.newMessage,
          roomId: this.roomId,
        };
  
        // Émettre le message au serveur
        this.socket.emit('chat-msg', messageData);
  
        // Ajout de la réponse du message dans le chat
        this.messages.push({
          pseudo: this.pseudo,
          content: this.newMessage,
          dateEmis: new Date().toISOString(),
          serverId: this.socket.id,
          autorId: this.pseudo
        });
  
        // Réinitialisation du champ de message
        this.newMessage = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .chat {
    width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .messages {
    max-height: 300px;
    overflow-y: scroll;
    margin-bottom: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
  }
  </style>
  