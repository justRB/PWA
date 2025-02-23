<template>
  <div class="battery-status-container">
    <h1 class="title">🔋 Niveau de batterie</h1>

    <div class="battery-info">
      <p class="battery-level">Niveau : {{ batteryLevel }}%</p>
      <p class="charging-status">
        {{ isCharging ? '🔌 En charge' : '⚡ Non en charge' }}
      </p>
    </div>

    <div class="battery-visual">
      <div class="battery-bar" :style="{ width: batteryLevel + '%' }"></div>
    </div>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface BatteryManager {
  level: number;
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  addEventListener(): void;
}

interface NavigatorExtended extends Navigator {
  getBattery?: () => Promise<BatteryManager>;
}

export default defineComponent({
  name: 'BatteryStatusComponent',
  setup() {
    const batteryLevel = ref<number>(0);
    const isCharging = ref<boolean>(false);
    const errorMessage = ref<string>('');

    const updateBatteryStatus = (battery: BatteryManager) => {
      batteryLevel.value = Math.floor(battery.level * 100);
      isCharging.value = battery.charging;
    };

    const getBatteryInfo = async () => {
      try {
        const navigatorExtended = navigator as NavigatorExtended;
        if (navigatorExtended.getBattery) {
          const battery = await navigatorExtended.getBattery();
          updateBatteryStatus(battery);
        } else {
          errorMessage.value = 'L’API Battery n’est pas supportée sur ce navigateur.';
        }
      } catch (error) {
        errorMessage.value = 'Impossible d’accéder au niveau de la batterie.';
        console.error('Erreur batterie :', error);
      }
    };

    onMounted(() => {
      getBatteryInfo();
    });

    return {
      batteryLevel,
      isCharging,
      errorMessage,
    };
  },
});
</script>