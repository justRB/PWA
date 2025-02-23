<template>
  <HomeComponent/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomeComponent from './components/HomeComponent.vue';

@Options({
  components: {
    HomeComponent,
  },
})

export default class App extends Vue {}
</script>
