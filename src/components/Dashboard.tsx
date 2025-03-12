import React, { useEffect, useContext } from 'react';
import { WifiIcon, TrashIcon, Droplets } from 'lucide-react';
import { io } from 'socket.io-client';
import { NotificationContext } from '../context/NotificationContext';

// Симулирани подаци - у продукцији би дошли са сервера
const containers = [
  { id: 1, full: true, battery: 85, lastUpdate: '2024-03-19 15:30' },
  { id: 2, full: false, battery: 92, lastUpdate: '2024-03-19 15:31' },
  { id: 3, full: false, battery: 78, lastUpdate: '2024-03-19 15:29' }
];

const meshNodes = [
  { id: 'main', name: 'Главни рутер', status: 'online', clients: 12, signal: 100 },
  { id: 'node1', name: 'Чвор Север', status: 'online', clients: 8, signal: 85 },
  { id: 'node2', name: 'Чвор Исток', status: 'online', clients: 5, signal: 90 },
  { id: 'node3', name: 'Чвор Југ', status: 'online', clients: 7, signal: 88 }
];

const waterTank = {
  level: 75,
  lastUpdate: '2024-03-19 15:30'
};

function Dashboard() {
  const { addNotification } = useContext(NotificationContext);

  useEffect(() => {
    // У продукцији, повезати се на прави WebSocket сервер
    const socket = io('ws://localhost:3000', {
      autoConnect: false
    });

    socket.on('containerUpdate', (data) => {
      if (data.full) {
        addNotification(`Контејнер ${data.id} је пун!`);
      }
    });

    socket.on('waterLevelLow', (level) => {
      if (level < 20) {
        addNotification(`Низак ниво воде: ${level}%`);
      }
    });

    return () => {
      socket.close();
    };
  }, [addNotification]);

  return (
    <main className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Статус контејнера */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrashIcon className="text-gray-600" />
            <h2 className="text-xl font-semibold">Контејнери</h2>
          </div>
          <div className="space-y-4">
            {containers.map(container => (
              <div key={container.id} className="border rounded p-4">
                <div className="flex justify-between items-center">
                  <span>Контејнер {container.id}</span>
                  <span className={`px-2 py-1 rounded ${container.full ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {container.full ? 'Пун' : 'Празан'}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div>Батерија: {container.battery}%</div>
                  <div>Ажурирано: {container.lastUpdate}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Статус мреже */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <WifiIcon className="text-gray-600" />
            <h2 className="text-xl font-semibold">Mesh мрежа</h2>
          </div>
          <div className="space-y-4">
            {meshNodes.map(node => (
              <div key={node.id} className="border rounded p-4">
                <div className="flex justify-between items-center">
                  <span>{node.name}</span>
                  <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                    {node.status}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  <div>Клијенти: {node.clients}</div>
                  <div>Сигнал: {node.signal}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Резервоар за воду */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="text-gray-600" />
            <h2 className="text-xl font-semibold">Резервоар воде</h2>
          </div>
          <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all duration-500"
              style={{ height: `${waterTank.level}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">
              {waterTank.level}%
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Последње ажурирање: {waterTank.lastUpdate}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;