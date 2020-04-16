<template>
<!-- Displays widget content -->
    <div>
        <v-card class="mb-10" v-for="(tweet, index) in tweets_sliced" v-bind:key="index">
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
                userHandle: this.api.UserHandle,
                numberTweets: this.api.TweetCount,
                consumerKey: this.api.ConsumerKey,
                consumerSecret: this.api.ConsumerSecret,
                accessToken: this.api.AccessToken,
                accessSecret: this.api.AccessSecret,
            }
        },
        props: {
            sentData: Object,
            api: Object,
        }, created(){
            this.updateData();
        }, methods : {
            updateData : function(){
              if (this.sentData && this.sentData.Status && this.sentData.Status == "success") {
                  this.tweets = this.sentData.Data.Tweets;
              } else {
                  this.tweets = []
              }
            }
        },
        watch: {
            sentData: function() {
                this.updateData();
            },
            api : function() {
              this.numberTweets = this.api.TweetCount ? this.api.TweetCount : 0;
              this.consumerKey = this.api.ConsumerKey ? this.api.ConsumerKey : "";
              this.consumerSecret = this.api.ConsumerSecret ? this.api.ConsumerSecret : "";
              this.accessToken = this.api.AccessToken ? this.api.AccessToken : "";
              this.accessSecret = this.api.AccessSecret ? this.api.AccessSecret : "";
              this.userHandle = this.api.UserHandle ? this.api.UserHandle : "";
            }
        },
        computed: {
            tweets_sliced: function() {
                return this.tweets.slice(0, this.numberTweets)
            }
        }
    }
</script>
