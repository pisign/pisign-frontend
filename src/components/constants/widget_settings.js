// Utilized in `WidgetSettings.vue` for rendering the form
import { timezones } from './timezones.js'
export var WidgetSettingsForm  = {
  'weather':
    [
      {"form_type":"text-field", "apiLabel":"Zip",   "label":"Zip*", "dataType" :"integer", "data": ""},
      {"form_type":"text-field", "apiLabel":"APIKey","label":"API Key*", "dataType": "string", "data": ""}
    ],
  'clock':
    [
      {"form_type":"autocomplete", "multiple": false, "items":timezones, "apiLabel": "Location","label":"Location*", "dataType": "string", "data": "America/New_York"}
    ],
  'text':
    [
      {"form_type":"text-field", "apiLabel":"Title", "label":"Title*", "dataType" :"string", "data": ""},
      {"form_type":"text-field", "apiLabel":"Text","label":"Text*", "dataType": "string", "data": ""}
    ],
	'sysinfo':
		[

		],
  'slideshow':
    [
      {"form_type":"text-field", "apiLabel": "Speed", "label":"Speed*", "dataType": "integer", "data": "5"},
      {"form_type":"autocomplete", "multiple": true, "items": [], "apiLabel": "IncludedTags", "label":"Tag*", "dataType": "obs_to_list", "data": ""}
    ],
    'twitter':
    [
      {"form_type":"text-field", "apiLabel": "UserHandle", "label":"User Handle*", "dataType": "string", "data": ""},
      {"form_type":"text-field", "apiLabel": "TweetCount", "label":"Number of Tweets", "dataType": "integer", "data": 1},
      {"form_type":"text-field", "apiLabel": "ConsumerKey", "label":"Consumer Key*", "dataType": "string", "data": ""},
      {"form_type":"text-field", "apiLabel": "ConsumerSecret", "label":"Consumer Secret*", "dataType": "string", "data": ""},
      {"form_type":"text-field", "apiLabel": "AccessToken", "label":"Access Token*", "dataType": "string", "data": ""},
      {"form_type":"text-field", "apiLabel": "AccessSecret", "label":"Access Secret*", "dataType": "string", "data": ""},
    ]
}
