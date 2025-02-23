<template>
  <div class="camera-container">
    <h1 class="title">📸 Caméra</h1>
    <video ref="video" class="video-display" autoplay></video>
    <canvas ref="canvas" class="hidden-canvas" style="display: none;"></canvas>

    <div class="button-container">
      <button class="capture-button" @click="capturePhoto">Prendre une photo</button>
    </div>

    <div v-if="photoSrc" class="photo-preview">
      <img :src="photoSrc" alt="Photo capturée" />
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import NotificationService from '../services/NotificationService'; 

export default defineComponent({
  name: 'CameraComponent',
  setup() {
    const video = ref<HTMLVideoElement | null>(null);
    const canvas = ref<HTMLCanvasElement | null>(null);
    const photoSrc = ref<string>('');
    const errorMessage = ref<string>('');

    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (video.value) {
          video.value.srcObject = stream;
        }
      } catch (error) {
        errorMessage.value = 'Erreur lors de l’accès à la caméra. Veuillez vérifier les permissions.';
        console.error('Erreur caméra :', error);
      }
    };

    const capturePhoto = async () => {
      if (canvas.value && video.value) {
        const ctx = canvas.value.getContext('2d');
        if (ctx) {
          canvas.value.width = video.value.videoWidth;
          canvas.value.height = video.value.videoHeight;

          ctx.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);

          photoSrc.value = canvas.value.toDataURL('image/png');

          savePhotoToStorage();

          try {
            await NotificationService.showNotification(
              'Photo capturée avec succès !',
              'success'
            );
          } catch (error) {
            console.error('Erreur lors de la notification :', error);
          }
        }
      }
    };

    const savePhotoToStorage = () => {
      if (photoSrc.value) {
        localStorage.setItem('photo', photoSrc.value);
      }
    };

    const loadPhotoFromStorage = () => {
      const storedPhoto = localStorage.getItem('photo');
      if (storedPhoto) {
        photoSrc.value = storedPhoto;
      }
    };

    onMounted(() => {
      initCamera();
      loadPhotoFromStorage();
    });

    return {
      video,
      canvas,
      photoSrc,
      errorMessage,
      capturePhoto,
    };
  },
});
</script>