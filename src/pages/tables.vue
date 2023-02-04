<template>
  <v-app>
    <v-container class="container">
      <vue-particles
        color="#05a0bf"
        :particleOpacity="1"
        :particlesNumber="25"
        shapeType="triangle"
        :particleSize="5"
        linesColor="#00fded"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.5"
        :linesDistance="150"
        :moveSpeed="1"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="false"
        clickMode="push"
      >
      </vue-particles>
      <v-card class="grid" width="80%" shaped color="transparent"
        ><v-card class="grid2" color="transparent">
          <v-card color="transparent" class="grid4">
            <v-text-field
              v-model="tables.length"
              readonly
              prepend-icon="mdi-table-picnic"
              flat
              solo
              hide-details
              class="custom-label-color"
              color="#fff"
            ></v-text-field
          ></v-card>
          <v-data-table
            :headers="headers"
            :items="tables"
            :sort-by="['tableStatus']"
            :sort-desc="[false, true]"
            :footer-props="{
              'items-per-page-options': [15, 30, 45, 60, 75],
            }"
            :items-per-page="15"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-card color="transparent" height="fit-content"
                    ><v-row dense
                      ><v-col class="colclass"
                        ><v-card class="grid4" color="transparent">
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search for a table"
                            class="custom-label-color"
                            color="#fff"
                            >Search</v-text-field
                          >
                        </v-card></v-col
                      ><v-col class="colclass"
                        ><v-card class="grid4" height="70px" color="transparent"
                          ><v-btn
                            color="#05a0bf"
                            dark
                            class="mb-2"
                            v-bind="attrs"
                            v-on="on"
                          >
                            New Table
                          </v-btn></v-card
                        ></v-col
                      ></v-row
                    ></v-card
                  >
                </template>
                <v-card class="grid4" color="#001736">
                  <v-card-text class="cardtitle">
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-text>
                  <v-card color="transparent" class="grid3">
                    <v-card-text class="producttitle"
                      >Enter a Table Number</v-card-text
                    >
                    <v-text-field
                      v-model="editedItem.tableNumber"
                      flat
                      solo
                      class="custom-form-color"
                      color="#fff"
                    ></v-text-field>
                  </v-card>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cancel
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="addTablee(editedItem)"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td @click="select(item._id)">
                  <div class="d-flex justify-center">
                    {{ item.tableNumber }}
                  </div>
                </td>
                <td @click="select(item._id)">
                  <div class="d-flex justify-center">
                    {{ item.tableId }}
                  </div>
                </td>
                <td @click="select(item._id)">
                  <div class="d-flex justify-center">
                    {{ item.tableStatus }}
                  </div>
                </td>
                <td @click="select(item._id)">
                  <div class="d-flex justify-center">
                    {{ item.updated_at }}
                  </div>
                </td>
                <td>
                  <div class="d-flex justify-center">
                    <v-icon small @click="deleteTablee(item)">
                      mdi-delete
                    </v-icon>
                  </div>
                </td>
              </tr>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="getTables"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-card></v-card
      ></v-container
    ></v-app
  >
</template>

<script>
import DataService from "../services/dataService.js";
const dataService = new DataService();

