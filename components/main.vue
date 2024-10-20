<template>
    <div class="p-4 flex flex-col h-screen  col-span-3 md:col-span-2 bg-slate-50">
        <nav class="flex justify-between gap-3 items-center px-2 w-full py-4">
            <span class="md:text-xl font-bold">
                Weather 
            </span>
            <div class="flex items-center justify-between  md:w-2/4 p-2 bg-white rounded-md border  border-slate-200 " action="">
                <input class=" outline-none bg-transparent" placeholder="Rechercher une ville" type="search">
                <button @click="rechercherVille" class="relative">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </button>
            </div>
            <Menu/>
        </nav>
        <div class="grid grid-cols-3 pb-4">
            <div class="flex flex-col relative items-start gap-3">
                <h1 class="text-2xl font-bold  text-center">Londres</h1>
                <div class="flex flex-col">
                    <span class="font-bold text-5xl xl:text-9xl">10°C</span>
                    <span>Ciel dégagé</span>
                </div>
            </div>
            <div class="col-span-2 flex gap-3 flex-wrap items-center">
                <div class="rounded text-sm flex p-1 flex-col w-fit h-fit bg-slate-200"><span>Humidité</span><span>25%</span></div>
                <div class="rounded text-sm flex p-1 flex-col w-fit h-fit bg-slate-200"><span>Pression</span><span>25%</span></div>
                <div class="rounded text-sm flex p-1 flex-col w-fit h-fit bg-slate-200"><span>Vent</span><span>25%</span></div>
                <div class="rounded text-sm flex p-1 flex-col w-fit h-fit bg-slate-200"><span>nuages</span><span>25%</span></div>
                <div class="rounded text-sm flex p-1 flex-col w-fit h-fit bg-slate-200"><span>Visibilité</span><span>25%</span></div>
                <div class="rounded text-sm flex p-1 flex-col w-fit h-fit bg-slate-200"><span>Humidité</span><span>25%</span></div>
                <div class="rounded text-sm flex p-1 flex-col w-fit h-fit bg-slate-200"><span>Humidité</span><span>25%</span></div>
                
            </div>
        </div>
       <div  class="grow rounded-lg" id="map">
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


import {  watch } from 'vue'

import axios from 'axios' // On utilise axios pour faire des requêtes HTTP

// Variables réactives pour la météo, la ville, la latitude et la longitude
const weather = ref(null)
const city = ref('')
const lat = ref(null)
const lon = ref(null)

const apiKey = 'TA_CLE_API_OWM' // Remplace par ta clé API OpenWeatherMap

// Fonction pour récupérer la météo selon la localisation de l'utilisateur
const getWeatherByLocation = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat.value = position.coords.latitude
      lon.value = position.coords.longitude

      // Requête à l'API météo avec la latitude et la longitude
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&appid=${apiKey}&units=metric&lang=fr`
      )

      weather.value = response.data
    }, () => {
      console.log("Erreur lors de la récupération de la localisation.")
    })
  }
}

// Fonction pour récupérer la météo selon une ville recherchée
const rechercherVille= async () => {
  if (city.value) {
    // Requête à l'API météo avec le nom de la ville
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric&lang=fr`
    )
    
    // Mise à jour des informations météo
    weather.value = response.data
    
    // Mise à jour des coordonnées de la ville recherchée
    lat.value = weather.value.coord.lat
    lon.value = weather.value.coord.lon
    
    // Mettre à jour la carte avec la nouvelle position
    updateMap()
}
console.log(response)
}

// Fonction pour initialiser et mettre à jour la carte Leaflet
const updateMap = () => {
  if (lat.value && lon.value) {
    // Créer une carte centrée sur la position de l'utilisateur ou la ville recherchée
    const map = L.map('map').setView([lat.value, lon.value], 10)

    // Ajouter un fond de carte avec OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map)

    // Ajouter un marqueur sur la carte à la position (lat, lon)
    L.marker([lat.value, lon.value]).addTo(map)
  }
}

// Lorsque le composant est monté, on récupère la météo par géolocalisation
onMounted(() => {
  getWeatherByLocation()
})

// Si la latitude ou la longitude changent, on met à jour la carte
watch([lat, lon], () => {
  updateMap()
})
</script>

<style lang="scss" scoped>

</style>