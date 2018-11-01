<style scoped>

</style>

<template>
    <div class="content">
        <div class="container">


            <div class="jumbotron mb-5 p-5 text-white rounded bg-success">
                <div class="row">
                    <div class="col-md-6 px-0">
                        <h1 class="display-4">
                            Beta Testing
                        </h1>
                        <p class="lead my-3">
                            This is a beta version of the ElectionNG 
                            platform to be rolled out soon. The following 
                            user credentials can be used for the testing 
                            purposes. Suggestions and bugs should be reported 
                            to the following email: faruk@ptcij.org. Thank You.
                        </p>
                        <table class="table table-bordered">
                            <thead>
                                <th>Id</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Password</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Super-admin</td>
                                    <td>super-admin@electionsng.com</td>
                                    <td>testpassword</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Admin</td>
                                    <td>admin@electionsng.com</td>
                                    <td>testpassword</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Tracking Officer</td>
                                    <td>tracker@electionsng.com</td>
                                    <td>testpassword</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Data Entry</td>
                                    <td>data@electionsng.com</td>
                                    <td>testpassword</td>
                                </tr>
                            </tbody>
                            <tfoot></tfoot>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <img class="card-img-right img-fluid flex-auto d-lg-block" 
                            :src="'/images/beta.png'" 
                            alt="Card image cap">
                    </div>
                </div>
                
            </div>

            <!-- Browse Election Component -->
            <browse-elections></browse-elections>
        </div>
    </div>
</template>

<script>
    import bg from '../../../../template/material-dashboard-html-v2.1.0/assets/img/cover.jpg';
    import BrowseElections from '../components/elections/BrowseElections.vue';
    
    export default {
        components: {
            BrowseElections
        },
        data() {
            return {
                bg: bg
            }
        }
    }
</script>


