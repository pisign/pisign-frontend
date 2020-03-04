<template>
    <div>
        <v-card class="mb-10" v-for="tweet in tweets_sliced" v-bind:key="tweet.text">
            <v-card-title>
                <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    :src="tweet.imgSrc"
                ></v-img>
                </v-list-item-avatar>
                <div>{{userId}}</div>
            </v-card-title>

            <v-card-text class="font-weight-bold">
                {{tweet.text}}
            </v-card-text>

            <v-card-actions>
                <v-list-item class="grow">
                    <v-row
                    align="center"
                    justify="end"
                    >
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">{{tweet.likes}}</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">{{tweet.shares}}</span>
                    </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: 'TwitterWidget',
        data: function() {
            return {
                tweets: [
                    {user: "ND", text: "Notre Dame seniors build amazing open source projects!", likes: 256, shares: 24, imgSrc: "https://static.nd.edu/images/webclips/default/webclip-1024.png"},
                    {user: "ND", text: "News: ND opening new computer lab", likes: 311, shares: 42, imgSrc: "https://static.nd.edu/images/webclips/default/webclip-1024.png"}
                ],
                numberTweets: this.api.NumberTweets,
                consumerKey: this.api.ConsumerKey,
                consumerSecret: this.api.ConsumerSecret,
                accessToken: this.api.AccessToken,
                accessSecret: this.api.AccessSecret,
                userId: this.api.UserId,
            }
        },
        props: {
            sentData: Object,
            api: Object,
        },
        watch: {
            sentData: function() {

            },
            api : function() {
              this.numberTweets = this.api.NumberTweets;
              this.consumerKey = this.api.ConsumerKey;
              this.consumerSecret = this.api.ConsumerSecret;
              this.accessToken = this.api.AccessToken;
              this.accessSecret = this.api.AccessSecret;
              this.userId = this.api.UserId;
            }
        },
        computed: {
            tweets_sliced: function() {
                return this.tweets.slice(0, this.numberTweets)
            }
        }
    }
</script>