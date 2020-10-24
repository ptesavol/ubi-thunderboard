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
	if (peripheral.connectable)
		{
		let thunderboard = thunderboards[peripheral.address];	
		
		await peripheral.connectAsync();	
		
		//console.log("connected to thunderboard: " + thunderboard.labelNumber + " roomName: " + thunderboard.roomName);
		
		let obj = await peripheral.discoverAllServicesAndCharacteristicsAsync();
		//console.log(obj);

		for (let i = 0; i< obj.characteristics.length; i++)
			{
			if (obj.characteristics[i].uuid === "2a29")
				{
				obj.characteristics[i].read(function(err, buf)
					{	
					if (buf.toString() === "Silicon Laboratories")
						console.log(peripheral.address);	
					});
				}	
			}	

		//let reader = new ThunderboardReader(thunderboard, obj.characteristics);	
		//readers[peripheral.address] = reader;
		//reader.run();
		}
	});


