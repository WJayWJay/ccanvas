<template>
  <div class="home">

    <CCanvas />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import CCanvas from '@/components/CCanvas.vue'; // @ is an alias to /src

@Component({
  components: {
    CCanvas,
  },
})
export default class Home extends Vue {}
</script>
