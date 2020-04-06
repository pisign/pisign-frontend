// libraries
import Vue from 'vue';
import Vuetify from 'vuetify';

// components
import TwitterWidget from '@/components/widget_types/twitter.vue'

// utilities
import {
    mount,
    createLocalVue
} from '@vue/test-utils'

const localVue = createLocalVue();

const factory = (vuetify,propsData) => {
  return mount(TwitterWidget, {
    localVue,
    vuetify,
    propsData: propsData
  })
}
describe('twitterWidget', () => {
    let vuetify;
    let wrapper;
    let api;
    let sentData;

    beforeEach(() => {
      vuetify = new Vuetify();
      api = {
        AccessSecret: "1",
        AccessToken: "12",
        ConsumerKey: "123",
        ConsumerSecret: "1234",
        TweetCount: 3,
        UserHandle: "Twitter"
      };
      sentData = {
        Status: "success",
        Data: {
          Tweets: [
            {
              user: {
                profile_image_url_https: "http://www.google.com",
                name: 'bob',
                screen_name: 'bob123'
              },
              text: "This is a test 1",
              favorite_count: 5,
              retweet_count: 10
            },
            {
              user: {
                profile_image_url_https: "http://www.google.com",
                name: 'jill',
                screen_name: 'jill123'
              },
              text: "This is a test 2",
              favorite_count: 12,
              retweet_count: 13
            },
            {
              user: {
                profile_image_url_https: "http://www.google.com",
                name: 'david',
                screen_name: 'david123'
              },
              text: "This is a test 3",
              favorite_count: 9,
              retweet_count: 2
            },
            {
              user: {
                profile_image_url_https: "http://www.google.com",
                name: 'tim',
                screen_name: 'tim123'
              },
              text: "This is a test 1",
              favorite_count: 21,
              retweet_count: 26
            }
          ]
        }
      }
    });

    afterEach(() => {
      wrapper.destroy();
    });



    it('Handles valid sent data', () => {
      wrapper = factory(vuetify, { sentData: sentData, api: api});

      expect(wrapper.vm.$data.numberTweets).toBe(3);
      expect(wrapper.vm.$data.userHandle).toBe("Twitter");
      expect(wrapper.vm.$data.accessSecret).toBe("1");
      expect(wrapper.vm.$data.accessToken).toBe("12");
      expect(wrapper.vm.$data.consumerKey).toBe("123");
      expect(wrapper.vm.$data.consumerSecret).toBe("1234");
      expect(wrapper.vm.tweets_sliced.length).toBe(3);
      expect(wrapper.vm.$data.tweets.length).toBe(4);
    });

    it('Handles invalid sent data', () => {
      sentData.Status = 'failure';
      wrapper = factory(vuetify, { sentData: sentData, api: api});

      expect(wrapper.vm.$data.numberTweets).toBe(3);
      expect(wrapper.vm.$data.userHandle).toBe("Twitter");
      expect(wrapper.vm.$data.accessSecret).toBe("1");
      expect(wrapper.vm.$data.accessToken).toBe("12");
      expect(wrapper.vm.$data.consumerKey).toBe("123");
      expect(wrapper.vm.$data.consumerSecret).toBe("1234");
      expect(wrapper.vm.tweets_sliced.length).toBe(0);
      expect(wrapper.vm.$data.tweets.length).toBe(0);
    });

    it('Handles bad api data', () => {
      wrapper = factory(vuetify, { sentData: sentData, api: api});
      wrapper.setProps({api: {}})

      expect(wrapper.vm.$data.numberTweets).toBe(0);
      expect(wrapper.vm.$data.userHandle).toBe("");
      expect(wrapper.vm.$data.accessSecret).toBe("");
      expect(wrapper.vm.$data.accessToken).toBe("");
      expect(wrapper.vm.$data.consumerKey).toBe("");
      expect(wrapper.vm.$data.consumerSecret).toBe("");
      expect(wrapper.vm.tweets_sliced.length).toBe(0);
      expect(wrapper.vm.$data.tweets.length).toBe(4);
    });
})