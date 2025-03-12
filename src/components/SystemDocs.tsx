import React from 'react';
import { BookOpen, WifiIcon, TrashIcon, Droplets } from 'lucide-react';

function SystemDocs() {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold">Техничка документација система</h1>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Мрежна инфраструктура</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mb-2">Архитектура мреже</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Централни рутер са 4 mesh чвора</li>
                <li>Покривеност: 500м у пречнику</li>
                <li>Фреквенцијски опсези: 2.4GHz, 5GHz и 6GHz</li>
                <li>Backhaul веза: Посвећени 5GHz или 6GHz канал</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Хардверска спецификација</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Главни рутер: TP-Link Deco XE75 (Wi-Fi 6E)</li>
                <li>Mesh чворови: 3-4 TP-Link Deco XE75</li>
                <li>Водонепропусна кућишта: IP66 класа</li>
                <li>UPS систем за непрекидно напајање</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Распоред чворова</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Централни чвор: Центар села</li>
                <li>Чвор 1: ~120м Северно</li>
                <li>Чвор 2: ~120м Источно</li>
                <li>Чвор 3: ~120м Јужно</li>
                <li>Чвор 4: ~120м Западно</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Систем за праћење контејнера</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mb-2">Хардверске компоненте</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>ESP8266 NodeMCU модул за WiFi комуникацију (~$5)</li>
                <li>Ултразвучни сензор HC-SR04 за мерење нивоа (~$3)</li>
                <li>Соларно напајање са батеријом (~$10)</li>
                <li>Водоотпорно кућиште IP65 (~$5)</li>
                <li>Укупна цена по контејнеру: ~$23</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Повезивање сензора</h3>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <pre className="font-mono text-sm">
                  ESP8266 NodeMCU   -&gt;   Ултразвучни сензор{'\n'}
                  D1 (GPIO5)        -&gt;   TRIG{'\n'}
                  D2 (GPIO4)        -&gt;   ECHO{'\n'}
                  3.3V              -&gt;   VCC{'\n'}
                  GND               -&gt;   GND{'\n'}
                  A0                -&gt;   Батерија
                </pre>
              </div>

              <h3 className="text-xl font-medium mb-2">Комуникациони протокол</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>MQTT протокол за пренос података</li>
                <li>JSON формат порука</li>
                <li>Интервал слања: 30 секунди</li>
                <li>Подаци укључују: ID контејнера, статус пуноће, ниво батерије</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Систем за праћење резервоара воде</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mb-2">Хардверска конфигурација</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>ESP8266 NodeMCU за WiFi комуникацију</li>
                <li>Ултразвучни сензор за мерење нивоа воде</li>
                <li>Соларно напајање са батеријом</li>
                <li>Водоотпорно кућиште IP66</li>
                <li>Удаљеност од главног рутера: 150м</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Техничке спецификације</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Висина резервоара: 200цм</li>
                <li>Минимална дистанца сензора: 10цм</li>
                <li>Интервал мерења: 60 секунди</li>
                <li>Аутоматско упозорење при нивоу испод 20%</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Програмска подршка</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Аутоматско повезивање на WiFi мрежу</li>
                <li>MQTT комуникација са сервером</li>
                <li>JSON формат за пренос података</li>
                <li>Аутоматски режим спавања за уштеду енергије</li>
                <li>Систем за детекцију и пријаву грешака</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Софтверска платформа</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mb-2">Технологије</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>React + TypeScript за веб интерфејс</li>
                <li>Tailwind CSS за стилизацију</li>
                <li>MQTT брокер за комуникацију са сензорима</li>
                <li>WebSocket за реал-тиме ажурирање</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Функционалности</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Реал-тиме праћење стања контејнера</li>
                <li>Мониторинг нивоа воде у резервоару</li>
                <li>Праћење статуса mesh мреже</li>
                <li>Систем нотификација за критична стања</li>
                <li>Историјски преглед података</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Безбедност</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>WPA3 енкрипција за WiFi мрежу</li>
                <li>MQTT аутентификација</li>
                <li>Енкриптована комуникација са сензорима</li>
                <li>Редовно ажурирање фирмвера</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Одржавање система</h2>
            <div className="prose max-w-none">
              <h3 className="text-xl font-medium mb-2">Редовне провере</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Месечна провера физичког стања сензора</li>
                <li>Провера нивоа батерија на соларним панелима</li>
                <li>Чишћење сензора и провера калибрације</li>
                <li>Провера водоотпорних кућишта</li>
              </ul>

              <h3 className="text-xl font-medium mb-2">Препоручене акције</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Редовно чишћење соларних панела</li>
                <li>Провера конекције свих mesh чворова</li>
                <li>Ажурирање фирмвера по потреби</li>
                <li>Бекап конфигурације система</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SystemDocs;