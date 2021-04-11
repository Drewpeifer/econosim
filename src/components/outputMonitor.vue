<template>
  <div class="table-wrapper">
    <h2>Output Monitor</h2>
    <table>
      <tr class="header">
        <th>Name</th><th>Focus</th>
      </tr>
      <tr v-for="corporation in corporations" :key="corporation.id">
        <td>{{ corporation.name }}</td>
        <td>{{ corporation.focus }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'outputMonitor',
  data() {
      return {
        corporations : [
          {
            id : 0,
            name : 'corp1',
            focus : 'driving',
          },
          {
            id : 1,
            name : 'corp2',
            focus : 'combat',
          },
          {
            id : 2,
            name : 'corp3',
            focus : 'management',
          },
          {
            id : 3,
            name : 'corp4',
            focus : 'none',
          }
        ],
        factions : {

        },
        commodities : {

        },
        constants : {
          startDate : "01.01.3001",
          startTime : "00.00.00"
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
table {
  margin: 20px auto;
  border-collapse: collapse;
}
table, td, th {
  border: 1px #000 solid;
}
td, th {
  padding: 10px;
}
</style>
