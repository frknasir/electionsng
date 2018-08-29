<style scoped>
    /*
	Max width before this PARTICULAR table gets nasty. 
    This query will take effect for any screen smaller 
    than 760px and also iPads specifically.
	*/
	@media
    only screen 
    and (max-width: 760px), (min-device-width: 768px) 
    and (max-device-width: 1024px)  {

		/* Force table to not be like tables anymore */
		table, thead, tbody, th, td, tr {
			display: block;
		}

		/* Hide table headers (but not display: none;, for accessibility) */
		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

		td:before {
			/* Now like a table header */
			position: relative;
			/* Top/left values mimic padding */
			top: 0;
			left: 6px;
			width: 45%;
			padding-right: 50px;
			white-space: nowrap;
		}

		/*
		Label the data
        You could also use a data-* attribute and content 
        for this. That way "bloats" the HTML, this way 
        means you need to keep HTML and CSS in sync. 
        Lea Verou has a clever way to handle with text-shadow.
		*/
		td:nth-of-type(1):before { content: "Id: "; }
		td:nth-of-type(2):before { content: "Party: "; }
		td:nth-of-type(3):before { content: "Aspirant: "; }
		td:nth-of-type(4):before { content: "Deputy: "; }
		td:nth-of-type(5):before { content: "Bio: "; }
	}
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
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        components: {
        },
        mounted() {
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

