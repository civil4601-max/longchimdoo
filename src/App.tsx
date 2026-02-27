/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Plus, ShoppingBasket, User, Phone, MapPin, Calendar, CheckCircle, Trash2, ChevronRight, Package, Hash, CreditCard, Heart, Leaf, Settings, Save, X, PlusCircle, Edit3, ShoppingCart, ListChecks, PlusSquare, Edit, RotateCcw, Truck, Clock, Info, BookOpen, BarChart3, Pill, CalendarDays, Users } from 'lucide-react';

// ดึง URL จาก Environment Variable (ต้องตั้งชื่อ VITE_API_URL ใน Vercel)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

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

  const isToday = (timestamp: string) => {
    try {
      const now = new Date();
      const d = new Date(timestamp);
      let orderDate = d;
      
      if (isNaN(d.getTime()) && typeof timestamp === 'string') {
        const parts = timestamp.split(/[\/\s]/);
        if (parts.length >= 3) {
          const day = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1;
          const year = parseInt(parts[2]);
          const normalizedYear = year > 2500 ? year - 543 : year;
          orderDate = new Date(normalizedYear, month, day);
        }
      }
      
      if (isNaN(orderDate.getTime())) return false;
      
      return orderDate.getDate() === now.getDate() &&
             orderDate.getMonth() === now.getMonth() &&
             orderDate.getFullYear() === now.getFullYear();
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    const init = async () => {
      await checkGoogleStatus();
      const configsData = await fetchConfigs();
      
      // Fetch orders using the full URL from Environment
      try {
        const res = await fetch(`${API_BASE_URL}?action=getOrders`);
        if (res.ok) {
          const data = await res.json();
          await fetchOrders(configsData, data);
        } else {
          await fetchOrders(configsData, null);
        }
      } catch (e) {
        console.error("Failed to fetch initial orders", e);
        await fetchOrders(configsData, null);
      }
    };
    init();
  }, [isGoogleConnected]);

  const fetchConfigs = async () => {
    if (!API_BASE_URL) return null;
    try {
      const res = await fetch(`${API_BASE_URL}?action=getConfigs`);
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.data) {
          if (data.data.setConfigs && Array.isArray(data.data.setConfigs)) {
            setSetConfigs(data.data.setConfigs);
          }
          if (data.data.dessertData && Array.isArray(data.data.dessertData)) {
            setDessertData(data.data.dessertData);
          }
          return data.data;
        }
      }
    } catch (e) {
      console.error("Failed to fetch configs", e);
    }
    return null;
  };

  const saveConfigsToSheet = async () => {
    if (!isGoogleConnected || !API_BASE_URL) return;
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'saveConfigs', configs: { setConfigs, dessertData } })
      });
    } catch (e) {
      console.error("Error saving configs", e);
    }
  };

  const fetchOrders = async (currentConfigs?: any, preFetchedOrdersData?: any) => {
    try {
      setIsLoading(true);
      let data = preFetchedOrdersData;
      
      if (!data && API_BASE_URL) {
        const res = await fetch(`${API_BASE_URL}?action=getOrders`);
        if (res.ok) {
          data = await res.json();
        }
      }

      if (data && data.status === 'success' && Array.isArray(data.data)) {
          const activeSetConfigs = currentConfigs?.setConfigs || setConfigs;

          const sheetOrders = data.data.map((row: any, index: number) => {
            const itemsSummary = String(row[5] || '');
            const parsedItems = itemsSummary.split(' | ').map(part => {
              const match = part.match(/(.+) \((.+)\) x (\d+)/);
              if (match) {
                const setName = match[1].trim();
                const items = match[2].split(',').map(i => i.trim());
                const quantity = parseInt(match[3]) || 0;
                const config = activeSetConfigs.find((c: any) => c.name === setName);
                const unitPrice = config ? config.price : 0;
                return {
                  cartId: Math.random() + index,
                  setName,
                  items,
                  quantity,
                  unitPrice,
                  totalPrice: unitPrice * quantity
                };
              }
              return null;
            }).filter(Boolean);

            return {
              id: index + 10000,
              customerName: String(row[1] || ''),
              phone: String(row[2] || ''),
              address: String(row[3] || ''),
              deliveryDate: String(row[4] || ''),
              orderItems: parsedItems,
              itemsSummary,
              grandTotal: parseFloat(row[6]) || 0,
              status: String(row[7] || 'pending'),
              timestamp: String(row[0] || ''),
              isFromSheet: true
            };
          });
          setOrders(prev => {
            const localOrders = prev.filter(o => !o.isFromSheet);
            return [...localOrders, ...sheetOrders].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          });
        }
    } catch (e) {
      console.error("Failed to fetch orders", e);
    } finally {
      setIsLoading(false);
    }
  };

  const checkGoogleStatus = async () => {
    if (API_BASE_URL && API_BASE_URL.startsWith('http')) {
      setIsGoogleConnected(true);
    } else {
      setIsGoogleConnected(false);
    }
  };

  const selectedSet = useMemo(() => 
    setConfigs.find(s => s.id === selectedSetId), 
    [setConfigs, selectedSetId]
  );

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  const todayStats = useMemo(() => {
    const todayOrders = orders.filter(order => isToday(order.timestamp));
    return {
      total: todayOrders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      totalSales: orders.filter(o => o.status === 'delivered').reduce((sum, o) => sum + (Number(o.grandTotal) || 0), 0)
    };
  }, [orders]);

  const productionMap = useMemo(() => {
    const pendingOrders = orders.filter(order => order.status === 'pending');
    const counts: Record<string, number> = {};
    pendingOrders.forEach(order => {
      if (order.orderItems && order.orderItems.length > 0) {
        order.orderItems.forEach((cartItem: any) => {
          cartItem.items.forEach((dessertName: string) => {
            counts[dessertName] = (counts[dessertName] || 0) + cartItem.quantity;
          });
        });
      } else if (order.itemsSummary) {
        const parts = order.itemsSummary.split(' | ');
        parts.forEach(part => {
          const match = part.match(/.*\(([^)]+)\)\s*x\s*(\d+)/);
          if (match) {
            const items = match[1].split(',').map(i => i.trim());
            const qty = parseInt(match[2]) || 0;
            items.forEach(dessertName => {
              if (dessertName) {
                counts[dessertName] = (counts[dessertName] || 0) + qty;
              }
            });
          }
        });
      }
    });
    return counts;
  }, [orders]);

  const dessertList = useMemo(() => dessertData.map(d => d.name), [dessertData]);

  const addNewDessert = () => {
    const newId = dessertData.length > 0 ? Math.max(...dessertData.map(d => d.id)) + 1 : 1;
    setDessertData([...dessertData, { id: newId, name: `ขนมใหม่ ${newId}`, ingredients: [] }]);
  };

  const removeDessert = (id: number) => {
    setDessertData(dessertData.filter(d => d.id !== id));
  };

  const updateDessertName = (id: number, newName: string) => {
    setDessertData(dessertData.map(d => d.id === id ? { ...d, name: newName } : d));
  };

  const addIngredientToDessert = (dessertId: number) => {
    setDessertData(dessertData.map(d => {
      if (d.id === dessertId) {
        return {
          ...d,
          ingredients: [...d.ingredients, { name: 'วัตถุดิบใหม่', amount: 0, unit: 'กรัม' }]
        };
      }
      return d;
    }));
  };

  const updateIngredient = (dessertId: number, ingIndex: number, field: string, value: any) => {
    setDessertData(dessertData.map(d => {
      if (d.id === dessertId) {
        const newIngs = [...d.ingredients];
        newIngs[ingIndex] = { ...newIngs[ingIndex], [field]: value };
        return { ...d, ingredients: newIngs };
      }
      return d;
    }));
  };

  const removeIngredient = (dessertId: number, ingIndex: number) => {
    setDessertData(dessertData.map(d => {
      if (d.id === dessertId) {
        return { ...d, ingredients: d.ingredients.filter((_, i) => i !== ingIndex) };
      }
      return d;
    }));
  };

  const startEditOrder = (order: any) => {
    setEditingOrderId(order.id);
    setCustomerName(order.customerName);
    setPhone(order.phone);
    setAddress(order.address);
    
    let formattedDate = '';
    if (order.deliveryDate) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(order.deliveryDate)) {
        formattedDate = order.deliveryDate;
      } else {
        const date = new Date(order.deliveryDate);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split('T')[0];
        } else {
            const parts = order.deliveryDate.split('/');
            if (parts.length === 3) {
                formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
        }
      }
    }
    setDeliveryDate(formattedDate);
    
    let itemsToEdit = [...(order.orderItems || [])];
    if (itemsToEdit.length === 0 && order.itemsSummary) {
      const parts = order.itemsSummary.split(' | ');
      itemsToEdit = parts.map((part: string) => {
        const match = part.match(/(.+) \((.+)\) x (\d+)/);
        if (match) {
          const setName = match[1].trim();
          const items = match[2].split(',').map(i => i.trim());
          const quantity = parseInt(match[3]) || 0;
          const config = setConfigs.find(c => c.name === setName);
          const unitPrice = config ? config.price : 0;
          return {
            cartId: Date.now() + Math.random(),
            setName,
            items,
            quantity,
            unitPrice,
            totalPrice: unitPrice * quantity
          };
        }
        return null;
      }).filter(Boolean);
    }
    
    setCart(itemsToEdit);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (itemsToEdit.length > 0) {
      startEditCartItem(itemsToEdit[0]);
    }
  };

  const toggleOrderStatus = async (orderId: number) => {
    const orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate || !API_BASE_URL) return;

    const newStatus = orderToUpdate.status === 'pending' ? 'delivered' : 'pending';

    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));

    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateStatus', orderId: orderToUpdate.id, isFromSheet: orderToUpdate.isFromSheet, timestamp: orderToUpdate.timestamp, newStatus })
      });
    } catch (e) {
      console.error('Error updating order status:', e);
    }
  };

  const startEditCartItem = (item: any) => {
    const config = setConfigs.find(c => c.name === item.setName);
    if (config) {
      setEditingCartId(item.cartId);
      setSelectedSetId(config.id);
      setSelectedItems([...item.items]);
      setQuantity(item.quantity);
      const selectionArea = document.getElementById('selection-area');
      if (selectionArea) selectionArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const addToCart = () => {
    if (!selectedSet || selectedItems.length !== selectedSet.limit || Number(quantity) < 1) return;

    if (editingCartId) {
      setCart(cart.map(item => item.cartId === editingCartId ? {
        ...item,
        setName: selectedSet.name,
        items: [...selectedItems],
        unitPrice: selectedSet.price,
        quantity: parseInt(quantity as string),
        totalPrice: selectedSet.price * parseInt(quantity as string),
      } : item));
      setEditingCartId(null);
    } else {
      const cartItem = {
        cartId: Date.now(),
        setName: selectedSet.name,
        items: [...selectedItems],
        unitPrice: selectedSet.price,
        quantity: parseInt(quantity as string),
        totalPrice: selectedSet.price * parseInt(quantity as string),
      };
      setCart([...cart, cartItem]);
    }
    setSelectedSetId(null);
    setSelectedItems([]);
    setQuantity(1);
  };

  const removeFromCart = (cartId: number) => {
    setCart(cart.filter(item => item.cartId !== cartId));
    if (editingCartId === cartId) {
      setEditingCartId(null);
      setSelectedSetId(null);
      setSelectedItems([]);
      setQuantity(1);
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || !customerName || !phone) return;

    if (editingOrderId) {
      const updatedOrder = {
        customerName,
        phone,
        address,
        deliveryDate,
        orderItems: [...cart],
        grandTotal: cartTotal,
      };
      setOrders(orders.map(o => o.id === editingOrderId ? { ...o, ...updatedOrder } : o));
    } else {
      const newOrder = {
        id: Date.now(),
        customerName,
        phone,
        address,
        deliveryDate,
        orderItems: [...cart],
        grandTotal: cartTotal,
        status: 'pending',
        timestamp: new Date().toISOString(),
      };
      setOrders([newOrder, ...orders]);
      if (isGoogleConnected) {
        saveToGoogleSheets(newOrder);
      }
    }

    resetForm();
    setIsAdding(false);
  };

  const saveToGoogleSheets = async (order: any) => {
    if (!API_BASE_URL) return;
    try {
      await fetch(API_BASE_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'saveOrder', order })
      });
    } catch (e: any) {
      console.error("Google Sheets Error:", e);
    }
  };

  const resetForm = () => {
    setCustomerName('');
    setPhone('');
    setAddress('');
    setDeliveryDate('');
    setCart([]);
    setSelectedSetId(null);
    setSelectedItems([]);
    setQuantity(1);
    setEditingOrderId(null);
    setEditingCartId(null);
  };

  const handleItemToggle = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else if (selectedItems.length < (selectedSet?.limit || 0)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const deleteOrder = (id: number) => {
    setOrders(orders.filter(o => o.id !== id));
  };

  const updateSetConfig = (id: number, field: string, value: any) => {
    setSetConfigs(prev => prev.map(config => 
      config.id === id ? { ...config, [field]: value } : config
    ));
  };

  const addNewSet = () => {
    const newId = setConfigs.length > 0 ? Math.max(...setConfigs.map(s => s.id)) + 1 : 1;
    setSetConfigs([...setConfigs, { id: newId, name: `เซตใหม่ ${newId}`, limit: 1, price: 0 }]);
  };

  const removeSet = (id: number) => {
    setSetConfigs(setConfigs.filter(s => s.id !== id));
    if (selectedSetId === id) setSelectedSetId(null);
  };

  const mainFontStyle = { fontFamily: "'Sarabun', sans-serif" };

  return (
    <div className="min-h-screen bg-[#F0F4F0] p-3 md:p-8 text-slate-900 pb-20" style={mainFontStyle}>
      {!isGoogleConnected && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-red-800">
                ยังไม่ได้ระบุ VITE_API_URL ใน Vercel Settings
              </h3>
              <div className="mt-1 text-xs text-red-700">
                <p>กรุณาตั้งค่า Environment Variable บน Vercel:</p>
                <ul className="list-disc list-inside mt-1">
                  <li>Key: <code>VITE_API_URL</code></li>
                  <li>Value: URL ของ Google Apps Script ของคุณ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="bg-emerald-600 p-2.5 md:p-3 rounded-2xl shadow-md">
              <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-emerald-900 tracking-tight uppercase" style={{ fontWeight: 800 }}>
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
            <div className="flex flex-col justify-center px-1 md:px-2">
              <div 
                title={isGoogleConnected ? 'เชื่อมต่อแล้ว' : 'ไม่ได้เชื่อมต่อ'}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${isGoogleConnected ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}
              />
            </div>
            
            <button 
              onClick={() => setIsEditingConfigs(true)}
              className="bg-white hover:bg-slate-50 text-emerald-700 px-3 md:px-4 py-2 md:py-3 rounded-2xl font-black text-xs md:text-base flex items-center justify-center gap-2 transition-all shadow-md border border-emerald-100 active:scale-95 whitespace-nowrap"
            >
              <Settings className="w-4 h-4 md:w-5 md:h-5" />
              <span>ตั้งค่า</span>
            </button>
            
            <button 
              onClick={() => { if(isAdding) resetForm(); setIsAdding(!isAdding); }}
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 md:px-5 py-2 md:py-3 rounded-2xl font-black text-xs md:text-base flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5 stroke-[4px]" />
              {isAdding ? 'ปิด' : 'Order'}
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
               {[...dessertData]
                 .sort((a, b) => (productionMap[b.name] || 0) - (productionMap[a.name] || 0))
                 .map((dessert, idx) => {
                 const currentCount = productionMap[dessert.name] || 0;
                 return (
                   <button 
                    key={idx}
                    onClick={() => setShowRecipeModal(dessert)}
                    className={`relative bg-white hover:bg-emerald-50 text-emerald-700 border-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 md:gap-2 active:scale-95 ${currentCount > 0 ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-emerald-100'}`}
                   >
                     {dessert.name}
                     {currentCount > 0 && (
                        <span className="bg-red-500 text-white text-[9px] md:text-[10px] font-black min-w-[18px] md:min-w-[20px] h-4 md:h-5 flex items-center justify-center rounded-full shadow-md animate-pulse px-1">
                          {currentCount}
                        </span>
                     )}
                   </button>
                 );
               })}
            </div>
          </div>
        )}

        {/* Config Modal */}
        {isEditingConfigs && (
          <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-[#F8FAF8] rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col">
              <div className="bg-emerald-800 p-5 text-white relative shrink-0">
                <button 
                  onClick={() => {
                    saveConfigsToSheet();
                    setIsEditingConfigs(false);
                  }} 
                  className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-2.5 rounded-2xl">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-emerald-200 mb-0.5">ระบบจัดการหลังบ้าน</p>
                    <h3 className="text-xl font-black">ตั้งค่าเมนูและส่วนผสม</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-8">
                  {/* Sets Config */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b-2 border-emerald-100 pb-2">
                      <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
                        <Package className="w-3.5 h-3.5" /> A. รูปแบบเซตขนม
                      </h4>
                      <button type="button" onClick={addNewSet} className="bg-emerald-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold">
                        เพิ่มเซต
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {setConfigs.map((set) => (
                        <div key={set.id} className="bg-white p-4 rounded-2xl border-2 border-emerald-50 shadow-sm relative group">
                          <button type="button" onClick={() => removeSet(set.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"><X className="w-3 h-3" /></button>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase">ชื่อเซต</label>
                            <input className="w-full text-xs font-extrabold p-2 bg-slate-50 rounded-lg outline-none" value={set.name} onChange={(e) => updateSetConfig(set.id, 'name', e.target.value)} />
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase">ราคา</label>
                              <input type="number" className="w-full text-xs font-extrabold p-2 bg-slate-50 rounded-lg outline-none" value={set.price} onChange={(e) => updateSetConfig(set.id, 'price', parseInt(e.target.value) || 0)} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase">จำนวนชิ้น</label>
                              <input type="number" className="w-full text-xs font-extrabold p-2 bg-slate-50 rounded-lg outline-none" value={set.limit} onChange={(e) => updateSetConfig(set.id, 'limit', parseInt(e.target.value) || 0)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dessert Recipes Config */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b-2 border-emerald-100 pb-2">
                      <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" /> B. รายชื่อขนมและส่วนผสม
                      </h4>
                      <button type="button" onClick={addNewDessert} className="bg-amber-500 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold">
                        เพิ่มขนมใหม่
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {dessertData.map((dessert) => (
                        <div key={dessert.id} className="bg-white p-4 rounded-[1.5rem] border-2 border-emerald-50 shadow-sm space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase">ชื่อขนมไทย</label>
                              <input className="w-full text-lg font-black p-2 bg-slate-50 rounded-xl outline-none" value={dessert.name} onChange={(e) => updateDessertName(dessert.id, e.target.value)} />
                            </div>
                            <button type="button" onClick={() => removeDessert(dessert.id)} className="text-red-300 hover:text-red-500 p-2"><Trash2 className="w-5 h-5"/></button>
                          </div>

                          <div className="bg-emerald-50/50 p-4 rounded-xl space-y-3 border border-emerald-100">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-emerald-800 uppercase">ส่วนผสมต่อขนม 1 ชิ้น</span>
                              <button type="button" onClick={() => addIngredientToDessert(dessert.id)} className="text-[10px] font-black text-emerald-700 bg-white border px-2.5 py-1.5 rounded-lg">+ เพิ่มวัตถุดิบ</button>
                            </div>
                            <div className="space-y-2">
                              {dessert.ingredients.map((ing: any, i: number) => (
                                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                                  <div className="col-span-5">
                                    <input className="w-full text-xs font-bold p-2 bg-white rounded-lg outline-none" placeholder="ชื่อวัตถุดิบ" value={ing.name} onChange={(e) => updateIngredient(dessert.id, i, 'name', e.target.value)} />
                                  </div>
                                  <div className="col-span-3">
                                    <input type="number" step="0.1" className="w-full text-xs font-bold p-2 bg-white rounded-lg outline-none text-center" value={ing.amount} onChange={(e) => updateIngredient(dessert.id, i, 'amount', parseFloat(e.target.value) || 0)} />
                                  </div>
                                  <div className="col-span-3">
                                    <input className="w-full text-xs font-bold p-2 bg-white rounded-lg outline-none text-center" placeholder="หน่วย" value={ing.unit} onChange={(e) => updateIngredient(dessert.id, i, 'unit', e.target.value)} />
                                  </div>
                                  <div className="col-span-1 text-right">
                                    <button type="button" onClick={() => removeIngredient(dessert.id, i)} className="text-red-200 hover:text-red-500"><X className="w-4 h-4"/></button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border-t shrink-0">
                <button 
                  onClick={() => {
                    saveConfigsToSheet();
                    setIsEditingConfigs(false);
                  }}
                  className="w-full py-3.5 bg-emerald-700 text-white rounded-2xl font-black text-lg"
                >
                  บันทึกและปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Recipe Summary Modal */}
        {showRecipeModal && (
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden border-4 border-emerald-600/10">
              <div className="bg-emerald-700 p-6 text-white relative">
                <button onClick={() => setShowRecipeModal(null)} className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full"><X className="w-4 h-4" /></button>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-6 h-6" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-200">สรุปวัตถุดิบที่ต้องใช้</p>
                    <h3 className="text-xl font-extrabold">{showRecipeModal.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800">ยอดผลิตรวม:</span>
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full font-black text-sm">
                    {productionMap[showRecipeModal.name] || 0} ชิ้น
                  </span>
                </div>
                <div className="space-y-3">
                  {showRecipeModal.ingredients.map((ing: any, i: number) => {
                    const totalAmount = ing.amount * (productionMap[showRecipeModal.name] || 0);
                    return (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 text-sm">{ing.name}</span>
                          <span className="text-[10px] text-slate-400">({ing.amount} {ing.unit}/ชิ้น)</span>
                        </div>
                        <span className="font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg">
                          {totalAmount.toLocaleString()} {ing.unit}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => setShowRecipeModal(null)} className="w-full mt-6 py-3 bg-emerald-700 text-white rounded-xl font-extrabold">รับทราบ</button>
              </div>
            </div>
          </div>
        )}

        {/* Order Form */}
        {isAdding && (
          <div className="bg-white rounded-[1.5rem] shadow-2xl border border-emerald-100 p-4 md:p-6 mb-8 relative ring-4 ring-emerald-500/10 animate-in fade-in slide-in-from-top-4">
            <button onClick={() => { setIsAdding(false); resetForm(); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
            <h2 className="text-xl md:text-2xl font-extrabold mb-6 text-emerald-950 flex items-center gap-2 border-b pb-4">
              <ShoppingCart className="text-emerald-600 w-5 h-5" /> 
              {editingOrderId ? 'แก้ไขใบสั่งซื้อ' : 'สร้างใบสั่งซื้อใหม่'}
            </h2>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-3 rounded-2xl">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><User className="w-4 h-4" /> ชื่อลูกค้า</label>
                  <input required type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><Phone className="w-4 h-4" /> เบอร์โทรศัพท์</label>
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><MapPin className="w-4 h-4" /> ที่อยู่จัดส่ง</label>
                  <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><CalendarDays className="w-4 h-4" /> วันที่จัดส่ง</label>
                  <input required type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl outline-none font-bold" />
                </div>
              </div>

              {/* Set Selection Area */}
              <div id="selection-area" className={`p-4 rounded-[1.5rem] border-2 transition-all space-y-4 ${editingCartId ? 'bg-amber-50 border-amber-200' : 'bg-emerald-50/30 border-emerald-100'}`}>
                <div className="flex justify-between items-center border-b border-emerald-50 pb-2">
                  <label className="text-sm font-bold text-emerald-900">1. เลือกรูปแบบเซต</label>
                  {editingCartId && <button type="button" onClick={() => { setEditingCartId(null); setSelectedSetId(null); setSelectedItems([]); }} className="text-[10px] text-amber-700 underline font-bold">ยกเลิกแก้ไข</button>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {setConfigs.map((set) => (
                    <button key={set.id} type="button" onClick={() => { setSelectedSetId(set.id); setSelectedItems([]); }} className={`p-3 rounded-xl border-2 text-xs font-extrabold transition-all ${selectedSetId === set.id ? 'bg-emerald-600 border-emerald-700 text-white' : 'bg-white border-emerald-50 text-emerald-900'}`}>
                      {set.name}
                      <div className="text-[10px] mt-1 opacity-80">฿{set.price}</div>
                    </button>
                  ))}
                </div>
                {selectedSet && (
                  <div className="space-y-4 animate-in zoom-in-95">
                    <div className="p-4 bg-white rounded-xl border border-emerald-100 shadow-sm">
                      <p className="font-bold text-xs text-emerald-900 mb-2">เลือกขนม ({selectedItems.length}/{selectedSet.limit})</p>
                      <div className="flex flex-wrap gap-1.5">
                        {dessertList.map(item => (
                          <button key={item} type="button" disabled={selectedItems.length >= selectedSet.limit && !selectedItems.includes(item)} onClick={() => handleItemToggle(item)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${selectedItems.includes(item) ? 'bg-emerald-700 border-emerald-800 text-white' : 'bg-emerald-50 text-emerald-900 border-transparent'}`}>{item}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-[9px] font-extrabold text-emerald-700 text-center block mb-1">จำนวนกล่อง</label>
                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2.5 bg-white border border-emerald-100 rounded-xl text-center font-extrabold text-lg outline-none" />
                      </div>
                      <button type="button" onClick={addToCart} disabled={selectedItems.length !== selectedSet.limit} className={`flex-[2] py-4 text-white rounded-xl font-extrabold text-sm shadow-lg ${editingCartId ? 'bg-amber-600' : 'bg-amber-500'}`}>
                        {editingCartId ? 'ยืนยันแก้ไขรายการ' : '+ เพิ่มลงรายการ'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-3">
                <h3 className="font-extrabold text-lg text-emerald-950 flex items-center gap-2"><ListChecks className="w-5 h-5" /> สรุปรายการ</h3>
                {cart.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-sm font-bold">ยังไม่มีรายการ</div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.cartId} className={`flex items-center justify-between p-3 border rounded-xl shadow-sm ${editingCartId === item.cartId ? 'bg-amber-50 border-amber-300' : 'bg-white'}`}>
                        <div className="flex-1">
                          <p className="font-bold text-emerald-900 text-sm">{item.setName} <span className="text-emerald-500">× {item.quantity}</span></p>
                          <p className="text-[10px] text-slate-500">{item.items.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-emerald-700 text-sm">฿{item.totalPrice.toLocaleString()}</p>
                          <button type="button" onClick={() => startEditCartItem(item)} className="text-emerald-500 p-1.5"><Edit3 className="w-4 h-4"/></button>
                          <button type="button" onClick={() => removeFromCart(item.cartId)} className="text-red-300 p-1.5"><Trash2 className="w-4 h-4"/></button>
                        </div>
                      </div>
                    ))}
                    <div className="p-5 bg-emerald-900 text-white rounded-2xl flex justify-between items-center mt-4">
                      <div><span className="text-[10px] block opacity-70">รวมทั้งสิ้น</span><span className="text-2xl font-extrabold">฿{cartTotal.toLocaleString()}</span></div>
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button type="button" onClick={() => { setIsAdding(false); resetForm(); }} className="w-full sm:flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-extrabold">ยกเลิก</button>
                <button type="submit" disabled={cart.length === 0 || !customerName || !phone || editingCartId !== null} className="w-full sm:flex-[2] py-4 bg-emerald-700 text-white rounded-xl font-extrabold text-xl shadow-lg hover:bg-emerald-800 disabled:opacity-30">
                  {editingOrderId ? 'บันทึกแก้ไขออเดอร์' : 'ยืนยันบันทึกออเดอร์'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-950 flex items-center gap-2 border-b-2 border-emerald-200 pb-3">
             <Calendar className="w-6 h-6 text-emerald-700" /> รายการสั่งซื้อ
          </h2>
          
          {isLoading ? (
            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed text-center"><p className="text-slate-400 font-bold italic">กำลังโหลดข้อมูล...</p></div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed text-center"><p className="text-slate-400 font-bold italic">ยังไม่มีรายการสั่งซื้อ</p></div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order) => (
                <div key={order.id} className={`rounded-2xl shadow-md border overflow-hidden ${order.status === 'delivered' ? 'bg-emerald-50 border-emerald-200' : 'bg-[#FBF8E8] border-amber-200'}`}>
                  <div className={`px-3 py-3 flex justify-between items-start gap-3 ${order.status === 'delivered' ? 'bg-emerald-100/60' : 'bg-[#F3EBCB]'}`}>
                      <div className="flex items-center gap-3">
                          <div className="bg-emerald-700 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base shrink-0">{order.customerName.charAt(0)}</div>
                          <div>
                              <div className="flex flex-wrap items-center gap-x-2">
                                <h3 className="font-bold text-base text-slate-800 leading-tight">{order.customerName}</h3>
                                <a href={`tel:${order.phone}`} className="text-[10px] text-slate-500 font-bold flex items-center gap-0.5 bg-white/40 px-1.5 py-0.5 rounded border">
                                    <Phone className="w-3 h-3" /> {order.phone}
                                </a>
                              </div>
                              <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {new Date(order.timestamp).toLocaleTimeString('th-TH')}</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <div className={`text-[9px] font-bold px-2 py-0.5 rounded-full inline-block mb-1 ${order.status === 'delivered' ? 'bg-emerald-400' : 'bg-amber-400'}`}>
                              {order.status === 'delivered' ? 'จัดส่งแล้ว' : 'กำลังดำเนินการ'}
                          </div>
                          <p className="text-lg font-black text-slate-800">฿{order.grandTotal.toLocaleString()}</p>
                      </div>
                  </div>

                  <div className="p-3 space-y-3">
                      <div className="bg-white/60 p-2.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-slate-600 border border-slate-100">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{order.address} | วันที่ส่ง: {order.deliveryDate}</span>
                      </div>
                      <div className={`p-3 rounded-lg text-sm font-semibold text-slate-700 space-y-1.5 ${order.status === 'delivered' ? 'bg-emerald-100/40' : 'bg-amber-100/50'}`}>
                          {order.orderItems && order.orderItems.length > 0
                              ? order.orderItems.map((item: any, idx: number) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <span className="min-w-[5px] h-[5px] rounded-full bg-slate-400 mt-2 shrink-0" />
                                    <span>{item.setName} ({item.items.join(', ')}) x {item.quantity}</span>
                                  </div>
                                ))
                              : <p>{order.itemsSummary}</p>
                          }
                      </div>
                      <div className="flex justify-between items-center pt-1">
                          <button onClick={() => toggleOrderStatus(order.id)} disabled={order.status === 'delivered'} className={`font-bold text-xs flex items-center gap-2 px-4 py-2 rounded-full ${order.status === 'delivered' ? 'bg-emerald-600 text-white opacity-70' : 'bg-emerald-600 text-white'}`}>
                              <CheckCircle className="w-4 h-4"/>
                              <span>{order.status === 'delivered' ? 'เรียบร้อย' : 'จัดส่ง'}</span>
                          </button>
                          <div className="flex items-center gap-1.5">
                              <button onClick={() => startEditOrder(order)} className="text-slate-500 hover:text-slate-800 text-xs font-bold px-2.5 py-1.5">แก้ไข</button>
                              <button onClick={() => deleteOrder(order.id)} className="text-slate-400 hover:text-red-500 p-2"><Trash2 className="w-4 h-4"/></button>
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
