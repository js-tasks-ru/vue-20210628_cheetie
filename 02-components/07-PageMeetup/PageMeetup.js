import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },
  
  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      meetup: null,
      error: null,
      loading: false
    }
  }, 
  
  methods: {
    loadMeetup() {
      this.meetup = null;
      this.error = null;
      this.loading = true;
      
      fetchMeetupById(this.meetupId)
        .then(meetup => this.meetup = meetup)
        .catch(error => this.error = error)
        .then(() => this.loading = false);
    }
  },
  
  mounted() {
    this.loadMeetup();
  },
  
  watch: {
    meetupId() {
      this.loadMeetup();
    }
  },

  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetup" :meetup="meetup"/>

      <ui-container v-else-if="loading">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="error">
        <ui-alert>{{ error.message }}</ui-alert>
      </ui-container>
    </div>`,
});
