<template>
  <div class="container mt-5">
    <h1 class="text-center mb-5">Event calendar</h1>
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
            v-for="date in (firstDayOfMonth - 1)"
        >
          <span>{{ (daysInPreviousMonth - firstDayOfMonth) + date }}</span>
        </li>
        <!--        Current month days-->
        <li v-for="date in arrDays"
            :class="{ 'current-day': date.day == initialDate && month == initialMonth && year == initialYear,
                       'marked': date.event,
                       'inactive': date.fullDay < today.format('Y-MM-DD') && date.event,
                       'weekend-day': weekendDays(date.fullDay)}"
        >

          <span>{{ date.day }}</span>
          <template v-for="event in date.event" v-if="date.event">
            <h6> {{ event.title }} </h6>
            <p> {{ event.desc }} </p>
          </template>
        </li>
        <!--        Next month days-->
        <li class="inactive"
            v-for="date in (43 - (daysInMonth + firstDayOfMonth))"
        >
          <span>{{ date }}</span>
        </li>
      </ul>
    </div>
    <div id="list-event" class="m-5">
      <h1 class="text-center">Event list</h1>
      <table class="table mt-5">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(event, i) in events" :key="i">
          <template v-for="item in event">
            <th scope="row">{{item.id}}</th>
            <td>{{item.title}}</td>
            <td>{{item.date}}</td>
            <td>{{item.desc}}</td>
          </template>

        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: 'Calendar',
    data() {
      return {
        today: moment(),
        dateContext: moment(),
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        arrDays: [],
        events: {
          '2021-01-14': [{
            id: '1',
            date: '2021-01-14',
            title: 'A',
            desc: 'Lorem ipsum dolor situn amet, consectetur'
          }],
          '2021-01-29': [{
            id: '2',
            date: '2021-01-29',
            title: 'B',
            desc: 'Lorem ipsum dolor situn amet, consectetur'
          }],
          '2021-01-24': [{
            id: '3',
            date: '2021-01-24',
            title: 'C',
            desc: 'Lorem ipsum dolor situn amet, consectetur'
          }],
        },
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
  @import '../../assets/scss/sections/calendar';
</style>

