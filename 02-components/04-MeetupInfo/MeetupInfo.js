import { defineComponent } from './vendor/vue.esm-browser.js';
import { formatAsLocaleDateString, formatAsISODateString } from './utils/date-formats.js';

export default defineComponent({
  name: 'MeetupInfo',
  props: {
    organizer: {
      type: String,
      required: true
    },
    place: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    },
  },
  
  methods: {
    formatAsLocaleDateString,
    formatAsISODateString,
  },

  template: `
    <ul class="meetup-info">
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon meetup-info__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="formatAsISODateString(date)">
        {{ formatAsLocaleDateString(date) }}
        </time>
      </li>
    </ul>`,
});
