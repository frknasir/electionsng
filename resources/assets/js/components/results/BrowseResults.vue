<style scoped>

</style>
<template>
    <div>
        <div id="toolbar">
            <div class="form-check form-check-radio form-check-inline disabled">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type"  
                        value="state" v-model="location_type" disabled> State
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
            <div class="form-check form-check-radio form-check-inline">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type"  
                        value="lg" v-model="location_type"> Local Government
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
            <div class="form-check form-check-radio form-check-inline disabled">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type" 
                        value="ra" v-model="location_type"> Registration Area
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
            <div class="form-check form-check-radio form-check-inline disabled">
                <label class="form-check-label">
                    <input class="form-check-input" type="radio" 
                        name="pu-location_type" 
                        value="pu" v-model="location_type"> Polling Unit
                    <span class="circle">
                        <span class="check"></span>
                    </span>
                </label>
            </div>
        </div>
        <div class="mb-3">
            <form>
                <div class="form-row">
                    <div v-show="location_type === 'state' || location_type === 'lg' || location_type === 'ra' || location_type === 'pu'" 
                        class="col">
                        <label for="state">State</label>
                        <select class="form-control form-control-success" name="state" id="state">
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div v-show="location_type === 'lg' || location_type === 'ra' || location_type === 'pu'" 
                        class="col">
                        <label for="lg">Local Government</label>
                        <select class="form-control form-control-success" name="state" id="lg">
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div v-show="location_type === 'ra' || location_type === 'pu'"
                        class="col">
                        <label for="ra">Registration Area</label>
                        <select class="form-control form-control-success" name="state" id="ra">
                            <option value="1">1</option>
                        </select>
                    </div>
                    <div v-show="location_type === 'pu'" class="col">
                        <label for="pu">Polling Unit</label>
                        <select class="form-control form-control-success" name="state" id="pu">
                            <option value="1">1</option>
                        </select>
                    </div>
                </div>
                <button v-show="location_type === 'state' || location_type === 'lg' || location_type === 'ra' || location_type === 'pu'" 
                    type="submit" class="btn btn-success">
                    Get Results
                </button>
            </form>
        </div>
        <div>
            <div class="text-center">
                <h2 class="title title-modern">Showing results from: </h2>
            </div>
            <table id="browse-results-dt" class="table table-success table-striped table-bordered">
                <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>Party</th>
                        <th>Candidate</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center">
                            1
                        </td>
                        <td>Andrew Mike</td>
                        <td>Develop</td>
                        <td>2013</td>
                    </tr>
                    <tr>
                        <td class="text-center">2</td>
                        <td>John Doe</td>
                        <td>Design</td>
                        <td>2012</td>
                    </tr>
                    <tr>
                        <td class="text-center">3</td>
                        <td>Alex Mike</td>
                        <td>Design</td>
                        <td>2010</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="mt-5">
            <charts></charts>
        </div>
    </div>
</template>
<script>
    import Charts from './Charts.vue';

    export default {
        components: {
            Charts
        },
        mounted() {
            $('#browse-results-dt').DataTable({
                "pagingType": "simple_numbers",
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search results",
                    "emptyTable": "There are no results to be shown"
                },
                responsive: true,
                "processing": true,
            });
        },
        created() {

        },
        data() {
            return {
                location_type: ''
            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>

