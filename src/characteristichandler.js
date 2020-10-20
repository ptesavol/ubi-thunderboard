const TEMP = "2a6e";
const HUMIDITY = "2a6f";
const AMBIENT_LIGHT = "c8546913bfd945eb8dde9f8754f4a32e";
const UV_INDEX = "2a76";
const AIR_PRESSURE = "2a6d";
const SOUND_LEVEL = "c8546913bf0245eb8dde9f8754f4a32e";
const MAGNETIC_FIELD = "f598dbc52f024ec59936b3d1aa4f957f";
const CO2 = "efd658aec401ef3376e791b00019103b";
const VOC = "efd658aec402ef3376e791b00019103b";

function CharacteristicHandler() {};

CharacteristicHandler.handleCharacteristic = function(cha, readings, callback)
	{
	if (cha.uuid === TEMP)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);	
			if (buf)
				readings.setTemperature(buf);
			callback();	
			});	
		}	
	else if (cha.uuid === HUMIDITY)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);	
			if (buf)
				readings.setHumidity(buf);
			callback();	
			});	
		}

	else if (cha.uuid === AMBIENT_LIGHT)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);	
			if (buf)
				readings.setAmbientLight(buf);
			callback();	
			});	
		}
	
	else if (cha.uuid === UV_INDEX)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);
			if (buf)
				readings.setUvIndex(buf);
			callback();	
			});	
		}
	
	else if (cha.uuid === AIR_PRESSURE)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);		
			if (buf)
				readings.setAirPressure(buf);
			callback();	
			});	
		}
	
	else if (cha.uuid === SOUND_LEVEL)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);
			if (buf)
				readings.setSoundLevel(buf);
			callback();	
			});	
		}	

	else if (cha.uuid === MAGNETIC_FIELD)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);
			if (buf)
				readings.setMageneticField(buf);
			callback();	
			});	
		}
	
	else if (cha.uuid === CO2)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);
			if (buf)
				readings.setCo2(buf);
			callback();	
			});	
		}
	
	else if (cha.uuid === VOC)
		{
		cha.read(function(err, buf)
			{
			if (err)
				return callback(err);
			if (buf)
				readings.setVoc(buf);
			callback();	
			});	
		}

	else
		callback();	
	};

CharacteristicHandler.recurseCharacteristics = function(index, characteristics, readings, callback)
	{
	if (index >= characteristics.length)
		return callback();
	
	//console.log("trying to call handleCharacteristic() with index " + index +" characteristics.length " +characteristics.length);	
	return CharacteristicHandler.handleCharacteristic(characteristics[index], readings, function(err)
		{
		return CharacteristicHandler.recurseCharacteristics(index+1,  characteristics, readings, callback);
		});
	};


if (module.exports)
	module.exports = CharacteristicHandler;