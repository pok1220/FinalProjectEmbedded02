#include<Adafruit_Sensor.h>

#include<DHT.h>
#include<DHT_U.h>

#include <Wire.h>

#include <LiquidCrystal_I2C.h>

#include <SoftwareSerial.h>



#include <ESP8266WiFi.h>
#include<ESPAsyncTCP.h>
#include<FS.h>

#include<ESPAsyncWebServer.h>

AsyncWebServer server(80); //PORT



//For communication
const byte RX = D6;
const byte TX = D7;

//#define DHTTYPE DHT22
//#define DHTPIN D4

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

//ForWebServer
const char* ssid="lek5745817";
const char* password="025052696";
uint8_t pin_led=2;


void setup() {
  // put your setup code here, to run once:
   Serial.begin(9600);
   mySerial.begin(115200);
   Serial.println("UART Start");
   lastUART = millis();


    //for WebServer
    pinMode(pin_led,OUTPUT);
    //delay(2000); //Prepare Data 
   
   //loop read sensor min is 2 seconds
  //delayMS= sensor.min_delay / 1000;

  //display
  lcd.init();                       // Initialize the LCD
  lcd.backlight();                  // Turn on the backlight
  lcd.clear();                      // Clear the LCD screen


   //for webserver(continue)
   if(!SPIFFS.begin()){
    Serial.println("ERROR10");
    return;
  }

  WiFi.disconnect();
  delay(100);
  WiFi.begin(ssid,password);

  while(WiFi.status()!=WL_CONNECTED){
    digitalWrite(pin_led,1);
    delay(250);
    Serial.println("Connected to WiFi..");
    digitalWrite(pin_led,0);
    delay(250);
  }
  Serial.println(WiFi.localIP()); 


  //Route for root backend
  server.on("/",HTTP_GET,[](AsyncWebServerRequest *request){
    request->send(SPIFFS,"/index.html","text/html",false);
  });

  server.on("/favicon.ico",HTTP_GET,[](AsyncWebServerRequest *request){ //just do icon in top left of browser
    request->send(SPIFFS,"/favicon.ico","image",false);
  });

  
  server.on("/ledstat",HTTP_GET,[](AsyncWebServerRequest *request){ //temperature
    //TODO Implement
    String temp_stat=temperature;
    toggleLED();
    request->send(200,"text/plain",temp_stat);
  });
  
  server.on("/humid",HTTP_GET,[](AsyncWebServerRequest *request){ //humidity
    //TODO Implement
    String humid_stat=humidity;
    request->send(200,"text/plain",humid_stat);
  });
  
  server.begin();
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
      Serial.println(temperature.length()); //still have bug during 3 minutes from start
      continue;
    }
    if(inChar=='1' || inChar=='2' || inChar=='3' || inChar=='4' || inChar=='5' || inChar=='6' || inChar=='7' || inChar=='8' || inChar=='9' || inChar=='0'){
      temperature+=inChar;
      //Serial.println(temperature.length());
    }
  
  }
}

void toggleLED(){
  digitalWrite(pin_led,!digitalRead(pin_led));
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
   
}
