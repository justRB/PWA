<template>
    <div class="vibration-container">
      <h1 class="title">📳 Vibration</h1>
  
      <div v-if="errorMessage" class="error-message">
        <p>🚫 Erreur : {{ errorMessage }}</p>
      </div>
  
      <div v-if="isVibrating" class="vibration-active">
        <p>🔊 Le téléphone est entrain de vibrer !</p>
      </div>
  
      <div class="button-container">
        <button class="vibration-button" @click="startVibration">
          Démarrer la vibration
        </button>
        <button class="vibration-button stop-button" @click="stopVibration">
          Arrêter la vibration
        </button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'VibrationComponent',
    setup() {
      const isVibrating = ref(false);
      const errorMessage = ref<string | null>(null);
      let vibrationInterval: number | null = null;
  
      const startVibration = () => {
        if (!navigator.vibrate) {
          errorMessage.value = "La vibration n'est pas supportée par ce navigateur.";
          return;
        }
        if (isVibrating.value) return;
  
        isVibrating.value = true;
        navigator.vibrate([300, 100, 300]);
  
        vibrationInterval = setInterval(() => {
          navigator.vibrate([300, 100, 300]);
        }, 700); 
      };
  
      const stopVibration = () => {
        if (!navigator.vibrate) return;
        isVibrating.value = false;
        navigator.vibrate(0);
  
        if (vibrationInterval !== null) {
          clearInterval(vibrationInterval);
          vibrationInterval = null;
        }
      };
  
      return {
        isVibrating,
        errorMessage,
        startVibration,
        stopVibration,
      };
    },
  });
  </script>