/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, ShoppingBasket, User, Phone, MapPin, Calendar, CheckCircle, Trash2, ChevronRight, Package, Hash, CreditCard, Heart, Leaf, Settings, Save, X, PlusCircle, Edit3, ShoppingCart, ListChecks, PlusSquare, Edit, RotateCcw, Truck, Clock, Info, BookOpen, BarChart3, Pill, CalendarDays, Users } from 'lucide-react';

const App = () => {
  // นำเข้าฟอนต์ Sarabun ผ่าน Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Sarabun:wght@100;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  // ข้อมูลเซตขนมไทยจัดเบรก
  const [setConfigs, setSetConfigs] = useState([
    { id: 1, name: 'มงคลเดี่ยว', limit: 1, price: 35 },
    { id: 2, name: 'เซตคู่ขวัญ', limit: 2, price: 65 },
    { id: 3, name: 'เซตสามเกลอ', limit: 3, price: 90 },
    { id: 4, name: 'เซตรื่นรมย์ (4)', limit: 4, price: 120 },
    { id: 5, name: 'เซตเบญจมาศ (5)', limit: 5, price: 150 },
    { id: 6, name: 'เซตฉลองชัย (6)', limit: 6, price: 180 },
    { id: 7, name: 'เซตสิริพูนสุข (7)', limit: 7, price: 210 },
  ]);

  // รายชื่อขนมไทยและสูตรส่วนผสม (สัดส่วนต่อ 1 ชิ้น)
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

  // Function to check today
  const isToday = (timestamp: string) => {
    try {
      const now = new Date();
      const d = new Date(timestamp);
      return d.getDate() === now.getDate() &&
             d.getMonth() === now.getMonth() &&
             d.getFullYear() === now.getFullYear();
    } catch (e) { return false; }
  };

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
    } catch (e) { console.error(e); }
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

  const selectedSet = useMemo(() => 
    setConfigs.find(s => s.id === selectedSetId), 
    [setConfigs, selectedSetId]
  );

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  const todayStats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      totalSales: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + (Number(o.grandTotal) || 0), 0)
    };
  }, [orders]);

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

  const dessertList = useMemo(() => dessertData.map(d => d.name), [dessertData]);

  // --- ฟังก์ชันแก้ไขข้อมูล (Handle Update) ---
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName || !phone) return;

    const itemsSummary = cart.map(item => `${item.setName} (${item.items.join(', ')}) x ${item.quantity}`).join(' | ');

    if (editingOrderId) {
      // Logic สำหรับการแก้ไข
      const originalOrder = orders.find(o => o.id === editingOrderId);
      const updatedOrder = {
        ...originalOrder,
        customerName,
        phone,
        address,
        deliveryDate,
        itemsSummary,
        grandTotal: cartTotal,
      };

      setOrders(orders.map(o => o.id === editingOrderId ? updatedOrder : o));

      if (isGoogleConnected) {
        try {
          await fetch('/api/save-to-sheet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              action: 'updateOrder', // แจ้ง backend ว่าเป็นการอัปเดต
              timestamp: originalOrder.timestamp, 
              order: updatedOrder 
            })
          });
        } catch (e) { console.error(e); }
      }
    } else {
      // Logic สำหรับออเดอร์ใหม่
      const newOrder = {
        id: Date.now(),
        customerName, phone, address, deliveryDate,
        itemsSummary,
        grandTotal: cartTotal,
        status: 'pending',
        timestamp: new Date().toISOString(),
      };
      setOrders([newOrder, ...orders]);
      if (isGoogleConnected) {
        try {
          await fetch('/api/save-to-sheet', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'saveOrder', order: newOrder })
          });
        } catch (e) { console.error(e); }
      }
    }

    resetForm();
    setIsAdding(false);
  };

  // --- ฟังก์ชันลบออเดอร์ (Handle Delete) ---
  const deleteOrder = async (id: number) => {
    const orderToDelete = orders.find(o => o.id === id);
    if (!orderToDelete) return;

    if (window.confirm(`ยืนยันการลบออเดอร์ของ ${orderToDelete.customerName}?`)) {
      setOrders(orders.filter(o => o.id !== id));

      if (isGoogleConnected) {
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
    }
  };

  const toggleOrderStatus = async (id: number) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    const newStatus = order.status === 'pending' ? 'delivered' : 'pending';
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));

    if (isGoogleConnected) {
      try {
        await fetch('/api/save-to-sheet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            action: 'updateStatus', 
            timestamp: order.timestamp, 
            newStatus 
          })
        });
      } catch (e) { console.error(e); }
    }
  };

  const startEditOrder = (order: any) => {
    setEditingOrderId(order.id);
    setCustomerName(order.customerName);
    setPhone(order.phone);
    setAddress(order.address);
    setDeliveryDate(order.deliveryDate);
    
    // Parse itemsSummary back to cart
    const items = order.itemsSummary.split(' | ').map((part: string) => {
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

    setCart(items);
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
    const newItem = {
      cartId: Date.now(),
      setName: selectedSet.name,
      items: [...selectedItems],
      quantity: qty,
      totalPrice: selectedSet.price * qty
    };
    setCart([...cart, newItem]);
    setSelectedSetId(null); setSelectedItems([]); setQuantity(1);
  };

  const removeFromCart = (cartId: number) => setCart(cart.filter(i => i.cartId !== cartId));

  const handleItemToggle = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else if (selectedItems.length < (selectedSet?.limit || 0)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const mainFontStyle = { fontFamily: "'Sarabun', sans-serif" };

  return (
    <div className="min-h-screen bg-[#F0F4F0] p-3 md:p-8 text-slate-900 pb-20" style={mainFontStyle}>
      {/* UI ทุกส่วนต่อจากนี้คือโค้ดต้นฉบับของคุณแบบ 100% ไม่มีการขยับ Layout */}
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-emerald-600 p-2.5 md:p-3 rounded-2xl shadow-md">
              <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-emerald-900 tracking-tight uppercase">
                LONG CHIM <span className="text-emerald-700">DOO</span>
              </h1>
              <p className="text-emerald-800 font-bold text-xs md:text-sm mt-0.5">ขนมไทยประณีต สำหรับงานจัดเบรก</p>
            </div>
          </div>
          
          <div className="bg-slate-100/50 border-2 border-slate-300 border-dashed p-3 rounded-2xl flex items-center justify-around gap-x-4 md:gap-x-6 flex-1">
            <div className="text-center">
                <p className="text-[10px] md:text-xs text-amber-600 font-bold whitespace-nowrap">รอดำเนินการ</p>
                <p className="text-xl md:text-3xl font-black text-amber-600">{todayStats.pending}</p>
            </div>
            <div className="text-center">
                <p className="text-[10px] md:text-xs text-emerald-900 font-bold whitespace-nowrap">ยอดขายรวม</p>
                <p className="text-xl md:text-3xl font-black text-emerald-900">฿{todayStats.totalSales.toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button onClick={() => setIsEditingConfigs(true)} className="bg-white hover:bg-slate-50 text-emerald-700 px-3 md:px-4 py-2 md:py-3 rounded-2xl font-black text-xs md:text-base flex items-center gap-2 transition-all shadow-md border border-emerald-100">
              <Settings className="w-4 h-4" /> <span>ตั้งค่า</span>
            </button>
            <button onClick={() => { if(isAdding) resetForm(); setIsAdding(!isAdding); }} className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 md:px-5 py-2 md:py-3 rounded-2xl font-black text-xs md:text-base flex items-center gap-2 transition-all shadow-lg active:scale-95">
              <Plus className="w-4 h-4" /> {isAdding ? 'ปิด' : 'Order'}
            </button>
          </div>
        </header>

        {/* Recipe Guide Section */}
        {!isEditingConfigs && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
               <Users className="w-5 h-5 text-emerald-700" />
               <h3 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wide">คู่มือสูตรการผลิต (ยอดผลิตรวมบนปุ่ม)</h3>
            </div>
            <div className="flex flex-wrap gap-2 md:gap-3">
               {[...dessertData].map((dessert, idx) => {
                 const currentCount = productionMap[dessert.name] || 0;
                 return (
                   <button key={idx} onClick={() => setShowRecipeModal(dessert)} className={`relative bg-white border-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 ${currentCount > 0 ? 'border-amber-400' : 'border-emerald-100'}`}>
                     {dessert.name} {currentCount > 0 && <span className="bg-red-500 text-white px-1 rounded-full">{currentCount}</span>}
                   </button>
                 );
               })}
            </div>
          </div>
        )}

        {/* Form Section */}
        {isAdding && (
          <div className="bg-white rounded-[1.5rem] shadow-2xl border border-emerald-100 p-4 md:p-6 mb-8 relative animate-in fade-in slide-in-from-top-4 duration-300">
            <button onClick={() => { setIsAdding(false); resetForm(); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
            <h2 className="text-xl md:text-2xl font-extrabold mb-6 text-emerald-950 flex items-center gap-2 border-b-2 border-emerald-50 pb-4">
              <ShoppingCart className="text-emerald-600" /> {editingOrderId ? 'แก้ไขใบสั่งซื้อ' : 'สร้างใบสั่งซื้อใหม่'}
            </h2>
            
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-3 rounded-2xl">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><User size={14}/> ชื่อลูกค้า</label>
                  <input required type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" placeholder="ระบุชื่อลูกค้า" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><Phone size={14}/> เบอร์โทรศัพท์</label>
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" placeholder="08X-XXX-XXXX" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><MapPin size={14}/> ที่อยู่จัดส่ง</label>
                  <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" placeholder="ระบุที่อยู่จัดส่งและเวลา..." />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><CalendarDays size={14}/> วันที่จัดส่ง</label>
                  <input required type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" />
                </div>
              </div>

              {/* Selection Area */}
              <div className="p-4 bg-emerald-50/30 border-2 border-emerald-100 rounded-[1.5rem] space-y-6">
                <label className="text-base md:text-lg font-bold text-emerald-900">1. เลือกรูปแบบเซตเพื่อเพิ่มรายการ</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {setConfigs.map((set) => (
                    <button key={set.id} type="button" onClick={() => { setSelectedSetId(set.id); setSelectedItems([]); }}
                      className={`p-3 rounded-xl border-2 text-xs md:text-sm font-extrabold transition-all text-center ${selectedSetId === set.id ? 'bg-emerald-600 text-white border-emerald-700 shadow-md' : 'bg-white border-emerald-50 text-emerald-900 hover:bg-emerald-50'}`}>
                      {set.name} <div className={`text-[10px] mt-1 ${selectedSetId === set.id ? 'text-emerald-100' : 'text-emerald-500'}`}>฿{set.price} ({set.limit})</div>
                    </button>
                  ))}
                </div>

                {selectedSet && (
                  <div className="space-y-4 animate-in fade-in zoom-in-95">
                    <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm space-y-3">
                      <p className="font-bold text-sm text-emerald-900 flex justify-between">
                        <span>เลือกขนมสำหรับ {selectedSet.name}</span>
                        <span className={selectedItems.length === selectedSet.limit ? "text-emerald-600" : "text-amber-500"}>({selectedItems.length}/{selectedSet.limit})</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {dessertList.map(item => (
                          <button key={item} type="button" disabled={selectedItems.length >= selectedSet.limit && !selectedItems.includes(item)}
                            onClick={() => handleItemToggle(item)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${selectedItems.includes(item) ? 'bg-emerald-700 border-emerald-800 text-white shadow-sm' : 'bg-emerald-50 text-emerald-900 border-transparent'}`}>{item}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] font-extrabold text-emerald-700 uppercase mb-1 block text-center">จำนวนกล่อง</label>
                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                          className="w-full p-2.5 bg-white border border-emerald-100 rounded-xl text-center font-extrabold text-lg outline-none" />
                      </div>
                      <button type="button" onClick={addToCart} disabled={selectedItems.length !== selectedSet.limit}
                        className="flex-[2] py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-extrabold text-sm shadow-lg disabled:opacity-30 transition-all">
                        + เพิ่มเซตนี้ลงรายการ
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart List */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-lg text-emerald-950 flex items-center gap-2"><ListChecks /> สรุปรายการในออเดอร์นี้</h3>
                <div className="space-y-2">
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex items-center justify-between p-3 border border-emerald-50 bg-white rounded-xl shadow-sm">
                      <div className="flex-1">
                        <p className="font-bold text-emerald-900 text-sm">{item.setName} <span className="text-emerald-500">× {item.quantity}</span></p>
                        <p className="text-[10px] text-slate-500">{item.items.join(', ')}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-emerald-700 whitespace-nowrap">฿{item.totalPrice.toLocaleString()}</p>
                        <button type="button" onClick={() => removeFromCart(item.cartId)} className="text-red-300 hover:text-red-500 p-1.5"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                  {cart.length > 0 && (
                    <div className="p-5 bg-emerald-900 text-white rounded-2xl flex justify-between items-center shadow-xl mt-4">
                      <div><span className="text-emerald-300 text-[10px] block uppercase font-bold tracking-widest">ยอดเงินสุทธิ</span><span className="text-2xl font-extrabold">฿{cartTotal.toLocaleString()}</span></div>
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button type="button" onClick={() => { setIsAdding(false); resetForm(); }} className="w-full sm:flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-extrabold border-b-4 border-slate-300 active:translate-y-1 transition-all">ยกเลิก</button>
                <button type="submit" disabled={cart.length === 0 || !customerName || !phone}
                  className="w-full sm:flex-[2] py-4 bg-emerald-700 text-white rounded-xl font-extrabold text-xl shadow-lg border-b-4 border-emerald-900 hover:bg-emerald-800 active:translate-y-1 transition-all disabled:opacity-30">
                  {editingOrderId ? 'บันทึกการแก้ไข' : 'ยืนยันบันทึกออเดอร์'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Order List Display */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-950 flex items-center gap-2 border-b-2 border-emerald-200 pb-3">
             <Calendar className="w-6 h-6 text-emerald-700" /> ออเดอร์ทั้งหมด
          </h2>
          
          {isLoading ? (
            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-emerald-100 text-center text-slate-400 font-bold italic">กำลังโหลดข้อมูล...</div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-emerald-100 text-center"><ShoppingBasket className="w-12 h-12 text-emerald-100 mx-auto mb-3" /><p className="text-slate-400 font-bold italic">ยังไม่มีรายการสั่งซื้อ</p></div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => (
                <div key={order.id} className={`rounded-2xl shadow-md border overflow-hidden transition-colors ${order.status === 'delivered' ? 'bg-emerald-50 border-emerald-200' : 'bg-[#FBF8E8] border-amber-200'}`}>
                  {/* Card Header */}
                  <div className={`px-3 py-3 flex justify-between items-start gap-3 ${order.status === 'delivered' ? 'bg-emerald-100/60' : 'bg-[#F3EBCB]'}`}>
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-700 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold">{order.customerName.charAt(0)}</div>
                      <div>
                        <div className="flex flex-wrap items-center gap-x-2">
                          <h3 className="font-bold text-base text-slate-800 leading-tight">{order.customerName}</h3>
                          <a href={`tel:${order.phone}`} className="text-xs text-slate-500 font-bold flex items-center gap-0.5 hover:text-emerald-700 bg-white/40 px-1.5 py-0.5 rounded border border-slate-200/50"><Phone size={12}/> {order.phone}</a>
                        </div>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock size={12}/> {new Date(order.timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${order.status === 'delivered' ? 'bg-emerald-400 text-emerald-900' : 'bg-amber-400 text-amber-900'}`}>{order.status === 'delivered' ? 'จัดส่งแล้ว' : 'กำลังดำเนินการ'}</div>
                      <p className="text-lg font-black text-slate-800 leading-tight">฿{order.grandTotal.toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 space-y-3">
                    <div className="bg-white/60 p-2.5 rounded-lg flex items-center text-sm gap-2 border border-slate-100"><MapPin size={14} className="text-slate-400 shrink-0"/><span className="truncate text-slate-600 font-semibold">{order.address}</span></div>
                    <div className={`p-3 rounded-lg text-sm font-semibold text-slate-700 leading-relaxed ${order.status === 'delivered' ? 'bg-emerald-100/40' : 'bg-amber-100/50'}`}>
                      {order.itemsSummary.split(' | ').map((line: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2"><span className="min-w-[5px] h-[5px] rounded-full bg-slate-400 mt-2 shrink-0" /><span>{line}</span></div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <button onClick={() => toggleOrderStatus(order.id)} disabled={order.status === 'delivered'} className={`font-bold text-sm flex items-center gap-2 transition-all px-4 py-2 rounded-full ${order.status === 'delivered' ? 'bg-emerald-600 text-white opacity-70 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'}`}><CheckCircle size={16}/><span>{order.status === 'delivered' ? 'เรียบร้อย' : 'จัดส่ง'}</span></button>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => startEditOrder(order)} className="text-slate-500 hover:text-slate-800 text-xs font-bold px-2.5 py-1.5 rounded-md hover:bg-slate-100 flex items-center gap-1.5"><Edit size={14}/> แก้ไข</button>
                        <button onClick={() => deleteOrder(order.id)} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-md"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
