# Reset Philips HUE Light Bulb, Zigbee2MQTT, Touchlink, MacOS and Node.js

### Mosquitto must be running
`brew install mosquitto` <br>
`brew services start mosquitto`

### Download the zigbee2mqtt
`git clone --depth 1 https://github.com/Koenkk/zigbee2mqtt.git`

### Go to project directory
`cd zigbee2mqtt`

### Plug your zigbee2mqtt dongle <br> Detect the port which is connected to and copy the result 
`ls /dev/tty.usbmodem*`   ----> In my case: /dev/tty.usbmodem141101

### Command below assigns the outcome of the ls command to variable
`port_value=$(ls /dev/tty.usbmodem* | head -n 1) && echo $port_value`

### Edit the configuration file ./data/configuration.yaml and set the port
`sed -i '' "s|^\([[:space:]]*port: \).*|  port: $port_value|" ./data/configuration.yaml`
`cat ./data/configuration.yaml `

#### If you are using a different USB port, the value is likely to change, so you will need to update your config

Install packages: `npm ci`<br>
Start zigbee2mqtt: `npm start`

### Find devices
`mosquitto_pub -t zigbee2mqtt/bridge/request/touchlink/scan -m '{}'`

#### In my case, it found one device <br> ```z2m:mqtt: MQTT publish: topic 'zigbee2mqtt/bridge/response/touchlink/scan', payload '{"data":{"found":[{"channel":11,"ieee_address":"0x0017880104d2390e"}]},"status":"ok"}'```
### Copy the ieee_address so that it can be used in the following commands, mine was 0x0017880104d2390e
`ieee_address="0x0017880104d2390e"`

### Can be reset whether it is paired or not
`mosquitto_pub -t zigbee2mqtt/bridge/request/touchlink/factory_reset -m "{\"ieee_address\": \"$ieee_address\"}"`

### If the config has “permit_join: true”, the device will be automatically paired with zigbee2mqtt and the configuration should now include a new device so that you can control it with this mqtt
`cat ./data/configuration.yaml `

### Some parameters of Philips ligh bulb
<b>Off:</b> `mosquitto_pub -t "zigbee2mqtt/$ieee_address/set" -m "off"`<br>
<b>On:</b> `mosquitto_pub -t "zigbee2mqtt/$ieee_address/set" -m "on"`<br>
<b>Color temp:</b> `mosquitto_pub -t "zigbee2mqtt/$ieee_address/set" -m '{"color_temp": 175}'`<br>
<b>Brightness:</b> `mosquitto_pub -t "zigbee2mqtt/$ieee_address/set" -m '{"brightness": 255}'`<br>

### If problems occur, turn off the power to the device to turn it off <br> Then remove the device with zigbee2mqtt <br> It should be discovered again
`mosquitto_pub -t zigbee2mqtt/bridge/request/device/remove -m "{\"id\": \"$ieee_address\"}"`