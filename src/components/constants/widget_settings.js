// Utilized in `WidgetSettings.vue` for rendering the form
export var WidgetSettingsForm  = {
  'weather':
    [
      {"apiLabel":"Zip",   "label":"Zip*", "dataType" :"integer",    "data": ""},
      {"apiLabel":"APIKey","label":"API Key*", "dataType": "string", "data": ""}
    ],
  'clock':
    [
      {"apiLabel": "Location","label":"Location*", "dataType": "string", "data": "Local"}
    ],
	'system':
		[

		],
  'slideshow':
    [
      {"apiLabel": "Speed","label":"Speed*", "dataType": "integer", "data": "5"}
    ],
    'twitter':
    [
      {"apiLabel": "User", "label": "User ID*", "dataType": "string", "data": ""}
    ]
}
