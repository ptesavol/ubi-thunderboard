function Readings()
{
var self = this;

var state =
	{
	temperature: 0.0, 
	humidity: 0,
	ambientLight: 0,
	uvIndex: 0,
	airPressure: 0,
	soundLevel: 0,
	magneticField: 0,
	co2: 0,
	voc: 0, 	
	};

self.toString = function()
	{
	return JSON.stringify(state);	
	};

self.getState = function()
	{
	return state;
	};

self.setTemperature = function(buf)
	{
	state.temperature = buf.readInt16LE() / 100.0;	
	};

self.setHumidity = function(buf)
	{
	state.humidity = buf.readUInt16LE() / 100.0;		
	};

self.setAmbientLight = function(buf)
	{
	state.ambientLight = buf.readUInt32LE() / 100.0;	
	};

self.setUvIndex = function(buf)
	{
	state.uvIndex = buf.readUInt8();	
	};	

self.setAirPressure = function(buf)
	{
	state.airPressure = buf.readUInt32LE() / 1000.0;	
	};	

self.setSoundLevel = function(buf)
	{
	state.soundLevel = buf.readInt16LE() / 100.0;	
	};	

self.setMageneticField = function(buf)
	{
	state.magneticField = buf.readInt32LE();	
	};		

self.setCo2 = function(buf)
	{
	state.co2 = buf.readUInt16LE();		
	};

self.setVoc = function(buf)
	{
	state.voc = buf.readUInt16LE();	
	};	
}

if (module.exports)
	module.exports = Readings;
	