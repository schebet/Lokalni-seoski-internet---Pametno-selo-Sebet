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

// Пинови
const int TRIG_PIN = D1;    // Ултразвучни сензор - TRIG пин
const int ECHO_PIN = D2;    // Ултразвучни сензор - ECHO пин
const int BATTERY_PIN = A0;  // Аналогни пин за читање напона батерије

// ID уређаја
const char* CONTAINER_ID = "container1"; // Јединствени ID за сваки контејнер

// Варијабле
long lastMsg = 0;
int value = 0;
bool isFull = false;
int batteryLevel = 0;

// Иницијализација WiFi и MQTT клијената
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
    
    if (client.connect("ESP8266Client", mqtt_user, mqtt_password)) {
      Serial.println("повезан");
    } else {
      Serial.print("неуспешно, rc=");
      Serial.print(client.state());
      Serial.println(" покушај поново за 5 секунди");
      delay(5000);
    }
  }
}

int measureDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  return duration * 0.034 / 2; // Конверзија у центиметре
}

int measureBattery() {
  int sensorValue = analogRead(BATTERY_PIN);
  // Конверзија аналогне вредности у проценат батерије
  // Претпостављамо да је 1024 = 100%, 0 = 0%
  return map(sensorValue, 0, 1024, 0, 100);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 30000) { // Слање података на сваких 30 секунди
    lastMsg = now;
    
    // Мерење дистанце
    int distance = measureDistance();
    // Ако је дистанца мања од 10цм, контејнер је пун
    isFull = distance < 10;
    
    // Мерење батерије
    batteryLevel = measureBattery();
    
    // Креирање JSON објекта са подацима
    StaticJsonDocument<200> doc;
    doc["container_id"] = CONTAINER_ID;
    doc["is_full"] = isFull;
    doc["battery"] = batteryLevel;
    doc["distance"] = distance;
    
    char jsonBuffer[200];
    serializeJson(doc, jsonBuffer);
    
    // Слање података на MQTT сервер
    client.publish("containers/status", jsonBuffer);
    
    Serial.println(jsonBuffer);
  }
}