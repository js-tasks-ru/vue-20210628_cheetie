import { createApp } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

createApp({
  data() {
    return {
      meetupId: null,
      meetupTitle: null
    }
  },
  watch: {
    meetupId(id) {
      fetchMeetupById(id).then(data => this.meetupTitle = data.title);
    }
  }
}).mount('#app');