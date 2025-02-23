<template>
  <div>
    <div class="home-container">TP PWA</div>
    <div class="sections">
      <CameraComponent/>
      <GeolocalisationComponent/>
      <PhoneCallComponent/>
      <BatteryStatusComponent/>
      <VibrationComponent/>
      <ChatComponent/>
    </div>
  </div>
</template>
   
<script lang="ts">
import CameraComponent from './CameraComponent.vue';
import GeolocalisationComponent from './GeolocalisationComponent.vue';
import PhoneCallComponent from './PhoneCallComponent.vue';
import BatteryStatusComponent from './BatteryStatusComponent.vue';
import VibrationComponent from './VibrationComponent.vue';
import ChatComponent from './ChatComponent.vue';

export default {
  name: 'HomeComponent',
  components: {
    CameraComponent,
    GeolocalisationComponent,
    PhoneCallComponent,
    BatteryStatusComponent,
    VibrationComponent,
    ChatComponent,
  },
};
</script>