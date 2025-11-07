import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { menus } from './menu/menu-module-access';
import { MenuItem } from './menu/menu.dto';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [activeItem, setActiveItem] = useState<string>('/home');

  const toggleExpand = (moduleCode: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [moduleCode]: !prev[moduleCode],
    }));
  };

  const handleItemClick = (url: string) => {
    if (url !== '#') {
      setActiveItem(url);
    }
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.moduleCode];
    const isActive = activeItem === item.url;
    const Icon = item.icon;

    return (
      <div key={item.moduleCode} className="w-full">
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpand(item.moduleCode);
            }
            handleItemClick(item.url);
          }}
          className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all ${depth === 0 ? 'mb-1' : 'mb-0.5'} ${
            isActive && !hasChildren
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-700 hover:bg-gray-100'
          } ${depth > 0 ? 'ml-4' : ''} ${isCollapsed && depth === 0 ? 'justify-center px-2' : ''} `}
          title={isCollapsed ? item.title : undefined}
        >
          <div className="flex items-center gap-2.5">
            {Icon && depth === 0 && (
              <Icon
                className={`h-4 w-4 ${isActive ? 'text-blue-500' : 'text-gray-500'} flex-shrink-0`}
              />
            )}
            {depth > 0 && !isCollapsed && (
              <div
                className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-400'}`}
              />
            )}
            {!isCollapsed && <span className="truncate tracking-tight">{item.title}</span>}
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
          <div className="mt-1 space-y-0.5">
            {item.children?.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={` ${isCollapsed ? 'w-16' : 'w-64'} relative flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 z-10 rounded-full border border-gray-200 bg-white p-1.5 shadow-md transition-all hover:bg-gray-50"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
        ) : (
          <X className="h-3.5 w-3.5 text-gray-600" />
        )}
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 p-4">
        {/* <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">LD</span>
        </div> */}
        {/* nanti ganti sama logo image */}
        {!isCollapsed && (
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold tracking-tight text-gray-800">
              Title Dashboard
            </h2>
            <p className="truncate text-xs text-gray-500">Sub-title</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 space-y-6 overflow-y-auto p-3">
        {menus.map((menu, idx) => (
          <div key={idx}>
            {menu.label && !isCollapsed && (
              <div className="mb-2 px-3">
                <p className="truncate text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {menu.label}
                </p>
              </div>
            )}
            {menu.label && isCollapsed && <div className="mb-2 h-px bg-gray-200" />}
            <div className="space-y-1">{menu.items.map(item => renderMenuItem(item))}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
