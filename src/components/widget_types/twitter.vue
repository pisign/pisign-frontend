<template>
    <div>
        <v-card v-for="tweet in tweets" v-bind:key="tweet.text">
            <v-card-title>
                <v-icon
                    large
                    left
                >
                    mdi-twitter
                </v-icon>
                <span class="title font-weight-light">Twitter</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
                {{tweet.text}}
            </v-card-text>

            <v-card-actions>
                <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                    <v-img
                        class="elevation-6"
                        src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>{{tweet.user}}</v-list-item-title>
                    </v-list-item-content>

                    <v-row
                    align="center"
                    justify="end"
                    >
                    <v-icon class="mr-1">mdi-heart</v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">mdi-share-variant</v-icon>
                    <span class="subheading">45</span>
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
                tweets: [{user: "Notre Dame CSE", text: "Notre Dame Seniors build amazing open source projects!"}, {user: "ND CSE", text: "News: ND opening new computer lab"}],
                user: ''
            }
        }
    }
</script>