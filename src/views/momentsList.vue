<template>
    <div>
        <header-top></header-top>

        <div v-if="momentsCount > 0">
            <div class="momentContainer" :data-id="getFirstMoment('id')">
                <div class="momentCard">
                    <img :src="getMomentImage('large')" alt="">
                    <p>
                        {{getFirstMoment('description')}}
                    </p>
                </div>
                <div class="buttons">
                    <div class="buttonsContainer">
                        <div class="dislike likeButton" data-status=false @click="setLike">
                            <font-awesome-icon icon="times" />
                        </div>
                        <div class="like likeButton" data-status=true @click="setLike">
                            <font-awesome-icon icon="heart" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="momentContainer">
                <p>
                    NO MOMENTS LEFT
                </p>
            </div>
        </div>

        <navigation></navigation>
    </div>


</template>

<script>
    import $ from "jquery";
    import navigation from "../components/navigation";
    import headerTop from "../components/header";
    export default {
        name: "momentsList",
        components: {
            "navigation": navigation,
            "headerTop": headerTop
        },
        data() {
            let momentsList = _.cloneDeep(this.$store.getters.getMoments);
            _.each(momentsList, function(moment, key) { // Get only the null moments like
                if(!_.isNull(moment.like)) {
                    delete momentsList[key]
                }
            });
            return {
                moments: momentsList,
                momentsCount: _.size(momentsList),
                isSwiping: false
            }
        },
        methods: {
            /**
             * Shoot the like status chosen by user to the store
             */
            setLike: function() {
                const that = this;

                // get the moment id
                const id = this.moments[Object.keys(this.moments)[0]].id;
                // get the status like
                const status = $(event.currentTarget).data("status");
                that.$store.dispatch("setMomentLike", {id, status}).then(function(response) {
                    delete that.moments[id];
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
            },

            /**
             * Get a field info from the first moment from all the moments
             * @param field {String}
             * @returns {String, Array, Boolean, Object} depends from moment data
             */
            getFirstMoment(field) {
                return this.moments[Object.keys(this.moments)[0]][field];
            },

            /**
             * Get the media field moment data
             * @param type {String} (thumb, large, xlarge...)
             * @returns {string} the image url
             */
            getMomentImage(type) {
                return this.moments[Object.keys(this.moments)[0]].media[type];
            }

        }
    }
</script>

<style scoped>

</style>