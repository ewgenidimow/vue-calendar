<template>
  <div class="container mt-5">
    <h1 class="text-center mb-5">Event calendar</h1>
    <div id="add-event" class="mt-5">
      <div class="d-flex justify-content-end">
        <button type="button"
                class="btn btn-outline-primary"
                @click.prevent="isVisible = !isVisible">Add event
        </button>
      </div>
      <div class="form-container row justify-content-md-center mt-5" >
        <div class="col-4">
          <div class="alert alert-success" v-show="isSubmitted">Success!</div>
          <ValidationObserver v-slot="{ handleSubmit, invalid }" ref="form" v-show="isVisible">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <div class="mb-3">
                <ValidationProvider :rules="{
                                            required: true,
                                            max:15,
                                          }" v-slot="{ errors }">
                  <label for="name" class="form-label">Name</label>
                  <input type="text"
                         class="form-control"
                         id="name"
                         v-model="eventData.title">
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mb-3">
                <ValidationProvider rules="required" v-slot="{ errors }">
                <label for="date" class="form-label">Date</label>
                  <date-picker
                    id="date"
                    v-model="eventData.date"
                    :editable="false"
                    :clearable = "false"
                    :disabled-date="disabledDatesCalendar"
                    value-type="YYYY-MM-DD"
                    format="YYYY-MM-DD"
                    :change="handleChange(eventData.date)"
                  ></date-picker>
                  <span class="error-message" v-show="isError">{{errorMsg}}</span>
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mb-3">
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <label for="email" class="form-label">Email</label>
                  <input type="text"
                         class="form-control"
                         id="email"
                         v-model="eventData.email">
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mb-3">
                <ValidationProvider rules="required|numeric|max:10" v-slot="{ errors }">
                  <label for="phone" class="form-label">Phone</label>
                  <input type="text"
                         class="form-control"
                         id="phone"
                         v-model="eventData.phone">
                  <span class="error-message">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mt-3">
                <button type="submit"
                        class="btn btn-outline-success"
                        :disabled="invalid || isError">Save</button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
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
            <p> {{ event.phone }} </p>
          </template>
        </li>
        <!--        Next month days-->
        <li class="inactive"
            v-for="date in (43 - (daysInMonth + firstDayOfMonth))">
          <span>{{ date }}</span>
        </li>
      </ul>
    </div>
    <div id="list-event" class="m-5">
      <h1 class="text-center">Event list information</h1>
      <table class="table mt-5">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
          <th scope="col">Email</th>
          <th scope="col">Phone</th>
        </tr>
        </thead>
        <tbody>
        <tr v-show="Object.keys(events).length === 0" class="text-center"><td colspan="5">No result</td></tr>
        <template v-for="event in events">
          <tr v-for="item in event">
            <th scope="row">{{item.id}}</th>
            <td>{{item.title}}</td>
            <td>{{item.date}}</td>
            <td>{{item.email}}</td>
            <td>{{item.phone}}</td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  export default {
    name: 'Calendar',
    components: {
      DatePicker
    },
    data() {
      return {
        today: moment(),
        dateContext: moment(),
        dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        arrDays: [],
        events: {},
        isVisible: false,
        isError: false,
        isSubmitted: false,
        errorMsg: '',
        eventData: {
          id: 1,
          title: '',
          date: '',
          email: '',
          phone: ''
        }
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
      handleChange(value){

        for(let key of Object.keys(this.events)) {
          if(value === key) {
            this.isError = true;
            this.errorMsg = 'Event date already exist.';
          } else {
            this.isError = false;
            this.errorMsg = '';
          }
        }
      },
      disabledDatesCalendar(date) {
        let today = moment().format('YYYY-MM-DD');
        return date < new Date(today)
      },
      onSubmit() {
        const eventArr = [{
          id: this.eventData.id,
          title: this.eventData.title,
          date: this.eventData.date,
          email: this.eventData.email,
          phone: this.eventData.phone,
        }];

        this.$refs.form.validate().then(success => {
          if (!success) {
            return;
          }

          this.$set(this.events, this.eventData.date, eventArr);

          this.isVisible = false;
          this.isSubmitted = true;

          setTimeout(()=> {
            this.isSubmitted = false;
          },3000);

          this.eventData = {
            id: this.eventData.id + 1,
            title: '',
            date: '',
            email: '',
            phone: '',
          };

          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        });

      },
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

