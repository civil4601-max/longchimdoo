/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, ShoppingBasket, User, Phone, MapPin, Calendar, CheckCircle, Trash2, ChevronRight, Package, Hash, CreditCard, Heart, Leaf, Settings, Save, X, PlusCircle, Edit3, ShoppingCart, ListChecks, PlusSquare, Edit, RotateCcw, Truck, Clock, Info, BookOpen, BarChart3, Pill, CalendarDays, Users } from 'lucide-react';

const App = () => {
  // --- รักษา useEffect และ State เดิมของคุณไว้ทั้งหมด ---
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Sarabun:wght@100;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, []);

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
    { id: 3, name: 'ทองหยิบ', ingredients: [{ name: 'ไข่แดง (ไข่เป็ด)', amount: 0.5, unit: 'ฟอง' }, { name: 'น้ำตาลทราย', amount: 50, unit: 'กรัม' }, { name: 'น้ำลอยดอกมะลิ', amount: 30, unit: 'มล.' }] },
    { id: 4, name: 'ฝอยทอง', ingredients: [{ name: 'ไข่แดง (ไข่เป็ด)', amount: 1, unit: 'ฟอง' }, { name: 'น้ำตาลทราย', amount: 100, unit: 'กรัม' }, { name: 'น้ำลอยดอกมะลิ', amount: 50, unit: 'มล.' }] },
    { id: 5, name: 'เม็ดขนุน', ingredients: [{ name: 'ถั่วเขียวเลาะเปลือก', amount: 30, unit: 'กรัม' }, { name: 'กะทิ', amount: 20, unit: 'มล.' }, { name: 'ไข่แดง', amount: 0.4, unit: 'ฟอง' }] },
    { id: 6, name: 'ตะโก้เผือก', ingredients: [{ name: 'แป้งข้าวจ้าว', amount: 8, unit: 'กรัม' }, { name: 'กะทิ', amount: 25, unit: 'มล.' }, { name: 'เผือกหั่นเต๋า', amount: 10, unit: 'กรัม' }] },
    { id: 7, name: 'เปียกปูนกะทิสด', ingredients: [{ name: 'แป้งข้าวจ้าว', amount: 10, unit: 'กรัม' }, { name: 'น้ำปูนใส', amount: 20, unit: 'มล.' }, { name: 'กะทิสด', amount: 10, unit: 'มล.' }] },
    { id: 8, name: 'ขนมน้ำดอกไม้', ingredients: [{ name: 'แป้งข้าวจ้าว', amount: 12, unit: 'กรัม' }, { name: 'น้ำลอยดอกมะลิ', amount: 25, unit: 'มล.' }, { name: 'น้ำตาลทราย', amount: 8, unit: 'กรัม' }] },
    { id: 9, name: 'จ่ามงกุฎ', ingredients: [{ name: 'แป้งสาลี', amount: 15, unit: 'กรัม' }, { name: 'ไข่แดง', amount: 0.3, unit: 'ฟอง' }, { name: 'เมล็ดแตงโม', amount: 5, unit: 'กรัม' }] },
    { id: 10, name: 'เสน่ห์จันทร์', ingredients: [{ name: 'แป้งข้าวจ้าว', amount: 10, unit: 'กรัม' }, { name: 'ผงจันทน์เทศ', amount: 0.5, unit: 'กรัม' }, { name: 'กะทิ', amount: 8, unit: 'มล.' }] },
    { id: 11, name: 'ทองเอก', ingredients: [{ name: 'แป้งสาลี', amount: 10, unit: 'กรัม' }, { name: 'กะทิ', amount: 15, unit: 'มล.' }, { name: 'ไข่แดง', amount: 0.6, unit: 'ฟอง' }] },
    { id: 12, name: 'กลีบลำดวน', ingredients: [{ name: 'แป้งสาลีเอนกประสงค์', amount: 20, unit: 'กรัม' }, { name: 'น้ำตาลไอซิ่ง', amount: 10, unit: 'กรัม' }, { name: 'น้ำมันพืช', amount: 8, unit: 'มล.' }] }
  ]);

  const [orders, setOrders] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [isEditingConfigs, setIsEditingConfigs] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState<any>(null); 
  
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  
  const [selectedSetId, setSelectedSetId] = useState<number | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [editingCartId, setEditingCartId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  // --- Logic การดึงข้อมูลและจัดการ Order ---

  useEffect(() => {
    const init = async () => {
      await checkGoogleStatus();
      const configs = await fetchConfigs();
      await fetchOrders(configs);
    };
    init();
  }, []);

  const checkGoogleStatus = async () => {
    try {
      const res = await fetch('/api/auth/status');
      const data = await res.json();
      setIsGoogleConnected(data.connected);
    } catch (e) {
      // ถ้าไม่มี API นี้ ให้ลองตรวจสอบจาก Env โดยตรงผ่าน API อื่น หรือตั้งเป็น true ไว้ก่อนเพื่อทดสอบ
      setIsGoogleConnected(true); 
    }
  };

  const fetchConfigs = async () => {
    try {
      const res = await fetch('/api/configs');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.data) {
          if (data.data.setConfigs) setSetConfigs(data.data.setConfigs);
          if (data.data.dessertData) setDessertData(data.data.dessertData);
          return data.data;
        }
      }
    } catch (e) { console.error(e); }
    return null;
  };

  const fetchOrders = async (currentConfigs?: any) => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && Array.isArray(data.data)) {
          const activeConfigs = currentConfigs?.setConfigs || setConfigs;
          const sheetOrders = data.data.map((row: any, index: number) => {
            const itemsSummary = String(row[5] || '');
            return {
              id: index + 10000,
              customerName: String(row[1] || ''),
              phone: String(row[2] || ''),
              address: String(row[3] || ''),
              deliveryDate: String(row[4] || ''),
              itemsSummary,
              grandTotal: parseFloat(row[6]) || 0,
              status: String(row[7] || 'pending'),
              timestamp: String(row[0] || ''),
              isFromSheet: true
            };
          });
          setOrders(sheetOrders.reverse());
        }
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName || !phone) return;

    const itemsSummary = cart.map(item => `${item.setName} (${item.items.join(', ')}) x ${item.quantity}`).join(' | ');

    if (editingOrderId) {
      const originalOrder = orders.find(o => o.id === editingOrderId);
      const updatedOrder = {
        ...originalOrder,
        customerName, phone, address, deliveryDate, itemsSummary, grandTotal: cartTotal
      };

      setOrders(orders.map(o => o.id === editingOrderId ? updatedOrder : o));

      // แก้ไขส่วนอัปเดตไปยัง Sheet
      try {
        await fetch('/api/save-to-sheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'updateOrder', 
            timestamp: originalOrder.timestamp, 
            order: updatedOrder 
          })
        });
      } catch (e) { console.error(e); }
    } else {
      const newOrder = {
        id: Date.now(),
        customerName, phone, address, deliveryDate, itemsSummary,
        grandTotal: cartTotal, status: 'pending', timestamp: new Date().toISOString(),
      };
      setOrders([newOrder, ...orders]);
      try {
        await fetch('/api/save-to-sheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'saveOrder', order: newOrder })
        });
      } catch (e) { console.error(e); }
    }
    resetForm();
    setIsAdding(false);
  };

  const deleteOrder = async (id: number) => {
    const orderToDelete = orders.find(o => o.id === id);
    if (!orderToDelete) return;

    if (window.confirm(`ยืนยันการลบออเดอร์ของ ${orderToDelete.customerName}?`)) {
      setOrders(orders.filter(o => o.id !== id));
      try {
        await fetch('/api/save-to-sheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'deleteOrder', 
            timestamp: orderToDelete.timestamp 
          })
        });
      } catch (e) { console.error(e); }
    }
  };

  const toggleOrderStatus = async (id: number) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const newStatus = order.status === 'pending' ? 'delivered' : 'pending';
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    try {
      await fetch('/api/save-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateStatus', timestamp: order.timestamp, newStatus })
      });
    } catch (e) { console.error(e); }
  };

  // --- ส่วนคำนวณ Stats และ UI คงเดิมตามไฟล์ที่คุณส่งมา ---
  const selectedSet = useMemo(() => setConfigs.find(s => s.id === selectedSetId), [setConfigs, selectedSetId]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.totalPrice, 0), [cart]);
  const todayStats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    totalSales: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + (Number(o.grandTotal) || 0), 0)
  }), [orders]);

  const productionMap = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.filter(o => o.status === 'pending').forEach(order => {
      const parts = order.itemsSummary.split(' | ');
      parts.forEach(part => {
        const match = part.match(/.*\(([^)]+)\)\s*x\s*(\d+)/);
        if (match) {
          const items = match[1].split(',').map(i => i.trim());
          const qty = parseInt(match[2]) || 0;
          items.forEach(name => { counts[name] = (counts[name] || 0) + qty; });
        }
      });
    });
    return counts;
  }, [orders]);

  const startEditOrder = (order: any) => {
    setEditingOrderId(order.id);
    setCustomerName(order.customerName);
    setPhone(order.phone);
    setAddress(order.address);
    setDeliveryDate(order.deliveryDate);
    const parsedCart = order.itemsSummary.split(' | ').map((part: string) => {
      const match = part.match(/(.+) \((.+)\) x (\d+)/);
      if (match) {
        const setName = match[1].trim();
        const config = setConfigs.find(c => c.name === setName);
        const qty = parseInt(match[3]);
        return {
          cartId: Math.random(),
          setName,
          items: match[2].split(',').map(i => i.trim()),
          quantity: qty,
          totalPrice: (config?.price || 0) * qty
        };
      }
      return null;
    }).filter(Boolean);
    setCart(parsedCart);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setCustomerName(''); setPhone(''); setAddress(''); setDeliveryDate('');
    setCart([]); setEditingOrderId(null); setSelectedSetId(null); setSelectedItems([]);
  };

  const addToCart = () => {
    if (!selectedSet || selectedItems.length !== selectedSet.limit) return;
    const qty = parseInt(quantity.toString()) || 1;
    setCart([...cart, {
      cartId: Date.now(),
      setName: selectedSet.name,
      items: [...selectedItems],
      quantity: qty,
      totalPrice: selectedSet.price * qty
    }]);
    setSelectedSetId(null); setSelectedItems([]); setQuantity(1);
  };

  const removeFromCart = (cartId: number) => setCart(cart.filter(i => i.cartId !== cartId));
  const handleItemToggle = (item: string) => {
    if (selectedItems.includes(item)) setSelectedItems(selectedItems.filter(i => i !== item));
    else if (selectedItems.length < (selectedSet?.limit || 0)) setSelectedItems([...selectedItems, item]);
  };

  return (
    <div className="min-h-screen bg-[#F0F4F0] p-3 md:p-8 text-slate-900 pb-20" style={{ fontFamily: "'Sarabun', sans-serif" }}>
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2.5 rounded-2xl shadow-md"><Leaf className="w-6 h-6 text-white fill-white" /></div>
            <div>
              <h1 className="text-2xl font-extrabold text-emerald-900 uppercase">LONG CHIM <span className="text-emerald-700">DOO</span></h1>
              <p className="text-emerald-800 font-bold text-xs">ขนมไทยประณีต สำหรับงานจัดเบรก</p>
            </div>
          </div>
          <div className="bg-slate-100/50 border-2 border-slate-300 border-dashed p-3 rounded-2xl flex items-center justify-around flex-1">
            <div className="text-center">
              <p className="text-[10px] text-amber-600 font-bold uppercase">รอดำเนินการ</p>
              <p className="text-xl font-black text-amber-600">{todayStats.pending}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-emerald-900 font-bold uppercase">ยอดขายรวม</p>
              <p className="text-xl font-black text-emerald-900">฿{todayStats.totalSales.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsEditingConfigs(true)} className="bg-white text-emerald-700 px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-2 shadow-md border border-emerald-100"><Settings size={16}/> ตั้งค่า</button>
            <button onClick={() => { if(isAdding) resetForm(); setIsAdding(!isAdding); }} className="bg-emerald-800 text-white px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-2 shadow-lg"><Plus size={16}/> {isAdding ? 'ปิด' : 'Order'}</button>
          </div>
        </header>

        {/* คู่มือสูตรการผลิต */}
        {!isEditingConfigs && (
          <div className="mb-8">
            <h3 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wide mb-3">คู่มือสูตรการผลิต</h3>
            <div className="flex flex-wrap gap-2">
              {dessertData.map((dessert, idx) => {
                const count = productionMap[dessert.name] || 0;
                return (
                  <button key={idx} onClick={() => setShowRecipeModal(dessert)} className={`bg-white border-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm flex items-center gap-1.5 ${count > 0 ? 'border-amber-400' : 'border-emerald-100'}`}>
                    {dessert.name} {count > 0 && <span className="bg-red-500 text-white px-1.5 rounded-full text-[10px]">{count}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Form เพิ่ม Order */}
        {isAdding && (
          <div className="bg-white rounded-[1.5rem] shadow-2xl border border-emerald-100 p-4 mb-8 relative">
            <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 text-slate-400 hover:text-red-500"><X/></button>
            <h2 className="text-xl font-extrabold mb-6 text-emerald-950 flex items-center gap-2 border-b-2 border-emerald-50 pb-4">
              <ShoppingCart/> {editingOrderId ? 'แก้ไขใบสั่งซื้อ' : 'สร้างใบสั่งซื้อใหม่'}
            </h2>
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-2xl">
                <input required value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="p-2.5 rounded-xl border-2 border-emerald-50 outline-none font-bold text-sm" placeholder="ชื่อลูกค้า" />
                <input required value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2.5 rounded-xl border-2 border-emerald-50 outline-none font-bold text-sm" placeholder="เบอร์โทรศัพท์" />
                <input required value={address} onChange={(e) => setAddress(e.target.value)} className="p-2.5 rounded-xl border-2 border-emerald-50 outline-none font-bold text-sm md:col-span-2" placeholder="ที่อยู่จัดส่ง" />
                <input required type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="p-2.5 rounded-xl border-2 border-emerald-50 outline-none font-bold text-sm md:col-span-2" />
              </div>

              <div className="p-4 bg-emerald-50/30 border-2 border-emerald-100 rounded-[1.5rem] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {setConfigs.map(set => (
                    <button key={set.id} type="button" onClick={() => { setSelectedSetId(set.id); setSelectedItems([]); }} className={`p-2 rounded-xl border-2 text-xs font-extrabold ${selectedSetId === set.id ? 'bg-emerald-600 text-white' : 'bg-white text-emerald-900'}`}>{set.name}</button>
                  ))}
                </div>
                {selectedSet && (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {dessertData.map(d => (
                        <button key={d.name} type="button" onClick={() => handleItemToggle(d.name)} className={`px-2 py-1.5 rounded-lg text-[10px] font-bold border-2 ${selectedItems.includes(d.name) ? 'bg-emerald-700 text-white' : 'bg-emerald-50 text-emerald-900'}`}>{d.name}</button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-20 p-2 rounded-xl border text-center font-bold" />
                      <button type="button" onClick={addToCart} className="flex-1 bg-amber-500 text-white rounded-xl font-extrabold text-sm">เพิ่มลงรายการ</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {cart.map(item => (
                  <div key={item.cartId} className="flex justify-between items-center p-3 bg-white border rounded-xl">
                    <div className="text-xs font-bold">{item.setName} x {item.quantity} <div className="text-[10px] text-slate-500 font-normal">{item.items.join(', ')}</div></div>
                    <button type="button" onClick={() => removeFromCart(item.cartId)} className="text-red-300"><Trash2 size={16}/></button>
                  </div>
                ))}
              </div>

              <button type="submit" className="w-full py-4 bg-emerald-700 text-white rounded-xl font-extrabold text-lg">บันทึกออเดอร์ (฿{cartTotal.toLocaleString()})</button>
            </form>
          </div>
        )}

        {/* รายการออเดอร์ */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-emerald-950 flex items-center gap-2 border-b-2 border-emerald-200 pb-2"><Calendar size={20}/> ออเดอร์ทั้งหมด</h2>
          {orders.map(order => (
            <div key={order.id} className={`rounded-2xl border p-4 shadow-sm ${order.status === 'delivered' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-800">{order.customerName}</h3>
                  <p className="text-[10px] text-slate-500 font-bold">{order.phone} | {new Date(order.timestamp).toLocaleTimeString()}</p>
                </div>
                <p className="text-lg font-black">฿{order.grandTotal.toLocaleString()}</p>
              </div>
              <p className="text-xs text-slate-600 mb-3 bg-white/50 p-2 rounded-lg">{order.itemsSummary}</p>
              <div className="flex justify-between items-center">
                <button onClick={() => toggleOrderStatus(order.id)} className={`px-4 py-1.5 rounded-full text-xs font-bold ${order.status === 'delivered' ? 'bg-emerald-600 text-white' : 'bg-white border-2 border-emerald-600 text-emerald-600'}`}>{order.status === 'delivered' ? 'ส่งแล้ว' : 'กดส่ง'}</button>
                <div className="flex gap-2">
                  <button onClick={() => startEditOrder(order)} className="text-slate-500 hover:text-slate-800"><Edit size={16}/></button>
                  <button onClick={() => deleteOrder(order.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
