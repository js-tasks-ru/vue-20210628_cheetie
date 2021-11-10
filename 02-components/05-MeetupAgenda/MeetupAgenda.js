import { defineComponent } from './vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  
  components: {
    MeetupAgendaItem,
  },
  
  props: {
    agenda: {
      type: Array,
      required: true
    }
  },

  template: `
    <ul v-for="agendaItem in agenda" :key="agendaItem.id" class="agenda">
      <li class="agenda__item">
        <MeetupAgendaItem :agendaItem="agendaItem"></MeetupAgendaItem>
      </li>
    </ul>`,
});
