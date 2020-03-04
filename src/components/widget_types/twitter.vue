<template>
    <div>
        <v-card class="mb-10" v-for="tweet in tweets_sliced" v-bind:key="tweet.text">
            <v-card-title>
                <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    :src="tweet.user.profile_image_url_https"
                ></v-img>
                </v-list-item-avatar>
                <div>{{tweet.user.name}}</div>
                <div><h6>   @{{tweet.user.screen_name}}</h6></div>
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
                    <span class="subheading mr-2">{{tweet.favorite_count}}</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">{{tweet.retweet_count}}</span>
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
                tweets: [],
                userId: this.api.UserId,
                numberTweets: this.api.NumberTweets,
                consumerKey: this.api.ConsumerKey,
                consumerSecret: this.api.ConsumerSecret,
                accessToken: this.api.AccessToken,
                accessSecret: this.api.AccessSecret,
            }
        },
        props: {
            sentData: Object,
            api: Object,
        },
        watch: {
            sentData: function() {
                if (this.sentData.Status == "success") {
                    this.tweets = this.sentData.Data.Tweets;
                } else if (this.sentData.Status == "failure") {
                    this.tweets = []
                }
            },
            "api.UserId": function() {
                this.userId = this.api.UserId
            },
            "api.NumberTweets": function() {
                this.numberTweets = this.api.NumberTweets
            },
            "api.ConsumerKey": function() {
                this.consumerKey = this.api.ConsumerKey
            },
            "api.ConsumerSecret": function() {
                this.consumerSecret = this.api.ConsumerSecret
            },
            "api.AccessToken": function() {
                this.accessToken = this.api.AccessToken
            },
            "api.AccessSecret": function() {
                this.accessSecret = this.api.AccessSecret
            },
        },
        computed: {
            tweets_sliced: function() {
                return this.tweets.slice(0, this.numberTweets)
            }
        }
    }
</script>