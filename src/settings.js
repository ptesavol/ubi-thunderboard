
var settings =
	{
	thunderboards: 
		{
		"90:fd:9f:7b:84:1e": 
			{
			labelNumber: 1,
			roomName: "ada",
			bluetoothAddress: "90:fd:9f:7b:84:1e" 	
			},

			
		"00:0d:6f:20:d4:b0":
			{
			labelNumber: 2,
			roomName: "basic",
			bluetoothAddress: "00:0d:6f:20:d4:b0" 	
			},

		"90:fd:9f:7b:81:15":
			{
			labelNumber: 3,
			roomName: "cobol",
			bluetoothAddress: "90:fd:9f:7b:81:15" 	 	
			},

		"90:fd:9f:7b:51:3a":
			{
			labelNumber: 4,
			roomName: "dart",
			bluetoothAddress: "90:fd:9f:7b:51:3a" 	 	
			},
		
		"90:fd:9f:7b:81:bf":
			{
			labelNumber: 5,
			roomName: "erlang",
			bluetoothAddress: "90:fd:9f:7b:81:bf"	
			},
		/*	
		"90:fd:9f:7b:83:fe":
			{
			labelNumber: 6,
			roomName: "fortran",
			bluetoothAddress: "90:fd:9f:7b:83:fe"	
			},

		"90:fd:9f:7b:50:de":
			{
			labelNumber: 7,
			roomName: "go",
			bluetoothAddress: "90:fd:9f:7b:50:de"	
			},
		
		"90:fd:9f:7b:83:c6":
			{
			labelNumber: 8,
			roomName: "haskell",
			bluetoothAddress: "90:fd:9f:7b:83:c6"	
			},	
		
		"90:fd:9f:7b:82:61":
			{
			labelNumber: 9,
			roomName: "idris",
			bluetoothAddress: "90:fd:9f:7b:82:61"	
			},

		"00:0d:6f:20:d4:00":
			{
			labelNumber: 10,
			roomName: "java",
			bluetoothAddress: "00:0d:6f:20:d4:00"	
			},
		
		"90:fd:9f:7b:85:00":
			{
			labelNumber: 11,
			roomName: "kotlin",
			bluetoothAddress: "90:fd:9f:7b:85:00"	
			},

		"90:fd:9f:7b:80:ad":
			{
			labelNumber: 12,
			roomName: "lisp",
			bluetoothAddress: "90:fd:9f:7b:80:ad"		
			},

		"90:fd:9f:7b:84:19":
			{
			labelNumber: 13,
			roomName: "modula",
			bluetoothAddress: "90:fd:9f:7b:84:19"		
			},

		"00:0b:57:31:56:1d":
			{
			labelNumber: 14,
			roomName: "neko",
			bluetoothAddress: "00:0b:57:31:56:1d"					
			},
		
		"90:fd:9f:7b:83:9e":
			{
			labelNumber: 15,
			roomName: "octave",
			bluetoothAddress: "90:fd:9f:7b:83:9e"					
			},	

		"90:fd:9f:7b:50:bf":
			{
			labelNumber: 16,
			roomName: "python",
			bluetoothAddress: "90:fd:9f:7b:50:bf"					
			},

		"90:fd:9f:7b:82:5c":
			{
			labelNumber: 17,
			roomName: "q",
			bluetoothAddress: "90:fd:9f:7b:82:5c"					
			}
		*/	
		},
	
	mqttUrl: "mqtt://iot.ubikampus.net:1883",
	topicPrefix: "rooms/",
	privateKeyPath: require('os').homedir() + "/.private/thunderboard-private-key.pem",
	publicKeyPath: require('os').homedir() + "/.private/thinderboard-public-key.pem",

	readingInterval: 5000
	};
	
if (module.exports)
	module.exports = settings;