<template>
  <div id="add-event" class="mt-5">
    <div class="d-flex justify-content-end">
      <button type="button"
              class="btn btn-outline-primary"
              @click.prevent="isVisible = !isVisible">Add event
      </button>
    </div>
    <div class="form-container row justify-content-md-center mt-5">
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
                  :clearable="false"
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
                      :disabled="invalid || isError">Save
              </button>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import moment from 'moment';

  export default {
    name: "AddEvent",
    components: {
      DatePicker
    },
    props: {
      events: {},
    },
    data(){
      return {
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
    methods: {
      handleChange(value) {
        for (let key of Object.keys(this.events)) {
          if (value === key) {
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

          setTimeout(() => {
            this.isSubmitted = false;
          }, 3000);

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
    }

  }
</script>

<style scoped>
  @import '../assets/scss/sections/forms.scss';
</style>
