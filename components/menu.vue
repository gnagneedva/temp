<template>
    <div 
    @click="sendClass"
    
    class="md:hidden p-2 bg-slate-500  z-50 cursor-pointer transition-all ease-in-out  rounded-md right-4 bottom-4 ">
    menu
    </div>
</template>

<script setup>

// Composant envoyeur
import { useWeatherStore } from '~/stores/weather'


const store = useWeatherStore()

const sendClass = () => {
  store.updateClass() 
  store.updateData({ message: 'Hello from Abc' }) 
  console.log("Class and Data Sent")
}

</script>

<style  scoped>

</style>