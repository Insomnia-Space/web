'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
// Asumsi: menus, MenuItem sudah diimpor dengan benar
import { menus } from './menu/menu-module-access'; 
import { MenuItem } from './menu/menu.dto';

// --- KONSTANTA GAYA (Untuk konsistensi) ---
// Warna Aksen/Active State (Menggunakan warna Dark Gray/Black dari sidebar di gambar)
const ACTIVE_BG = 'bg-gray-900';
const ACTIVE_TEXT = 'text-white';
const ACTIVE_ICON = 'text-white';
// Hover State (Menggunakan abu-abu sangat muda untuk hover)
const HOVER_BG = 'hover:bg-gray-100';
const HOVER_TEXT = 'hover:text-gray-900';
// Border/Separator
const BORDER_COLOR = 'border-gray-100';


export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // State awal: isCollapsed di gambar terlihat tidak collapsed secara default
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Keyboard shortcut: Ctrl+B to toggle collapse
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        setIsCollapsed(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleExpand = (moduleCode: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [moduleCode]: !prev[moduleCode],
    }));
  };

  const handleItemClick = (item: MenuItem) => {
    // Jika collapsed dan punya children, expand sidebar dulu
    if (isCollapsed && item.children && item.children.length > 0) {
      setIsCollapsed(false);
      // Tunggu transisi selesai sebelum membuka submenu
      setTimeout(() => toggleExpand(item.moduleCode), 300); 
      return;
    }

    // Jika punya children, toggle expand
    if (item.children && item.children.length > 0) {
      toggleExpand(item.moduleCode);
    }

    // Jika punya URL valid, navigasi
    if (item.url && item.url !== '#') {
      router.push(item.url);
    }
  };

  // Check if current path matches item or its children (retained logic)
  const isItemActive = (item: MenuItem): boolean => {
    if (item.url === pathname) return true;

    if (item.children) {
      return item.children.some(child => isItemActive(child));
    }

    return false;
  };
  
  // Custom Hook untuk menentukan apakah menu harus diperluas saat load
  useEffect(() => {
    const defaultExpanded: Record<string, boolean> = {};
    menus.forEach(menu => {
        menu.items.forEach(item => {
            if (isItemActive(item) && item.children) {
                defaultExpanded[item.moduleCode] = true;
            }
        });
    });
    setExpandedItems(prev => ({ ...prev, ...defaultExpanded }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);


  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.moduleCode];
    const isActive = pathname === item.url;
    // Pengecekan apakah anak memiliki status aktif (untuk highlight parent)
    const hasActiveChild = hasChildren && item.children!.some(child => isItemActive(child));
    const isParentActive = isActive || hasActiveChild;
    const Icon = item.icon;

    // Jangan tampilkan anak saat collapsed
    if (depth > 0 && isCollapsed) return null;

    // Tentukan kelas dasar untuk item
    const baseClasses = `group flex w-full items-center transition-all duration-150 rounded-lg`;

    // Tentukan padding berdasarkan depth dan collapsed state
    const paddingClasses = isCollapsed && depth === 0 
      ? 'justify-center p-3' // Diperbesar sedikit di collapsed state
      : depth === 0 
        ? 'px-3 py-2.5' // Lebih lega untuk item level 0
        : 'px-3 py-2'; // Normal untuk submenu

    // Tentukan warna berdasarkan status (Active/ParentActive/Default)
    let colorClasses = '';
    if (isActive && !hasChildren) {
      // Aktif (bukan parent)
      colorClasses = `${ACTIVE_BG} ${ACTIVE_TEXT}`;
    } else if (isParentActive) {
      // Parent dari yang aktif
      colorClasses = `${ACTIVE_BG} ${ACTIVE_TEXT}`;
    } else {
      // Default / Hover
      colorClasses = `text-gray-600 ${HOVER_BG} ${HOVER_TEXT}`;
    }
    
    // Tentukan margin untuk submenu
    const marginClasses = depth > 0 ? 'ml-4' : ''; 

    return (
      <div key={item.moduleCode} className="w-full">
        <button
          onClick={() => handleItemClick(item)}
          className={`${baseClasses} ${paddingClasses} ${colorClasses} ${marginClasses} 
                     ${isCollapsed && depth === 0 ? 'justify-center' : 'justify-between'}`}
          title={isCollapsed ? item.title : undefined}
        >
          <div className="flex items-center gap-3">
            {Icon && depth === 0 && ( // Tampilkan ikon hanya di level 0
              <Icon
                // Warna ikon mengikuti status aktif
                className={`h-5 w-5 flex-shrink-0 ${isParentActive ? ACTIVE_ICON : 'text-gray-500'}`}
              />
            )}
            {depth > 0 && !isCollapsed && ( // Dot untuk submenu
              <div className={`h-1.5 w-1.5 rounded-full ${isActive ? ACTIVE_BG : 'bg-gray-400'}`} />
            )}
            {!isCollapsed && (
              <span className={`truncate text-sm ${depth === 0 ? 'font-medium' : ''}`}>
                {item.title}
              </span>
            )}
          </div>
          {hasChildren && !isCollapsed && (
            <div className="flex-shrink-0 text-gray-400">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </button>

        {hasChildren && isExpanded && !isCollapsed && (
          // Jarak antar submenu lebih renggang sedikit
          <div className="mt-1 space-y-1"> 
            {item.children?.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      // 1. Lebar: Dipertahankan, Transisi
      // 2. Border: Lebih halus
      className={`${isCollapsed ? 'w-20' : 'w-64'} 
                 relative flex h-full flex-col ${BORDER_COLOR} bg-white py-4 transition-all duration-300 ease-in-out`}
    >
      
      {/* 4. Logo Panze - Menggunakan logo minimalis seperti di gambar */}
      <div className={`mb-8 flex px-4 ${isCollapsed ? 'justify-center' : 'items-center gap-2'}`}>
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center">
          {/* Logo Panze (Icon) - Ganti dengan ikon 2 lingkaran yang ada di gambar Panze, atau biarkan teks minimalis. */}
          <div className="flex items-center gap-0.5">
             <div className="h-4 w-4 rounded-full border-2 border-gray-900" />
             <div className="h-4 w-4 rounded-full border-2 border-gray-900 bg-gray-900" />
          </div>
        </div>
        {!isCollapsed && (
          <h2 className="truncate text-lg font-bold text-gray-900">Judulnya Apanih</h2>
        )}
      </div>

      {/* 3. Menu Items: Tambahkan padding vertikal yang lebih lega (space-y-4) */}
      <div className="flex-1 space-y-4 overflow-y-auto px-3 scrollbar-hide">
        {menus.map((menu, idx) => (
          <div key={idx}>
            {menu.label && !isCollapsed && (
              // 3. Label Group: Font lebih tipis, warna lebih lembut
              <div className="mb-2 px-3"> 
                <p className="truncate text-xs font-semibold uppercase tracking-wider text-gray-400"> 
                  {menu.label}
                </p>
              </div>
            )}
            {/* Horizontal line saat collapsed untuk pemisah group */}
            {menu.label && isCollapsed && <div className={`mb-2 h-px bg-gray-200`} />} 
            <div className="space-y-1">{menu.items.map(item => renderMenuItem(item))}</div>
          </div>
        ))}
      </div>
      
      {/* 6. Toggle Button - Diposisikan persis di kanan atas dan border lebih tipis */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        // Shadow dan border lebih minimalis, latar belakang putih
        className="absolute -right-3 top-4 z-10 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm transition-all hover:bg-gray-50"
        aria-label={isCollapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
        title={isCollapsed ? 'Expand sidebar (Ctrl+B)' : 'Collapse sidebar (Ctrl+B)'}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5 text-gray-600" />
        )}
      </button>
    </div>
  );
};