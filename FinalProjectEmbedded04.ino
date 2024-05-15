#include<Adafruit_Sensor.h>

#include<DHT.h>
#include<DHT_U.h>

#include <Wire.h>

#include <LiquidCrystal_I2C.h>

#include <SoftwareSerial.h>

//For communication
const byte RX = D6;
const byte TX = D7;

//#define DHTTYPE DHT22
//#define DHTPIN D4

//Server
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

const char* ssid = "Zx";
const char* password = "6530204321";
const char* mqtt_server = "broker.netpie.io";
const char* mqtt_Client="98681b12-4bd9-47e2-b248-95c76fde1038";
const char* mqtt_username="G9jXkZiRJNbFbDmK2LWQKNNgMLZZL1xt";
const char* mqtt_password="WirLyQYCH1ePxjdVRdTEn6XtEcazVv9U";
const int mqtt_port = 1883;
WiFiClient espClient;
PubSubClient client(espClient);

//DHT_Unified dht(DHTPIN,DHTTYPE); //create object
LiquidCrystal_I2C lcd(0x27, 16, 2); // Set the LCD address to 0x27 for a 16 chars and 2 line display
SoftwareSerial mySerial = SoftwareSerial(RX, TX);

//For TempSensor
uint32_t delayMS;

long lastUART = 0;
void Read_Uart();    // UART STM32
String LED1 = "OFF", LED2 = "OFF"; //Need to implement
String temperature="";
String humidity="";

//server
char msg[100];

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection…");
    if (client.connect(mqtt_Client, mqtt_username, mqtt_password)) {
      Serial.println("connected");
      client.subscribe("@msg/#");  
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("try again in 5 seconds");
      delay(5000);
    }
  }
}
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String message;
  for (int i = 0; i < length; i++) {
    message = message + (char)payload[i];
  }
  Serial.println(message);
}

void setup() {
  // put your setup code here, to run once:
   Serial.begin(9600);
   mySerial.begin(115200);
   Serial.println("UART Start");
   lastUART = millis();
   Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    client.setServer(mqtt_server, mqtt_port);
    client.setCallback(callback);
   //loop read sensor min is 2 seconds
  //delayMS= sensor.min_delay / 1000;

  //display
  lcd.init();                       // Initialize the LCD
  lcd.backlight();                  // Turn on the backlight
  lcd.clear();                      // Clear the LCD screen
   
}

void displaySoilMoisure(){
  lcd.clear();
  Serial.println(analogRead(A0));
  if(analogRead(A0)>800){
      lcd.setCursor(0, 0);               // Set the cursor to the first column and first row
      lcd.print("WaterStatus");     // Print some text
      lcd.setCursor(0, 1);               // Set the cursor to the first column and first row
      lcd.print("NeedWater!!!"); 
  }else{
      lcd.setCursor(0, 0);               // Set the cursor to the first column and first row
      lcd.print("WaterStatus");     // Print some text
      lcd.setCursor(0, 1);               // Set the cursor to the first column and first row
      lcd.print("Normal"); 
  }
  delay(3000);
  lcd.clear();
}

void displayTemperature(){
      lcd.clear();
      lcd.setCursor(0, 0);               // Set the cursor to the first column and first row
      lcd.print("Temperature ");     // Print some text
      lcd.setCursor(0, 1);               // Set the cursor to the first column and first row
      lcd.print(temperature);
      lcd.print(" C");
      delay(3000);
}

void displayHumidity(){
      lcd.clear();
      lcd.setCursor(0, 0);               // Set the cursor to the first column and first row
      lcd.print("Humidity ");     // Print some text
      lcd.setCursor(0, 1);               // Set the cursor to the first column and first row
      lcd.print(humidity);
      lcd.print(" %");
      delay(3000);
}

void Read_Uart()
{
  humidity="";
  temperature="";
  bool myCheck1=false;
  String st = "";
  
  while (mySerial.available())
  {
    char inChar = (char)mySerial.read();
    st +=  inChar;
    if (inChar == 'C') //end of read
    {
      Serial.println("Temperature : "+temperature);
      Serial.println("Humidity: "+humidity);
      displayTemperature();
      displayHumidity();
      break;
    }

    if(inChar=='a'){
      myCheck1=true;
      continue;
    }

    if(myCheck1==true){
      humidity+=inChar;
      continue;
    }
    if(inChar=='1' || inChar=='2' || inChar=='3' || inChar=='4' || inChar=='5' || inChar=='6' || inChar=='7' || inChar=='8' || inChar=='9' || inChar=='0'){
      temperature+=inChar;
      //Serial.println(temperature.length());
    }
  
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  // delay(delayMS);

  //temperature and humid calculate
   Read_Uart();
  if (millis() - lastUART > 10000)
  {
    //mySerial.print("1ON2ON3OFF4");
    //Serial.println("Truyen : 1ON2ON3OFF4");
    lastUART = millis();
  }
   displaySoilMoisure();
   if (!client.connected()) {
    reconnect();
  }
 String h = humidity;
 String t = temperature;
String current_state="";
  if(analogRead(A0)<800){
    current_state="true";
  }else{
    current_state="false";
  }
  String data = "{\"data\":{\"Humidity\": " + String(h) + ",\"Temperature\": " + String(t) + ",\"soil\": " + current_state + "}}";
  Serial.println(data);
  data.toCharArray(msg , (data.length() + 1));
  client.publish("@shadow/data/update", msg);
  client.loop();
  delay(1000);
   
}
