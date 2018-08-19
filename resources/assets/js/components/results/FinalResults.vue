<style scoped>

</style>
<template>
    <div>
        <div class="text-center">
            <h2 class="title title-modern">Final results</h2>
        </div>
        <table id="final-results-dt" class="table table-success table-striped table-bordered">
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
</template>
<script>
    export default {
        mounted() {
            $('#final-results-dt').DataTable({
                "pagingType": "simple_numbers",
                language: {
                    search: "_INPUT_",
                    searchPlaceholder: "Search results",
                    "emptyTable": "There are no results to be shown"
                },
                "processing": true,
            });
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