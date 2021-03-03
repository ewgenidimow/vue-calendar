import Vue from 'vue';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required, email, numeric } from 'vee-validate/dist/rules';

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend("required", {
  ...required,
  message: "Field is required.",
});

extend("max", {
  validate(value,{ length }) {
    return value.length <= length;
  },
  params: ['length'],
  message: "Field may not be greater than {length} characters",
});

extend("email", {
  ...email,
  message: "Enter valid email address.",
});
extend("numeric", {
  ...numeric,
  message: "Field may only contain numeric characters.",
});
