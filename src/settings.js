
var settings =
	{
	thunderboards: 
		{
		"90-fd-9f-7b-84-1e": 
			{
			labelNumber: 1,
			thunderboardNumber: 33822,
			roomName: "ada",
			bluetoothAddress: "90-fd-9f-7b-84-1e" 	
			},

		"00-0d-6f-20-d4-b0":
			{
			labelNumber: 2,
			thunderboardNumber: 54448,
			roomName: "basic",
			bluetoothAddress: "00-0d-6f-20-d4-b0" 	
			}
		},
	
	mqttUrl: "mqtt://localhost:1883",
	topicPrefix: "rooms/",
	privateKeyPath: require('os').homedir() + "/.private/ubimqtt-testing-key.pem",
	publicKeyPath: require('os').homedir() + "/.private/ubimqtt-testing-key-public.pem",

	readingInterval: 15000
	};
	
if (module.exports)
	module.exports = settings;