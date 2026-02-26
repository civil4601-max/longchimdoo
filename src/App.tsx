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
  const [deliveryDate, setDeliveryDate] = useState(''); // New state for delivery date
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
      // Start fetching everything in parallel
      const statusPromise = checkGoogleStatus();
      const configsPromise = fetchConfigs();
      const ordersPromise = fetch('/api/orders').then(res => res.ok ? res.json() : null).catch(e => {
        console.error("Failed to fetch orders", e);
        return null;
      });

      // Wait for all requests to complete
      await statusPromise;
      const configsData = await configsPromise;
      const ordersData = await ordersPromise;

      // Process orders with the fetched configs
      await fetchOrders(configsData, ordersData);
    };
    init();
  }, []);

  const fetchConfigs = async () => {
    try {
      const res = await fetch('/api/configs');
      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success' && data.data) {
          if (data.data.setConfigs && Array.isArray(data.data.setConfigs)) {
            setSetConfigs(data.data.setConfigs);
          }
          if (data.data.dessertData && Array.isArray(data.data.dessertData)) {
            setDessertData(data.data.dessertData);
          }
          return data.data; // Return data for sequential calls
        }
      }
    } catch (e) {
      console.error("Failed to fetch configs", e);
    }
    return null;
  };

  const saveConfigsToSheet = async () => {
    if (!isGoogleConnected) return;
    try {
      const res = await fetch('/api/save-configs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ configs: { setConfigs, dessertData } })
      });
      if (!res.ok) {
        console.error("Failed to save configs to sheet");
      }
    } catch (e) {
      console.error("Error saving configs", e);
    }
  };

  const fetchOrders = async (currentConfigs?: any, preFetchedOrdersData?: any) => {
    try {
      setIsLoading(true);
      
      let data = preFetchedOrdersData;
      
      // If no pre-fetched data, fetch it now
      if (!data) {
        const res = await fetch('/api/orders');
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
    try {
      const res = await fetch('/api/auth/status');
      const data = await res.json();
      setIsGoogleConnected(data.connected);
    } catch (e) {
      console.error("Failed to check auth status", e);
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

  // คำนวณยอดผลิตรวมเป็น Map เพื่อการค้นหาที่รวดเร็ว
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
        // Parse itemsSummary: "setName (item1, item2) x 2 | ..."
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

  // ฟังก์ชันจัดการเมนูขนม (เพิ่ม/ลบ/แก้ไข)
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
    
    // Format delivery date for input (YYYY-MM-DD)
    let formattedDate = '';
    if (order.deliveryDate) {
      // Check if already in YYYY-MM-DD
      if (/^\d{4}-\d{2}-\d{2}$/.test(order.deliveryDate)) {
        formattedDate = order.deliveryDate;
      } else {
        // Try parsing standard date string
        const date = new Date(order.deliveryDate);
        if (!isNaN(date.getTime())) {
          formattedDate = date.toISOString().split('T')[0];
        } else {
            // Handle potential DD/MM/YYYY format manually if Date parsing fails
            const parts = order.deliveryDate.split('/');
            if (parts.length === 3) {
                // Assuming DD/MM/YYYY
                formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
            }
        }
      }
    }
    setDeliveryDate(formattedDate);
    
    let itemsToEdit = [...(order.orderItems || [])];
    
    // ถ้า orderItems ว่าง (กรณีดึงมาจาก Google Sheets) ให้พยายามแกะจาก itemsSummary
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

    // เริ่มต้นการแก้ไขรายการแรกในตะกร้าโดยอัตโนมัติ
    if (itemsToEdit.length > 0) {
      startEditCartItem(itemsToEdit[0]);
    }
  };

  const toggleOrderStatus = async (orderId: number) => {
    const orderToUpdate = orders.find(o => o.id === orderId);
    if (!orderToUpdate) return;

    const newStatus = orderToUpdate.status === 'pending' ? 'delivered' : 'pending';

    // อัปเดตสถานะใน UI ทันทีเพื่อการตอบสนองที่รวดเร็ว
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, status: newStatus };
      }
      return o;
    }));

    // ส่งการเปลี่ยนแปลงสถานะไปยัง Backend เพื่ออัปเดต Google Sheet
    try {
      const res = await fetch('/api/update-order-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: orderToUpdate.id, isFromSheet: orderToUpdate.isFromSheet, timestamp: orderToUpdate.timestamp, newStatus })
      });

      if (!res.ok) {
        console.error('Failed to update order status in Google Sheet');
        // หากอัปเดตไม่สำเร็จ อาจจะย้อนสถานะใน UI กลับ หรือแจ้งเตือนผู้ใช้
        setOrders(orders.map(o => {
          if (o.id === orderId) {
            return { ...o, status: orderToUpdate.status }; // ย้อนสถานะกลับ
          }
          return o;
        }));
      }
    } catch (e) {
      console.error('Error updating order status:', e);
      // หากเกิดข้อผิดพลาด อาจจะย้อนสถานะใน UI กลับ หรือแจ้งเตือนผู้ใช้
      setOrders(orders.map(o => {
        if (o.id === orderId) {
          return { ...o, status: orderToUpdate.status }; // ย้อนสถานะกลับ
        }
        return o;
      }));
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
      setOrders(orders.map(o => o.id === editingOrderId ? {
        ...o,
        customerName,
        phone,
        address,
        deliveryDate, // Include delivery date
        orderItems: [...cart],
        grandTotal: cartTotal,
      } : o));
    } else {
      const newOrder = {
        id: Date.now(),
        customerName,
        phone,
        address,
        deliveryDate, // Include delivery date
        orderItems: [...cart],
        grandTotal: cartTotal,
        status: 'pending',
        timestamp: new Date().toISOString(),
      };
      setOrders([newOrder, ...orders]);
      
      // Save to Google Sheets if connected
      if (isGoogleConnected) {
        saveToGoogleSheets(newOrder);
      }
    }

    resetForm();
    setIsAdding(false);
  };

  const saveToGoogleSheets = async (order: any) => {
    try {
      const res = await fetch('/api/save-to-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order })
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save to sheet");
      }
    } catch (e: any) {
      console.error("Google Sheets Error:", e);
      alert(`ไม่สามารถบันทึกลง Google Sheets ได้: ${e.message}`);
    }
  };

  const resetForm = () => {
    setCustomerName('');
    setPhone('');
    setAddress('');
    setDeliveryDate(''); // Reset delivery date
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
      {!isGoogleConnected && !isLoading && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-red-500" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-red-800">
                ไม่สามารถเชื่อมต่อกับ Google Sheets ได้
              </h3>
              <div className="mt-1 text-xs text-red-700">
                <p>กรุณาตรวจสอบการตั้งค่า Environment Variable ในระบบ Deploy ของคุณ:</p>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>ต้องมีตัวแปรชื่อ <code>GOOGLE_APPS_SCRIPT_URL</code></li>
                  <li>ค่าของตัวแปรต้องเป็น URL ของ Web App ที่ได้จากการ Deploy Google Apps Script (ลงท้ายด้วย <code>/exec</code>)</li>
                  <li>สิทธิ์การเข้าถึงของ Script ต้องตั้งเป็น "Anyone" (ทุกคน)</li>
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
                title={isGoogleConnected ? 'Google Sheets (Apps Script) เชื่อมต่อแล้ว' : 'ยังไม่ได้ตั้งค่า Apps Script URL'}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${isGoogleConnected ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.6)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.6)]'}`}
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

        {/* Section: Recipe Guide (Full Width) */}
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
                     {currentCount > 0 ? (
                        <span className="bg-red-500 text-white text-[9px] md:text-[10px] font-black min-w-[18px] md:min-w-[20px] h-4 md:h-5 flex items-center justify-center rounded-full shadow-md animate-pulse px-1">
                          {currentCount}
                        </span>
                     ) : (
                        <Info className="w-3 h-3 text-emerald-300" />
                     )}
                   </button>
                 );
               })}
            </div>
          </div>
        )}

        {/* Modal ตั้งค่าราคา ชื่อเซต และเมนูขนม */}
        {isEditingConfigs && (
          <div className="fixed inset-0 bg-emerald-950/60 backdrop-blur-md z-[60] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-[#F8FAF8] rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-8 border-white flex flex-col">
              <div className="bg-emerald-800 p-5 text-white relative shrink-0">
                <button 
                  onClick={() => {
                    saveConfigsToSheet();
                    setIsEditingConfigs(false);
                  }} 
                  className="absolute top-4 right-4 bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors"
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
                  {/* จัดการรูปแบบเซต */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b-2 border-emerald-100 pb-2">
                      <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
                        <Package className="w-3.5 h-3.5" /> A. รูปแบบเซตขนม
                      </h4>
                      <button type="button" onClick={addNewSet} className="flex items-center gap-1 bg-emerald-700 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold shadow-md hover:bg-emerald-800 transition-all active:scale-95">
                        <PlusCircle className="w-3.5 h-3.5" /> เพิ่มเซต
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {setConfigs.map((set) => (
                        <div key={set.id} className="bg-white p-4 rounded-2xl border-2 border-emerald-50 shadow-sm space-y-3 relative group hover:border-emerald-200 transition-all">
                          <button type="button" onClick={() => removeSet(set.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"><X className="w-3 h-3" /></button>
                          <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">ชื่อเซต</label>
                            <input className="w-full text-xs font-extrabold p-2 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-lg outline-none transition-all" value={set.name} onChange={(e) => updateSetConfig(set.id, 'name', e.target.value)} />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">ราคา (฿)</label>
                              <input type="number" className="w-full text-xs font-extrabold p-2 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-lg outline-none transition-all" value={set.price} onChange={(e) => updateSetConfig(set.id, 'price', parseInt(e.target.value) || 0)} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">จำนวน (ชิ้น)</label>
                              <input type="number" className="w-full text-xs font-extrabold p-2 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-lg outline-none transition-all" value={set.limit} onChange={(e) => updateSetConfig(set.id, 'limit', parseInt(e.target.value) || 0)} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* จัดการรายชื่อขนมและสูตร */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b-2 border-emerald-100 pb-2">
                      <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5" /> B. รายชื่อขนมและส่วนผสม
                      </h4>
                      <button type="button" onClick={addNewDessert} className="flex items-center gap-1 bg-amber-500 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold shadow-md hover:bg-amber-600 transition-all active:scale-95">
                        <PlusSquare className="w-3.5 h-3.5" /> เพิ่มขนมใหม่
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {dessertData.map((dessert) => (
                        <div key={dessert.id} className="bg-white p-4 rounded-[1.5rem] border-2 border-emerald-50 shadow-sm space-y-4 hover:border-emerald-200 transition-all">
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider">ชื่อขนมไทย</label>
                              <input 
                                className="w-full text-lg font-black p-2 bg-slate-50 border-2 border-transparent focus:border-emerald-500 rounded-xl outline-none transition-all" 
                                value={dessert.name} 
                                onChange={(e) => updateDessertName(dessert.id, e.target.value)} 
                              />
                            </div>
                            <button type="button" onClick={() => removeDessert(dessert.id)} className="text-red-300 hover:text-red-500 p-2 mt-4 transition-colors"><Trash2 className="w-5 h-5"/></button>
                          </div>

                          <div className="bg-emerald-50/50 p-4 rounded-xl space-y-3 border border-emerald-100">
                            <div className="flex justify-between items-center">
                              <span className="text-xs font-black text-emerald-800 uppercase tracking-widest">ส่วนผสมต่อขนม 1 ชิ้น</span>
                              <button type="button" onClick={() => addIngredientToDessert(dessert.id)} className="text-[10px] font-black text-emerald-700 bg-white border-2 border-emerald-100 px-2.5 py-1.5 rounded-lg shadow-sm hover:bg-emerald-50 transition-all">+ เพิ่มวัตถุดิบ</button>
                            </div>
                            <div className="space-y-2">
                              {dessert.ingredients.map((ing: any, i: number) => (
                                <div key={i} className="grid grid-cols-12 gap-2 items-center">
                                  <div className="col-span-5">
                                    <input className="w-full text-xs font-bold p-2.5 bg-white border-2 border-transparent focus:border-emerald-500 rounded-lg outline-none shadow-sm" placeholder="ชื่อวัตถุดิบ" value={ing.name} onChange={(e) => updateIngredient(dessert.id, i, 'name', e.target.value)} />
                                  </div>
                                  <div className="col-span-3">
                                    <input type="number" step="0.1" className="w-full text-xs font-bold p-2.5 bg-white border-2 border-transparent focus:border-emerald-500 rounded-lg outline-none text-center shadow-sm" placeholder="ปริมาณ" value={ing.amount} onChange={(e) => updateIngredient(dessert.id, i, 'amount', parseFloat(e.target.value) || 0)} />
                                  </div>
                                  <div className="col-span-3">
                                    <input className="w-full text-xs font-bold p-2.5 bg-white border-2 border-transparent focus:border-emerald-500 rounded-lg outline-none text-center shadow-sm" placeholder="หน่วย" value={ing.unit} onChange={(e) => updateIngredient(dessert.id, i, 'unit', e.target.value)} />
                                  </div>
                                  <div className="col-span-1 text-right">
                                    <button type="button" onClick={() => removeIngredient(dessert.id, i)} className="text-red-200 hover:text-red-500 transition-colors"><X className="w-4 h-4"/></button>
                                  </div>
                                </div>
                              ))}
                              {dessert.ingredients.length === 0 && <p className="text-xs text-slate-400 font-bold italic text-center py-1">ยังไม่มีข้อมูลส่วนผสม</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-white border-t-2 border-emerald-50 shrink-0">
                <button 
                  onClick={() => {
                    saveConfigsToSheet();
                    setIsEditingConfigs(false);
                  }}
                  className="w-full py-3.5 bg-emerald-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-700/20 hover:bg-emerald-800 transition-all active:scale-[0.98]"
                >
                  บันทึกและปิดหน้าต่าง
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal แสดงสูตรส่วนผสมที่คำนวณตามยอดผลิต */}
        {showRecipeModal && (
          <div className="fixed inset-0 bg-emerald-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border-4 border-emerald-600/10">
              <div className="bg-emerald-700 p-6 text-white relative">
                <button onClick={() => setShowRecipeModal(null)} className="absolute top-4 right-4 bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-200">สรุปวัตถุดิบที่ต้องใช้</p>
                    <h3 className="text-xl font-extrabold">{showRecipeModal.name}</h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {/* แสดงยอดผลิตรวมที่ใช้ในการคำนวณ */}
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-800">ยอดผลิตที่ต้องเตรียมทั้งหมด:</span>
                  <span className="bg-amber-500 text-white px-3 py-1 rounded-full font-black text-sm shadow-sm">
                    {productionMap[showRecipeModal.name] || 0} ชิ้น
                  </span>
                </div>

                <div className="space-y-3">
                  {showRecipeModal.ingredients.length > 0 ? (
                    showRecipeModal.ingredients.map((ing: any, i: number) => {
                      const totalAmount = ing.amount * (productionMap[showRecipeModal.name] || 0);
                      return (
                        <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-700">{ing.name}</span>
                            <span className="text-[10px] text-slate-400 font-medium">({ing.amount} {ing.unit} / ชิ้น)</span>
                          </div>
                          <span className="font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg text-base">
                            {totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })} {ing.unit}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-center py-4 text-slate-400 font-bold italic">ยังไม่ได้บันทึกส่วนผสมสำหรับขนมนี้</p>
                  )}
                </div>
                
                <p className="mt-4 text-[10px] text-slate-400 text-center font-medium italic">
                  * คำนวณจากยอดออเดอร์ "รอดำเนินการ" ทั้งหมด
                </p>

                <button 
                  onClick={() => setShowRecipeModal(null)}
                  className="w-full mt-6 py-3 bg-emerald-700 text-white rounded-xl font-extrabold shadow-lg shadow-emerald-700/20 active:translate-y-0.5 transition-all"
                >
                  รับทราบ
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Section */}
        {isAdding && (
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-emerald-100 p-4 md:p-6 mb-8 relative ring-4 ring-emerald-500/10 animate-in fade-in slide-in-from-top-4 duration-300">
            <button onClick={() => { setIsAdding(false); resetForm(); }} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 rounded-full transition-colors">
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-xl md:text-2xl font-extrabold mb-6 text-emerald-950 flex items-center gap-2 border-b-2 border-emerald-50 pb-4 pr-10">
              <ShoppingCart className="text-emerald-600 w-5 h-5 md:w-6 md:h-6" /> 
              {editingOrderId ? 'แก้ไขใบสั่งซื้อ' : 'สร้างใบสั่งซื้อใหม่'}
            </h2>
            
            <form onSubmit={handleCheckout} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-slate-50/50 p-3 rounded-2xl border border-slate-100">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><User className="w-4 h-4 text-emerald-600" /> ชื่อลูกค้า</label>
                  <input required type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold" placeholder="ระบุชื่อลูกค้า" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><Phone className="w-4 h-4 text-emerald-600" /> เบอร์โทรศัพท์</label>
                  <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold" placeholder="08X-XXX-XXXX" />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><MapPin className="w-4 h-4 text-emerald-600" /> ที่อยู่จัดส่ง</label>
                  <input required type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold" placeholder="ระบุที่อยู่จัดส่งและเวลา..." />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-emerald-900 flex items-center gap-1"><CalendarDays className="w-4 h-4 text-emerald-600" /> วันที่จัดส่ง</label>
                  <input required type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full p-2.5 bg-white border-2 border-emerald-50 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold" />
                </div>
              </div>

              {/* Selection Area */}
              <div id="selection-area" className={`p-4 md:p-6 rounded-[1.5rem] border-2 transition-all space-y-6 ${editingCartId ? 'bg-amber-50 border-amber-200 ring-4 ring-amber-500/10' : 'bg-emerald-50/30 border-emerald-100'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-50 pb-4">
                  <label className="text-base md:text-lg font-bold text-emerald-900 flex items-center gap-2">
                    {editingCartId && <Edit3 className="w-5 h-5 text-amber-500" />}
                    {editingCartId ? 'กำลังแก้ไขรายการเซตที่เลือก' : '1. เลือกรูปแบบเซตเพื่อเพิ่มรายการ'}
                  </label>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    {editingCartId && (
                      <button type="button" onClick={() => { setEditingCartId(null); setSelectedSetId(null); setSelectedItems([]); }}
                        className="text-xs font-bold text-amber-700 underline underline-offset-4 ml-auto">ยกเลิกการแก้ไข</button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {setConfigs.map((set) => (
                    <button key={set.id} type="button" onClick={() => { setSelectedSetId(set.id); setSelectedItems([]); }}
                      className={`p-3 rounded-xl border-2 text-xs md:text-sm font-extrabold transition-all text-center ${
                        selectedSetId === set.id ? 'bg-emerald-600 border-emerald-700 text-white shadow-md' : 'bg-white border-emerald-50 text-emerald-900 hover:bg-emerald-50'
                      }`}>
                      {set.name}
                      <div className={`text-[10px] mt-1 ${selectedSetId === set.id ? 'text-emerald-100' : 'text-emerald-500'}`}>฿{set.price} ({set.limit})</div>
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
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border-2 ${
                              selectedItems.includes(item) ? 'bg-emerald-700 border-emerald-800 text-white shadow-sm' : 'bg-emerald-50 text-emerald-900 border-transparent'
                            }`}>{item}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <label className="text-[10px] font-extrabold text-emerald-700 uppercase mb-1 block text-center">จำนวนกล่อง</label>
                        <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                          className="w-full p-2.5 bg-white border border-emerald-100 rounded-xl text-center font-extrabold text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                      </div>
                      <button type="button" onClick={addToCart} disabled={selectedItems.length !== selectedSet.limit}
                        className={`flex-[2] py-4 text-white rounded-xl font-extrabold text-sm shadow-lg disabled:opacity-30 transition-all ${editingCartId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-amber-500 hover:bg-amber-600'}`}>
                        {editingCartId ? 'ยืนยันการแก้ไขรายการ' : '+ เพิ่มเซตนี้ลงรายการ'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-extrabold text-lg text-emerald-950 flex items-center gap-2"><ListChecks className="w-5 h-5 text-emerald-600" /> สรุปรายการในออเดอร์นี้</h3>
                {cart.length === 0 ? (
                  <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 font-bold text-sm">ยังไม่มีรายการเซต</div>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={item.cartId} className={`flex items-center justify-between p-3 border rounded-xl shadow-sm transition-all ${editingCartId === item.cartId ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-200' : 'bg-white border-emerald-50'}`}>
                        <div className="flex-1">
                          <p className="font-bold text-emerald-900 text-sm">{item.setName} <span className="text-emerald-500">× {item.quantity}</span></p>
                          <p className="text-[10px] text-slate-500">{item.items.join(', ')}</p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <p className="font-extrabold text-emerald-700 whitespace-nowrap">฿{item.totalPrice.toLocaleString()}</p>
                          <div className="flex">
                             <button type="button" onClick={() => startEditCartItem(item)} className="text-emerald-500 p-1.5 rounded-lg hover:bg-emerald-50"><Edit3 className="w-4 h-4"/></button>
                             <button type="button" onClick={() => removeFromCart(item.cartId)} className="text-red-300 p-1.5 rounded-lg hover:bg-red-50"><Trash2 className="w-4 h-4"/></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="p-5 bg-emerald-900 text-white rounded-2xl flex justify-between items-center shadow-xl mt-4">
                      <div>
                        <span className="font-bold uppercase tracking-widest text-emerald-300 text-[10px] block">ยอดเงินสุทธิ</span>
                        <span className="text-2xl font-extrabold">฿{cartTotal.toLocaleString()}</span>
                      </div>
                      <CheckCircle className="w-8 h-8 text-emerald-500" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button type="button" onClick={() => { setIsAdding(false); resetForm(); }} className="w-full sm:flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-extrabold border-b-4 border-slate-300 active:translate-y-1 active:border-b-0 transition-all">ยกเลิก</button>
                <button type="submit" disabled={cart.length === 0 || !customerName || !phone || editingCartId !== null}
                  className="w-full sm:flex-[2] py-4 bg-emerald-700 text-white rounded-xl font-extrabold text-xl shadow-lg border-b-4 border-emerald-900 disabled:opacity-30 hover:bg-emerald-800 active:translate-y-1 active:border-b-0 transition-all">
                  {editingOrderId ? 'บันทึกการแก้ไข' : 'ยืนยันบันทึกออเดอร์'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Orders List */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-extrabold text-emerald-950 flex items-center gap-2 border-b-2 border-emerald-200 pb-3">
             <Calendar className="w-6 h-6 text-emerald-700" /> ออเดอร์วันนี้
          </h2>
          
          {isLoading ? (
            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-emerald-100 text-center">
              <p className="text-slate-400 font-bold italic">กำลังโหลดข้อมูล...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-emerald-100 text-center">
              <ShoppingBasket className="w-12 h-12 text-emerald-100 mx-auto mb-3" />
              <p className="text-slate-400 font-bold italic">ยังไม่มีรายการสั่งซื้อ</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders
                .slice()
                .sort((a, b) => {
                  if (a.status === 'pending' && b.status !== 'pending') return -1;
                  if (a.status !== 'pending' && b.status === 'pending') return 1;
                  return b.timestamp.localeCompare(a.timestamp);
                })
                .map((order) => (
                <div key={order.id} className={`rounded-2xl shadow-md border overflow-hidden transition-colors ${order.status === 'delivered' ? 'bg-emerald-50 border-emerald-200' : 'bg-[#FBF8E8] border-amber-200'}`}>
                  {/* Card Header */}
                  <div className={`px-3 py-3 flex justify-between items-start gap-3 ${order.status === 'delivered' ? 'bg-emerald-100/60' : 'bg-[#F3EBCB]'}`}>
                      <div className="flex items-center gap-3">
                          <div className="bg-emerald-700 text-white w-9 h-9 rounded-lg flex items-center justify-center font-bold text-base shrink-0">
                              {order.customerName.charAt(0) || 'ก'}
                          </div>
                          <div>
                              <div className="flex flex-wrap items-center gap-x-2">
                                <h3 className="font-bold text-base text-slate-800 leading-tight">{order.customerName}</h3>
                                <a href={`tel:${order.phone}`} className="text-xs text-slate-500 font-bold flex items-center gap-0.5 hover:text-emerald-700 bg-white/40 px-1.5 py-0.5 rounded border border-slate-200/50 transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <Phone className="w-3 h-3" />
                                    {order.phone}
                                </a>
                              </div>
                              <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                                  <Clock className="w-3 h-3" />
                                  {new Date(order.timestamp).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                              </p>
                          </div>
                      </div>
                      <div className="text-right shrink-0">
                          {order.status === 'pending' ? (
                              <div className="bg-amber-400 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                                  กำลังดำเนินการ
                              </div>
                          ) : (
                              <div className="bg-emerald-400 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mb-1">
                                  จัดส่งแล้ว
                              </div>
                          )}
                          <p className="text-lg font-black text-slate-800 leading-tight">฿{order.grandTotal.toLocaleString()}</p>
                      </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 space-y-3">
                      {/* Info pills */}
                      <div className="bg-white/60 p-2.5 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm gap-2 border border-slate-100">
                          <div className="flex items-center gap-2 text-slate-600 font-semibold truncate w-full">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{order.address || 'N/A'}</span>
                          </div>
                      </div>

                      {/* Items summary */}
                      <div className={`p-3 rounded-lg text-sm font-semibold text-slate-700 leading-relaxed space-y-1.5 ${order.status === 'delivered' ? 'bg-emerald-100/40' : 'bg-amber-100/50'}`}>
                          {order.orderItems && order.orderItems.length > 0
                              ? order.orderItems.map((item: any, idx: number) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    <span className="min-w-[5px] h-[5px] rounded-full bg-slate-400 mt-2 shrink-0" />
                                    <span>{item.setName} ({item.items.join(', ')}) x {item.quantity}</span>
                                  </div>
                                ))
                              : order.itemsSummary.split(' | ').map((line: string, idx: number) => (
                                  <div key={idx} className="flex items-start gap-2">
                                    {line.trim() && <span className="min-w-[5px] h-[5px] rounded-full bg-slate-400 mt-2 shrink-0" />}
                                    <span>{line.trim()}</span>
                                  </div>
                                ))
                          }
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center pt-1">
                          <button
                              onClick={() => toggleOrderStatus(order.id)}
                              disabled={order.status === 'delivered'}
                              className={`font-bold text-sm flex items-center gap-2 transition-all px-4 py-2 rounded-full ${order.status === 'delivered' 
                                  ? 'bg-emerald-600 text-white opacity-70 cursor-not-allowed' 
                                  : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'}`}>
                              <CheckCircle className="w-4 h-4"/>
                              <span>{order.status === 'delivered' ? 'เรียบร้อย' : 'จัดส่ง'}</span>
                          </button>
                          <div className="flex items-center gap-1.5">
                              <button onClick={() => startEditOrder(order)} className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-bold transition-colors px-2.5 py-1.5 rounded-md hover:bg-slate-100">
                                  <Edit className="w-3.5 h-3.5"/> แก้ไข
                              </button>
                              <button onClick={() => deleteOrder(order.id)} className="text-slate-400 hover:text-red-500 p-2 transition-colors rounded-md hover:bg-red-50">
                                  <Trash2 className="w-4 h-4"/>
                              </button>
                          </div>
                      </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #064e3b; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
