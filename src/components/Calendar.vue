<template>
    <div id="calendar" class="mt-5">
      <div id="month">
        <a href="#"
           class="arrow left"
           @click.prevent="prevMonth"><i class="icon-previous"><</i></a>

        <p>{{ month + ' ' + year}}</p>

        <a href="#"
           class="arrow right"
           @click.prevent="nextMonth"><i class="icon-next">></i></a>
      </div>
      <ul id="week">
        <li v-for="day in dayNames">
          <span> {{ day }} </span>
        </li>
      </ul>
      <ul id="days">
        <!--        Previous month days-->
        <li class="inactive"
            v-for="date in (firstDayOfMonth - 1)">
          <span>{{ (daysInPreviousMonth - firstDayOfMonth) + date }}</span>
        </li>
        <!--        Current month days-->
        <li v-for="date in arrDays"
            :class="{ 'current-day': date.day == initialDate && month == initialMonth && year == initialYear,
                       'marked': date.event,
                       'weekend-day': weekendDays(date.fullDay)}">

          <span>{{ date.day }}</span>
          <template v-for="event in date.event" v-if="date.event">
            <h6> {{ event.title }} </h6>
            <p>For reservation: <br> {{ event.phone }} </p>
          </template>
        </li>
        <!--        Next month days-->
        <li class="inactive"
            v-for="date in (43 - (daysInMonth + firstDayOfMonth))">
          <span>{{ date }}</span>
        </li>
      </ul>
    </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Calendar',
    props: {
      events: {}
    },
    data() {
      return {
        today: moment(),
        dateContext: moment(),
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        arrDays: [],
      }
    },
    computed: {
      year() {
        return this.dateContext.format('Y');
      },

      month() {
        return this.dateContext.format('MMMM');
      },

      daysInMonth() {
        let days = this.dateContext.daysInMonth();

        this.getDaysByMonth(this.dateContext.daysInMonth());

        return days;
      },

      currentDate() {
        return this.dateContext.get('date');
      },

      firstDayOfMonth() {
        let firstDay = moment(this.dateContext).subtract((this.currentDate - 1), 'days');
        return firstDay.weekday();
      },

      previousMonth() {
        return moment(this.dateContext).subtract(1, "month");
      },

      daysInPreviousMonth() {
        return this.previousMonth.daysInMonth();
      },

      initialDate() {
        return this.today.get('date');
      },

      initialMonth() {
        return this.today.format('MMMM');
      },

      initialYear() {
        return this.today.format('Y');
      },
    },
    methods: {
      weekendDays(n) {
        let givenDate = moment(n).isoWeekday();
        return givenDate == 6 || givenDate == 7;
      },
      nextMonth() {
        this.dateContext = moment(this.dateContext).add(1, 'month');
      },

      prevMonth() {
        this.dateContext = moment(this.dateContext).subtract(1, 'month');
      },

      getDaysByMonth(days) {

        this.arrDays = [];

        while (days) {
          let fullDay = moment(this.dateContext).date(days).format('Y-MM-DD');
          let day = moment(this.dateContext).date(days).format('DD');

          if (this.events[fullDay]) {
            this.arrDays.push({day: day, fullDay: fullDay, event: this.events[fullDay]});
          } else {
            this.arrDays.push({day: day, fullDay: fullDay});
          }

          days--;
        }
        return this.arrDays.reverse();
      },
    },
  }
</script>
<style scoped lang="scss">
  @import '../assets/scss/sections/calendar';
</style>

