var UbiMqtt = require("ubimqtt");
var fs = require("fs");

const Readings = require("./readings");
const CharacteristicHandler = require("./characteristichandler");
const settings = require("./settings");

var mqtt = new UbiMqtt(settings.mqttUrl);
var privateKey = fs.readFileSync(settings.privateKeyPath);


function ThunderboardReader(thunderboard, characteristics)
{
var self = this;

var publishReadingsOnMqtt = function(thunderboard, readings, callback)
	{
	mqtt.connect(function(error)
		{
		var topic = settings.topicPrefix + thunderboard.roomName + "/thunderboard/" + thunderboard.bluetoothAddress;
		var message = { roomName: thunderboard.roomName, type: "thunderboard", readings: readings.getState() };

		mqtt.publishSigned(topic, JSON.stringify(message), null, privateKey, function(err)
			{
			if (err)
				console.error(err);
			
			mqtt.disconnect(function(errb)
				{
				callback();
				});	
			});
		});
	};
	
var doRead = function() 
	{
	var readings = new Readings();

	CharacteristicHandler.recurseCharacteristics(0, characteristics, readings, function(err)
		{
		//console.log("Readings is now up to date");	
		console.log(thunderboard.roomName + ": " + readings.toString());	
				
		publishReadingsOnMqtt(thunderboard, readings, function()
			{
			setTimeout(doRead, 5000);	
			});	
		});		
	};

self.run = function()
	{
	doRead();
	}
}	

if (module.exports)
	module.exports = ThunderboardReader;