export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      table: {},
      tables: [],
      editedIndex: -1,
      editedItem: {},
      search: "",
      headers: [
        {
          text: "Table Number",
          align: "center",
          class: "Dark blue",
          value: "tableNumber",
          sortable: false,
        },
        {
          text: "Table Id",
          align: "center",
          class: "Dark blue",
          value: "tableId",
        },
        {
          text: "Table Status",
          align: "center",
          class: "Dark blue",
          value: "tableStatus",
        },
        {
          text: "Updated at",
          align: "center",
          class: "Dark blue",
          value: "updated_at",
          sortable: false,
          filterable: false,
        },
        {
          text: "Actions",
          align: "center",
          class: "Dark blue",
          value: "actions",
          sortable: false,
          filterable: false,
        },
      ],
      showAddTable: false,
      showdeleteTable: false,
    };
  },

  mounted() {
    this.getTables();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Table" : "New Table";
    },
  },

  methods: {
    async getTables() {
      try {
        this.$setLoader();
        await dataService.getTables().then((res) => {
          this.tables = res.data.tables;
        });

        this.$disableLoader();
      } catch (error) {
        alert(error.response.data.message)
      }
    },

    addTable() {
      this.showAddTable = true;
      this.showdeleteTable = false;
    },
    async addTablee(table) {
      try {
        this.$setLoader();
        await dataService.addTable(table).then((res) => {
          this.status = res;
          alert("Successfully added table.");
          this.$router.go(0);
        });
        this.$disableLoader();
      } catch (error) {
        console.log(error);
      }
    },

    deleteTable() {
      this.showAddTable = false;
      this.showdeleteTable = true;
    },

    async deleteTablee(cardId) {
      this.$setLoader();
      await dataService.deleteTable({ _id: cardId }).then((res) => {
        console.log(res);
        this.$router.go(0);
      });
      this.$disableLoader();
    },

    editItem(item) {
      this.editedIndex = this.tables.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.tables[this.editedIndex], this.editedItem);
      } else {
        this.tables.push(this.editedItem);
      }
      this.close();
    },

    async select(cardId) {
      this.$setLoader();
      this.$router.push({ path: `/orders/${cardId}` });
      this.$disableLoader();
    },
  },
};
</script>

<style scoped lang="css">
.container {
  margin-top: 1%;
  max-width: none !important;
}

.button {
  margin-top: 2%;
}
.logo {
  height: 75px;
  width: 300px;
  margin-bottom: 15px;
  background-color: #fffafa00;
  box-shadow: none;
}

.grid {
  margin-bottom: 2% !important;
  /* margin-bottom: 1% !important; */
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
  background-color: transparent;
  /* display: grid !important; */
  /* background-image: linear-gradient(to right, #FFCF9F, #FF889C); */
}
.grid2 {
  margin-top: auto !important;
  margin-bottom: auto !important;
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
  /* background-image: linear-gradient(to right, #FFCF9F, #FF889C); */
}

.grid3 {
  margin-top: 1% !important;
  margin-bottom: 1% !important;
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
}

.grid4 {
  margin-top: 1% !important;
  margin-bottom: 1% !important;
  margin-right: auto !important;
  margin-left: auto !important;
  place-items: center;
  display: grid;
}

#particles-js {
  background-color: #001736;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.v-application .elevation-16 {
  box-shadow: 0px 8px 10px -5px #05a0bf,
    0px 16px 24px 2px rgba(255, 255, 255, 0.14),
    0px 6px 30px 5px rgba(0, 0, 0, 0.12) !important;
}

.v-application .elevation-12 {
  box-shadow: 0px 3px 5px -1px #001736, 0px 5px 8px 0px rgba(0, 0, 0, 0.14),
    0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
}
.v-application .elevation-6 {
  box-shadow: 0px 3px 5px -1px #05a0bf, 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12) !important;
}

.cardtitle {
  font-size: 15px;
  font-weight: bolder;
  color: #ffffff !important;
  text-decoration: none;
  text-align: center;
}

.carddesc {
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  color: #05a0bf !important;
}

.carddesc2 {
  font-size: 14px;
  text-decoration: none;
  text-align: center;
  color: #dc1b1b !important;
}

.producttitle {
  font-size: 18px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  color: #fff !important;
  justify-content: center;
  align-items: center;
}

.stepper-header {
  background-color: #001736;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0),
    0px 2px 2px 0px rgba(0, 0, 0, 0), 0px 1px 5px 0px rgba(0, 0, 0, 0);
}

.colclass {
  flex: 0 0 50%;
  max-width: inherit !important;
  padding-top: 8px !important;
  padding-right: 8px !important;
  padding-bottom: 8px !important;
  padding-left: 8px !important;
}
</style>
