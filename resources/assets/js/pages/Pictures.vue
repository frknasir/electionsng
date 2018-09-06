<style scoped>
    #action-btn {
        position: relative;
        right: 20px;
        z-index: 3;
    }

    #action-btn .btn {
        position: fixed;
        right: 30px;
        bottom: 10%;
    }
</style>
<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div v-for="(i, index) in count" v-bind:key="index" class="col-md-6">
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Card title</h4>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                        <img class="card-img-top" src="https://images.unsplash.com/photo-1517303650219-83c8b1788c4c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bd4c162d27ea317ff8c67255e955e3c8&auto=format&fit=crop&w=2691&q=80" alt="Card image cap">
                    </div>
                </div>
            </div>
            <div id="action-btn">
                <button class="btn btn-success btn-fab btn-lg btn-round">
                    <i class="material-icons">add</i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                count: Array.apply(null, Array(10)).map(Number.prototype.valueOf,0)
            }
        }
    }
</script>
