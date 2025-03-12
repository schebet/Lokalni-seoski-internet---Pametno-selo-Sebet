#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// WiFi подешавања
const char* ssid = "SebetMesh";      // Име WiFi мреже
const char* password = "sebetmesh2024"; // Лозинка (променити)

// MQTT подешавања
const char* mqtt_server = "192.168.1.100"; // IP адреса MQTT сервера
const int mqtt_port = 1883;
const char* mqtt_user = "sebet";
const char* mqtt_password = "sebet2024";

// Пинови за ултразвучни сензор
const int TRIG_PIN = D1;
const int ECHO_PIN = D2;
const int BATTERY_PIN = A0;

// Константе за резервоар
const int TANK_HEIGHT = 200; // Висина резервоара у центиметрима
const int MIN_DISTANCE = 10; // Минимална дистанца од сензора до воде
const int MAX_DISTANCE = TANK_HEIGHT - MIN_DISTANCE;

// Варијабле
long lastMsg = 0;
int waterLevel = 0;
int batteryLevel = 0;

// Иницијализација клијената
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  
  // Иницијализација пинова
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  
  // Повезивање на WiFi
  setup_wifi();
  
  // Подешавање MQTT сервера
  client.setServer(mqtt_server, mqtt_port);
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Повезивање на ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi повезан");
  Serial.println("IP адреса: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Покушај MQTT конекције...");
    
    if (client.connect("ESP8266WaterTank", mqtt_user, mqtt_password)) {
      Serial.println("повезан");
    } else {
      Serial.print("неуспешно, rc=");
      Serial.print(client.state());
      Serial.println(" покушај поново за 5 секунди");
      delay(5000);
    }
  }
}

int measureWaterLevel() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  int distance = duration * 0.034 / 2; // Конверзија у центиметре
  
  // Конверзија дистанце у проценат напуњености
  int waterLevel = map(distance, MAX_DISTANCE, MIN_DISTANCE, 0, 100);
  waterLevel = constrain(waterLevel, 0, 100); // Ограничење на 0-100%
  
  return waterLevel;
}

int measureBattery() {
  int sensorValue = analogRead(BATTERY_PIN);
  return map(sensorValue, 0, 1024, 0, 100);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 60000) { // Слање података на сваких 60 секунди
    lastMsg = now;
    
    // Мерење нивоа воде
    waterLevel = measureWaterLevel();
    
    // Мерење батерије
    batteryLevel = measureBattery();
    
    // Креирање JSON објекта са подацима
    StaticJsonDocument<200> doc;
    doc["water_level"] = waterLevel;
    doc["battery"] = batteryLevel;
    doc["timestamp"] = now;
    
    char jsonBuffer[200];
    serializeJson(doc, jsonBuffer);
    
    // Слање података на MQTT сервер
    client.publish("water_tank/status", jsonBuffer);
    
    Serial.println(jsonBuffer);
    
    // Провера критичног нивоа воде
    if (waterLevel < 20) {
      // Слање упозорења
      StaticJsonDocument<100> alert;
      alert["type"] = "low_water";
      alert["level"] = waterLevel;
      
      char alertBuffer[100];
      serializeJson(alert, alertBuffer);
      client.publish("water_tank/alerts", alertBuffer);
    }
  }
}