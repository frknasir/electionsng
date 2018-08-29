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
        <div class="text-center">
            <h2 class="title title-modern">Final results</h2>
        </div>
        <table id="final-results-dt" class="table table-success table-striped table-bordered">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Party</th>
                    <th>Candidate</th>
                    <th>Votes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        1
                    </td>
                    <td>Andrew Mike</td>
                    <td>Develop</td>
                    <td>2013</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        mounted() {
        },
        created() {

        },
        data() {
            return {

            }
        },
        computed: {

        },
        methods: {

        }
    }
</script>