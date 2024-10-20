<template>
    <div class="p-4 flex flex-col justify-between col-span-2  md:row-span-2  md:col-span-1 h bg-slate-50">
        <nav class="flex justify-between items-center px-3 w-full py-4">
            <span class="md:text-xl font-bold">
                Weather 
            </span>
            <div class="flex items-center justify-between md:w-2/4 p-2 bg-white rounded-md border  border-slate-200 " action="">
                <input class=" outline-none bg-transparent" placeholder="cc" type="search">
                <button class="relative">
                    
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
            </div>
        </nav>
        <div class="flex flex-col items-start gap-3">
            <h1 class="text-2xl font-bold  text-center">Londres</h1>
            <div class="flex flex-col">
                <span class="font-bold text-5xl xl:text-9xl">10°C</span>
                <span>Ciel dégagé</span>
            </div>
        </div>
       <div  class="h-5/6 rounded-lg" id="map">
       </div>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
import L from 'leaflet';

// Utiliser onMounted pour exécuter du code après le montage du composant
onMounted(() => {
  // Initialiser la carte après le montage du composant
  const map = L.map('map').setView([48.8566, 2.3522], 13); // Coordonées de Paris (latitude, longitude)

  // Ajouter une couche de tuiles (carte de base)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
});
</script>

<style lang="scss" scoped>

</style>