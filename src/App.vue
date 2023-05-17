<template>
  <main>
    <div class="col-country">
      <h1>Selecciona los paises</h1>
      <div class="country" v-for="(country, i) in countrys" :key="i">
        <label :for="country.iso"
          ><input
            type="checkbox"
            :id="country.iso"
            :value="country.iso"
            v-model="countrySelected"
          />
          <span>{{ country.emoji }}</span> {{ country.name }}</label
        >
      </div>
    </div>
    <div class="col-flag">
      <label for="">Indica la fecha del lanzamiento</label>
      <input type="text" v-model="selectHour" v-date />
      <p v-for="(country, i) in otherCountry" :key="i">
        {{ country.date }} <span v-for="(flag, index) in country.countrys" :key="index">{{ flag.emoji }} </span>
      </p>
    </div>
  </main>
</template>

<script>
import { computed, ref } from "vue";

const americaCountries = [
  {
    iso: "AR",
    iana: "America/Argentina/Buenos_Aires",
    name: "Argentina",
    emoji: "\u{1F1E6}\u{1F1F7}",
  },
  {
    iso: "BO",
    iana: "America/La_Paz",
    name: "Bolivia",
    emoji: "\u{1F1E7}\u{1F1F4}",
  },
  {
    iso: "BR",
    iana: "America/Sao_Paulo",
    name: "Brasil",
    emoji: "\u{1F1E7}\u{1F1F7}",
  },
  {
    iso: "CL",
    iana: "America/Santiago",
    name: "Chile",
    emoji: "\u{1F1E8}\u{1F1F1}",
  },
  {
    iso: "CO",
    iana: "America/Bogota",
    name: "Colombia",
    emoji: "\u{1F1E8}\u{1F1F4}",
  },
  {
    iso: "CR",
    iana: "America/Costa_Rica",
    name: "Costa Rica",
    emoji: "\u{1F1E8}\u{1F1F7}",
  },
  {
    iso: "CU",
    iana: "America/Havana",
    name: "Cuba",
    emoji: "\u{1F1E8}\u{1F1FA}",
  },
  {
    iso: "DO",
    iana: "America/Santo_Domingo",
    name: "República Dominicana",
    emoji: "\u{1F1E9}\u{1F1F4}",
  },
  {
    iso: "EC",
    iana: "America/Guayaquil",
    name: "Ecuador",
    emoji: "\u{1F1EA}\u{1F1E8}",
  },
  {
    iso: "GT",
    iana: "America/Guatemala",
    name: "Guatemala",
    emoji: "\u{1F1EC}\u{1F1F9}",
  },
  {
    iso: "HN",
    iana: "America/Tegucigalpa",
    name: "Honduras",
    emoji: "\u{1F1ED}\u{1F1F3}",
  },
  {
    iso: "MX",
    iana: "America/Mexico_City",
    name: "México",
    emoji: "\u{1F1F2}\u{1F1FD}",
  },
  {
    iso: "NI",
    iana: "America/Managua",
    name: "Nicaragua",
    emoji: "\u{1F1F3}\u{1F1EE}",
  },
  {
    iso: "PA",
    iana: "America/Panama",
    name: "Panamá",
    emoji: "\u{1F1F5}\u{1F1E6}",
  },
  {
    iso: "PE",
    iana: "America/Lima",
    name: "Perú",
    emoji: "\u{1F1F5}\u{1F1EA}",
  },
  {
    iso: "PY",
    iana: "America/Asuncion",
    name: "Paraguay",
    emoji: "\u{1F1F5}\u{1F1FE}",
  },
  {
    iso: "SV",
    iana: "America/El_Salvador",
    name: "El Salvador",
    emoji: "\u{1F1F8}\u{1F1FB}",
  },
  {
    iso: "US",
    iana: "America/New_York",
    name: "Estados Unidos",
    emoji: "\u{1F1FA}\u{1F1F8}",
  },
  {
    iso: "UY",
    iana: "America/Montevideo",
    name: "Uruguay",
    emoji: "\u{1F1FA}\u{1F1FE}",
  },
  {
    iso: "VE",
    iana: "America/Caracas",
    name: "Venezuela",
    emoji: "\u{1F1FB}\u{1F1EA}",
  },
];

export default {
  setup() {
    const countrySelected = ref([]);
    const selectHour = ref(null);
    const countrys = [...americaCountries];

    const setTimeLocale = (hour, iana) => {
      const originTime = new Date(hour);
      const date = originTime.toLocaleString("en-US", {
        timeZone: iana,
      });
      const hours = new Date(date).getHours();
      const minutes = new Date(date).getMinutes().toString().padStart(2, 0);
      return { hours, minutes };
    };

    const otherCountry = computed(() => {
      if (selectHour.value) {
        return countrys
          .map((e) => {
            const localTime = setTimeLocale(selectHour.value, e.iana);
            const date = `${localTime.hours}:${localTime.minutes}`;
            return { date, ...e };
          })
          .filter((e) => countrySelected.value.includes(e.iso))
          .reduce((acc, e) => {
            const date = e.date;
            const existingItem = acc.find((item) => item.date === date);
            if (existingItem) {
              existingItem.countrys.push({ ...e });
            } else {
              acc.push({ date, countrys: [{ ...e }] });
            }
            return acc;
          }, []);
      }
      return [];
    });

    return { countrys, countrySelected, selectHour, otherCountry };
  },
};
</script>

<style scoped>
* {
  font-family: "Courier New", Courier, monospace;
}
input[type="text"] {
  background: #fff;
  border: #d6dbdf solid 1px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  outline: none;
  margin-top: 5px;
  border-radius: 12px;
}
main {
  width: 80%;
  margin: 0 auto;
}
p span,
.country span {
  font-size: 24px;
  display: inline-block;
  vertical-align: middle;
}
.country {
  padding: 5px 10px;
}

.col-country,
.col-flag,
.country {
  display: inline-block;
  box-sizing: border-box;
  width: 50%;
  vertical-align: top;
}

.col-flag {
  padding: 50px;
}
</style>
