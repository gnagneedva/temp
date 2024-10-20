// stores/weather.ts
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weatherStore', {
  state: () => ({
    sharedClass: false, 
    sharedData: {} as Record<string, any> 
  }),
  actions: {
    updateClass() { 
      this.sharedClass = !this.sharedClass; 
    },
    updateData(newData: Record<string, any>) { 
      this.sharedData = newData;
    }
  }
})
