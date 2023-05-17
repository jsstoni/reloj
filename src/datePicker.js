import flatpickr from "flatpickr";
import { Spanish } from "flatpickr/dist/l10n/es.js";
import "flatpickr/dist/flatpickr.min.css";

const datePicker = {
  mounted: (el, binding) => {
    flatpickr(el, {
      enableTime: true,
      dateFormat: "Y-m-d H:i:00",
      locale: Spanish,
      onChange: (selectedDates) => {
        binding.value = selectedDates[0];
      },
    });
  },
};

export default datePicker;
