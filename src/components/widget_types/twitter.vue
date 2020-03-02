<template>
    <div>
        <v-card v-for="tweet in tweets.slice(0, numberTweets)" v-bind:key="tweet.text">
            <v-card-title>
                <v-icon
                    left
                >
                    mdi-twitter
                </v-icon>
                <span class="title font-weight-light">Twitter</span>
            </v-card-title>

            <v-card-text class="font-weight-bold">
                {{tweet.text}}
            </v-card-text>

            <v-card-actions>
                <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        src="https://static.nd.edu/images/webclips/default/webclip-1024.png"
                    ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>{{userId}}</v-list-item-title>
                    </v-list-item-content>

                    <v-row
                    align="center"
                    justify="end"
                    >
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">{{tweet.likes}}</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">{{tweet.shares}}</span>
                    </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card>
    </div>
</template>

<style>
    .v-card {
        margin-bottom: 10px
    }
</style>

<script>
    export default {
        name: 'TwitterWidget',
        data: function() {
            return {
                tweets: [
                    {user: "ND", text: "Notre Dame seniors build amazing open source projects!", likes: 256, shares: 24},
                    {user: "ND", text: "News: ND opening new computer lab", likes: 311, shares: 42}
                ],
                numberTweets: this.api.NumberTweets,
                apiKey: this.api.APIKey,
                userId: this.api.UserId
            }
        },
        props: {
            sentData: Object,
            api: Object,
        },
        watch: {
            sentData: function() {

            },
            api: function () {
                this.numberTweets = this.api.NumberTweets
                this.apiKey = this.api.APIKey
                this.userId = this.api.UserId
            }
        }
    }
</script>