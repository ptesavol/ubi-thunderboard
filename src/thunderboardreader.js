var UbiMqtt = require("ubimqtt");
var fs = require("fs");

const Readings = require("./readings");
const CharacteristicHandler = require("./characteristichandler");
const settings = require("./settings");

var mqtt = new UbiMqtt(settings.mqttUrl);
var privateKey = fs.readFileSync(settings.privateKeyPath);


function ThunderboardReader(thunderboard, peripheral, chars)
{
var self = this;

var characteristics = chars;

var timerNum = -1;

var disconnected = false;

peripheral.once("disconnect", function()
	{
	console.log("Disconnected from: "+ thunderboard.roomName);	
	disconnected = true;

	if (timerNum != -1)
		{
		clearTimeout(timerNum);	
		}

	doRead();	
	});

var publishReadingsOnMqtt = function(thunderboard, readings, callback)
	{
	mqtt.connect(function(error)
		{
		if (error)
			{
			console.log("Failed to connect to mqtt broker at " + settings.mqttUrl);	
			//console.log(error);
			return callback(error);
			}

		var topic = settings.topicPrefix + thunderboard.roomName + "/thunderboard/" + thunderboard.bluetoothAddress;
		var message = { roomName: thunderboard.roomName, type: "thunderboard", readings: readings.getState() };

		mqtt.publishSigned(topic, JSON.stringify(message), null, privateKey, function(err)
			{
			if (err)
				{
				console.log("Failed to publish readings on MQTT at " + settings.mqttUrl);	
				console.log(err);
				return callback(err);
				}

			mqtt.disconnect(function(errb)
				{
				if (errb)
					{	
					console.log("Failed to disconnect from MQTT at " + settings.mqttUrl);	
					console.log(errb);
					return callback(errb);
					}
						
				return callback(null);
				});	
			});
		});
	};
	
var doReconnect = function(callback)
	{
	console.log("doReconnect()");	
	peripheral.connect(function(erri)
		{
		if (erri)
			{
			console.log("Reconnecting failed to " + thunderboard.roomName);
			return callback(erri);	
			}
		else
			{
			console.log("Reconnected to " + thunderboard.roomName);
			disconnected = false;
			
			peripheral.once("disconnect", function()
				{
				console.log("Disconnected from: "+ thunderboard.roomName);	
				disconnected = true;
				if (timerNum != -1)
					{
					clearTimeout(timerNum);	
					}
		
				doRead();
				});

			return callback(null);	
			}		
		})	
	};

var doRead = function() 
	{
	//console.log("doRead()");
	timerNum = -1;

	if (disconnected)	
		{
		return doReconnect(function(errb)
			{
			if (errb)
				timerNum = setTimeout(doRead, settings.readingInterval);	
			else
				{
				peripheral.discoverAllServicesAndCharacteristics(function(errd, obj, obj2)
					{
					if (errd)
						{
						console.log("Error in rediscovering characteristics "+errd);	
						disconnected = true;
						timerNum = setTimeout(doRead, settings.readingInterval);
						return;
						}	
					console.log("characteristics rediscovered ");	
				
					characteristics = obj2;	
					doRead();	
					});	
				}
			});
		}	
	var readings = new Readings();

	CharacteristicHandler.recurseCharacteristics(0, characteristics, readings, function(err)
		{
		if (err)
			{
			console.log(err);
			disconnected = true;	
			timerNum = setTimeout(doRead, settings.readingInterval);
			return;
			}	
		//console.log("Readings is now up to date");	
		console.log(thunderboard.roomName + ": " + readings.toString());	
				
		publishReadingsOnMqtt(thunderboard, readings, function(err)
			{
			timerNum = setTimeout(doRead, settings.readingInterval);	
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