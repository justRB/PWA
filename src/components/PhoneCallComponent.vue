<template>
  <div class="phone-call-container">
    <h1 class="title">📞 Téléphone</h1>

    <div class="input-container">
      <label for="phone-number" class="input-label">Numéro de téléphone :</label>
      <input 
        id="phone-number" 
        v-model="phoneNumber" 
        type="tel" 
        placeholder="Entrez un numéro"
        class="phone-input" 
      />
    </div>

    <div class="button-container">
      <button class="call-button" @click="makeCall">Appeler</button>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PhoneCallComponent',
  setup() {
    const phoneNumber = ref<string>('');
    const errorMessage = ref<string>('');

    const makeCall = () => {
      if (!phoneNumber.value) {
        errorMessage.value = 'Veuillez entrer un numéro de téléphone.';
        return;
      }

      try {
        const sanitizedNumber = phoneNumber.value.replace(/\s+/g, '');
        window.open(`tel:${sanitizedNumber}`, '_self');
      } catch (error) {
        errorMessage.value = 'Impossible de passer l’appel. Vérifiez le format du numéro.';
        console.error('Erreur lors de l’appel :', error);
      }
    };

    return {
      phoneNumber,
      errorMessage,
      makeCall,
    };
  },
});
</script>