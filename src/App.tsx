import React, { useState, useEffect, useMemo } from 'react';
import { Plus, User, Phone, MapPin, Calendar, CheckCircle, Trash2, Package, Leaf, Settings, X, Edit3, ShoppingCart, ListChecks, Edit, Clock, Info, BookOpen, CalendarDays, Users } from 'lucide-react';

// ดึงค่า URL จาก Environment Variable (Vercel)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

const App = () => {
  // --- รักษาระบบ Font เดิม ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => { if (document.head.contains(link)) document.head.removeChild(link); };
  }, []);

  // --- State และ Data เดิมทั้งหมด ---
  const [setConfigs, setSetConfigs] = useState([
    { id: 1, name: 'มงคลเดี่ยว', limit: 1, price: 35 },
    { id: 2, name: 'เซตคู่ขวัญ', limit: 2, price: 65 },
    { id: 3, name: 'เซตสามเกลอ', limit: 3, price: 90 },
    { id: 4, name: 'เซตรื่นรมย์ (4)', limit: 4, price: 120 },
    { id: 5, name: 'เซตเบญจมาศ (5)', limit: 5, price: 150 },
    { id: 6, name: 'เซตฉลองชัย (6)', limit: 6, price: 180 },
    { id: 7, name: 'เซตสิริพูนสุข (7)', limit: 7, price: 210 },
  ]);

  const [dessertData, setDessertData] = useState([
    { id: 1, name: 'ขนมชั้นใบเตย', ingredients: [{ name: 'แป้งท้าวยายม่อม', amount: 5, unit: 'กรัม' }, { name: 'กะทิ', amount: 10, unit: 'มล.' }, { name: 'น้ำตาลทราย', amount: 4, unit: 'กรัม' }] },
    { id: 2, name: 'ลูกชุบชาววัง', ingredients: [{ name: 'ถั่วเขียวเลาะเปลือก', amount: 20, unit: 'กรัม' }, { name: 'กะทิ', amount: 15, unit: 'มล.' }, { name: 'น้ำตาล', amount: 10, unit: 'กรัม' }] },
    { id: 3, name: 'ทองหยิบ', ingredients: [{ name: 'ไข่แดง', amount: 0.5, unit: 'ฟอง' }, { name: 'น้ำตาล', amount: 50, unit: 'กรัม' }, { name: 'น้ำมล.', amount: 30, unit: 'มล.' }] },
    { id: 4, name: 'ฝอยทอง', ingredients: [{ name: 'ไข่แดง', amount: 1, unit: 'ฟอง' }, { name: 'น้ำตาล', amount: 100, unit: 'กรัม' }] },
    { id: 5, name: 'เม็ดขนุน', ingredients: [{ name: 'ถั่วเขียว', amount: 30, unit: 'กรัม' }] }
  ]);

  const [orders, setOrders] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [isLoading, setIsLoading] = useState(true);

  // --- ฟังก์ชันดึงข้อมูลจาก Google Sheets (GET) ---
  useEffect(() => {
    const fetchData = async () => {
      if (!API_BASE_URL) { setIsLoading(false); return; }
      try {
        // ดึง Configs
        const configRes = await fetch(`${API_BASE_URL}?action=getConfigs`);
        const configJson = await configRes.json();
        if (configJson.status === 'success' && configJson.data) {
          if (configJson.data.setConfigs) setSetConfigs(configJson.data.setConfigs);
          if (configJson.data.dessertData) setDessertData(configJson.data.dessertData);
        }
        // ดึง Orders
        const orderRes = await fetch(`${API_BASE_URL}?action=getOrders`);
        const orderJson = await orderRes.json();
        if (orderJson.status === 'success') {
          const mappedOrders = orderJson.data.map((row: any, index: number) => ({
            id: index + 100,
            customerName: row[1],
            phone: row[2],
            address: row[3],
            deliveryDate: row[4],
            itemsSummary: row[5],
            grandTotal: row[6],
            status: row[7],
            timestamp: row[8], // ใช้เป็น ID สำหรับอ้างอิงตอนลบ/อัปเดต
          }));
          setOrders(mappedOrders.reverse());
        }
      } catch (e) { console.error("Fetch error:", e); }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // --- ฟังก์ชันบันทึกออเดอร์ใหม่ ---
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName || !phone) return;

    const newOrder = {
      id: Date.now(),
      customerName, phone, address, deliveryDate,
      orderItems: [...cart],
      grandTotal: cart.reduce((sum, item) => sum + item.totalPrice, 0),
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    setOrders([newOrder, ...orders]);
    
    if (API_BASE_URL) {
      try {
        await fetch(API_BASE_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ action: 'saveOrder', order: newOrder })
        });
      } catch (e) { console.error("Save error:", e); }
    }

    // Reset Form
    setCustomerName(''); setPhone(''); setAddress(''); setDeliveryDate('');
    setCart([]); setIsAdding(false);
  };

  // --- ฟังก์ชันเปลี่ยนสถานะ (Update Status) ---
  const toggleStatus = async (id: number) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const newStatus = order.status === 'pending' ? 'delivered' : 'pending';
    
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));

    if (API_BASE_URL) {
      try {
        await fetch(API_BASE_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ action: 'updateStatus', timestamp: order.timestamp, newStatus })
        });
      } catch (e) { console.error("Update status error:", e); }
    }
  };

  // --- ฟังก์ชันลบออเดอร์ (Delete Order) ---
  const deleteOrder = async (id: number) => {
    const orderToDelete = orders.find(o => o.id === id);
    if (!orderToDelete || !window.confirm(`ยืนยันการลบออเดอร์ของ ${orderToDelete.customerName}?`)) return;

    setOrders(orders.filter(o => o.id !== id));

    if (API_BASE_URL) {
      try {
        await fetch(API_BASE_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: JSON.stringify({ action: 'deleteOrder', timestamp: orderToDelete.timestamp })
        });
      } catch (e) { console.error("Delete error:", e); }
    }
  };

  // --- ส่วนจัดการตะกร้าสินค้าแบบเดิม ---
  const addToCart = () => {
    if (!selectedSetId || selectedItems.length === 0) return;
    const setInfo = setConfigs.find(s => s.id === selectedSetId);
    if (!setInfo) return;
    const qty = parseInt(quantity.toString()) || 1;
    const newItem = {
      cartId: Date.now(),
      setId: selectedSetId,
      setName: setInfo.name,
      items: [...selectedItems],
      quantity: qty,
      totalPrice: setInfo.price * qty
    };
    setCart([...cart, newItem]);
    setSelectedSetId(null); setSelectedItems([]); setQuantity(1);
  };

  // --- UI หน้าตาเดิมที่คุณส่งมา ---
  return (
    <div className="min-h-screen bg-[#FDFCF8] p-4 md:p-8 font-['Sarabun']">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border border-orange-100">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-2.5 rounded-2xl shadow-lg shadow-orange-200">
              <Leaf className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-orange-950 tracking-tight">LONG CHIM DOO</h1>
              <p className="text-[10px] font-bold text-orange-600 tracking-widest uppercase">Thai Dessert Management</p>
            </div>
          </div>
          <button onClick={() => setIsAdding(!isAdding)} className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-orange-700 transition-all shadow-lg shadow-orange-200">
            {isAdding ? <X size={20}/> : <Plus size={20}/>}
            {isAdding ? 'ปิดหน้าต่าง' : 'สร้างออเดอร์ใหม่'}
          </button>
        </header>

        {/* ... ส่วน Form สร้างออเดอร์ (คงไว้ตามแบบเดิมของคุณ) ... */}
        {isAdding && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-orange-50 mb-8 overflow-hidden">
             <h2 className="text-xl font-black text-orange-950 mb-6 flex items-center gap-2">
               <ShoppingCart className="text-orange-500" /> ข้อมูลการสั่งซื้อ
             </h2>
             <form onSubmit={handleCheckout} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-orange-900 ml-1">ชื่อลูกค้า</label>
                    <input required value={customerName} onChange={e => setCustomerName(e.target.value)} className="w-full p-4 bg-orange-50/50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-orange-900 ml-1">เบอร์โทรศัพท์</label>
                    <input required value={phone} onChange={e => setPhone(e.target.value)} className="w-full p-4 bg-orange-50/50 border-none rounded-2xl font-bold focus:ring-2 focus:ring-orange-500 outline-none" />
                  </div>
                </div>
                {/* ... (กรุณาใช้ Form เดิมของคุณได้เลยครับ ผมย่อไว้เพื่อให้คุณเห็นภาพ) ... */}
                <button type="submit" className="w-full bg-orange-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-orange-100">บันทึกออเดอร์ลงระบบ</button>
             </form>
          </div>
        )}

        {/* รายการออเดอร์ (UI เดิม) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-orange-950 flex items-center gap-2"><ListChecks className="text-orange-500"/> รายการสั่งซื้อทั้งหมด</h3>
            {isLoading && <span className="text-xs font-bold text-orange-400 animate-pulse">กำลังซิงค์ข้อมูล...</span>}
          </div>

          {orders.map(order => (
            <div key={order.id} className={`bg-white rounded-[2rem] p-6 border transition-all ${order.status === 'delivered' ? 'border-emerald-100 bg-emerald-50/10' : 'border-orange-100'}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-black text-orange-950">{order.customerName}</h4>
                  <p className="text-xs font-bold text-slate-400">{order.phone}</p>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-black text-orange-950">฿{order.grandTotal}</p>
                   <span className={`text-[10px] font-black px-3 py-1 rounded-full ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                     {order.status === 'delivered' ? 'จัดส่งแล้ว' : 'รอดำเนินการ'}
                   </span>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-2xl mb-4">
                <p className="text-sm font-bold text-slate-600 leading-relaxed">{order.itemsSummary}</p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-dashed">
                <button onClick={() => toggleStatus(order.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all ${order.status === 'delivered' ? 'bg-slate-100 text-slate-400' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'}`}>
                  <CheckCircle size={16} /> {order.status === 'delivered' ? 'ส่งแล้ว' : 'กดเพื่อส่งของ'}
                </button>
                <button onClick={() => deleteOrder(order.id)} className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
