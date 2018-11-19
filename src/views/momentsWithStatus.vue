<template>
    <div>
        <header-top></header-top>

        <div class="momentsList">
            <table class="table">
                <thead class="thead-dark">
                <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Status</th>
                    <th scope="col">Description</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                <template v-if="momentsCount > 0">
                    <tr v-for="moment in moments">
                        <th scope="row">
                            <img :src="moment.media.thumb" alt="">
                        </th>
                        <td class="align-middle">
                            <template v-if="statusData === 'like'">
                                <font-awesome-icon icon="thumbs-down" />
                            </template>
                            <template v-else>
                                <font-awesome-icon icon="thumbs-up" />
                            </template>
                        </td>
                        <td class="align-middle">
                            {{moment.description}}
                        </td>
                        <td class="align-middle">
                            <button :class="statusData.status" :data-id="moment.id" @click="setLike($event)">
                                {{statusData.buttonText}}
                            </button>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <th>No moments left </th>
                    </tr>
                </template>
                </tbody>
            </table>

        </div>

        <navigation></navigation>
    </div>
</template>

<script>
    import navigation from "../components/navigation";
    import headerTop from "../components/header";

    export default {
        name: "momentsWithStatus",
        components: {
            "navigation": navigation,
            "headerTop": headerTop
        },
        data() {
            let momentList = _.cloneDeep(this.$store.getters.getMoments);
            let statusData = {
                buttonText: null,
                toSet: null,
                icon: null,
                status: this.$route.params.status
            };

            // If status is "like", get just the liked moments, and set the template data correctly
            if(statusData.status === "like") {
                momentList = _.filter(momentList, function(moment) { return moment.like === true });
                statusData.toSet = false;
                statusData.buttonText = "DISLIKE";
                statusData.icon = "times";
            }
            else if(statusData.status === "dislike") {
                momentList = _.filter(momentList, function(moment) { return moment.like === false });
                statusData.toSet = true;
                statusData.buttonText = "LIKE";
                statusData.icon = "heart";
            }

            return {
                moments: momentList,
                statusData,
                momentsCount: momentList.length
            }
        },
        methods: {
            /**
             * Shoot the like status chosen by user to the store
             */
            setLike: function(event) {
                const that = this;

                // get the moment id
                const id = event.target.dataset.id;
                that.$store.dispatch("setMomentLike", {id, status: that.statusData.toSet}).then(function(response) {
                    const index = _.findIndex(that.moments, function(moment) { return moment.id === id});
                    that.moments.splice(index, 1);
                    that.momentsCount--;
                    that.$forceUpdate()
                }, function(error) {
                    that.$modal.show('dialog', {
                        title: 'Erreur!',
                        text: error,
                        buttons: [
                            {
                                title: 'Close'
                            }
                        ]
                    });
                })
            }
        }
    }
</script>

<style scoped>

</style>