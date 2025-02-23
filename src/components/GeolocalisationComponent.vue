<template>
  <div class="geo-container">
    <h1 class="title">🌍 Géolocalisation</h1>

    <div v-if="errorMessage" class="error-message">
      <p>🚫 Erreur : {{ errorMessage }}</p>
    </div>

    <div v-if="latitude && longitude" class="location-card">
      <p class="location-text">📍 Latitude : <strong>{{ latitude }}</strong></p>
      <p class="location-text">📍 Longitude : <strong>{{ longitude }}</strong></p>

      <!-- Map container -->
      <div id="map" class="map-container"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default defineComponent({
  name: 'GeolocalisationComponent',
  setup() {
    const latitude = ref<number | null>(null);
    const longitude = ref<number | null>(null);
    const errorMessage = ref<string | null>(null);

    const fetchLocation = () => {
      if (!navigator.geolocation) {
        errorMessage.value = "La géolocalisation n'est pas supportée par votre navigateur.";
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          latitude.value = position.coords.latitude;
          longitude.value = position.coords.longitude;
          errorMessage.value = null;
          
          nextTick(() => {
            initializeMap(position.coords.latitude, position.coords.longitude);
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage.value = "L'utilisateur a refusé la demande de géolocalisation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage.value = "Les informations de localisation sont indisponibles.";
              break;
            case error.TIMEOUT:
              errorMessage.value = "La demande de localisation a expiré.";
              break;
            default:
              errorMessage.value = "Une erreur inconnue est survenue.";
          }
        }
      );
    };

    const initializeMap = (lat: number, lng: number) => {
      const map = L.map('map').setView([lat, lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Fix pour icônes Leaflet
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });

      L.marker([lat, lng]).addTo(map)
        .bindPopup('Votre position actuelle')
        .openPopup();
    };

    onMounted(() => {
      fetchLocation();
    });

    return {
      latitude,
      longitude,
      errorMessage,
    };
  },
});
</script>
