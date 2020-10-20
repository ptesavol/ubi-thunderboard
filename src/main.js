const noble = require("@abandonware/noble");

const settings = require("./settings");
const ThunderboardReader = require("./thunderboardreader");

const thunderboards = settings.thunderboards;

var readers = {};
	

noble.on("stateChange", async (state) => 
	{
	if (state === "poweredOn") 
		{
	  	await noble.startScanningAsync();
		}
  	});
  

noble.on("discover", async (peripheral) => 
	{
	if (peripheral.connectable && thunderboards.hasOwnProperty(peripheral.address))
		{
		let thunderboard = thunderboards[peripheral.address];	
		
		await peripheral.connectAsync();	
		
		console.log("connected to thunderboard: " + thunderboard.labelNumber + " roomName: " + thunderboard.roomName);
		
		let obj = await peripheral.discoverAllServicesAndCharacteristicsAsync();
		//console.log(obj);

		let reader = new ThunderboardReader(thunderboard, obj.characteristics);	
		readers[peripheral.address] = reader;
		reader.run();
		}
	});


