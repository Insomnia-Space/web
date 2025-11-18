import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { menus } from './menu/menu-module-access';
import { MenuItem } from './menu/menu.dto';

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [isCollapsed, setIsCollapsed] = useState(true); // Default collapsed
  const [isHovered, setIsHovered] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  // Show expanded sidebar when hovered
  const shouldExpand = isHovered || !isCollapsed;

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
    // If has children, toggle expand
    if (item.children && item.children.length > 0) {
      toggleExpand(item.moduleCode);
    }

    // If has valid URL, navigate
    if (item.url && item.url !== '#') {
      router.push(item.url);
    }
  };

  // Check if current path matches item or its children
  const isItemActive = (item: MenuItem): boolean => {
    if (item.url === pathname) return true;

    if (item.children) {
      return item.children.some(child => isItemActive(child));
    }

    return false;
  };

  const renderMenuItem = (item: MenuItem, depth: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[item.moduleCode];
    const isActive = pathname === item.url;
    const hasActiveChild = hasChildren && item.children!.some(child => isItemActive(child));
    const Icon = item.icon;

    return (
      <div key={item.moduleCode} className="w-full">
        <button
          onClick={() => handleItemClick(item)}
          className={`group flex w-full items-center justify-between rounded-lg transition-all ${depth === 0 ? 'mb-1 px-3 py-2.5' : 'mb-0.5 px-3 py-2'} ${
            isActive && !hasChildren
              ? 'bg-blue-50 text-blue-600'
              : hasActiveChild
                ? 'bg-blue-50/50 text-blue-600'
                : 'text-gray-700 hover:bg-gray-100'
          } ${depth > 0 ? 'ml-6' : ''} ${!shouldExpand && depth === 0 ? 'justify-center px-2' : ''}`}
          title={!shouldExpand ? item.title : undefined}
        >
          <div className="flex items-center gap-3">
            {Icon && depth === 0 && (
              <Icon
                className={`h-5 w-5 ${isActive || hasActiveChild ? 'text-blue-600' : 'text-gray-500'} flex-shrink-0`}
              />
            )}
            {depth > 0 && shouldExpand && (
              <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-blue-500' : 'bg-gray-400'}`} />
            )}
            {shouldExpand && (
              <span className={`truncate ${depth === 0 ? 'text-sm font-medium' : 'text-sm'}`}>
                {item.title}
              </span>
            )}
          </div>
          {hasChildren && shouldExpand && (
            <div className="flex-shrink-0 text-gray-400">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
          )}
        </button>

        {hasChildren && isExpanded && shouldExpand && (
          <div className="mt-1 space-y-0.5">
            {item.children?.map(child => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${shouldExpand ? 'w-64' : 'w-16'} relative flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toggle Button (Pin/Unpin) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 -right-3 z-10 rounded-full border border-gray-200 bg-white p-1.5 shadow-md transition-all hover:bg-gray-50"
        aria-label={isCollapsed ? 'Pin sidebar (Ctrl+B)' : 'Unpin sidebar (Ctrl+B)'}
        title={isCollapsed ? 'Pin sidebar open (Ctrl+B)' : 'Auto-collapse sidebar (Ctrl+B)'}
      >
        {isCollapsed ? (
          <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
        ) : (
          <X className="h-3.5 w-3.5 text-gray-600" />
        )}
      </button>

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
          <span className="text-base font-bold text-white">TR</span>
        </div>
        {shouldExpand && (
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold text-gray-900">Telco Recommendation</h2>
            <p className="mt-0.5 truncate text-xs text-gray-500">Product System</p>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <div className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {menus.map((menu, idx) => (
          <div key={idx}>
            {menu.label && shouldExpand && (
              <div className="mb-3 px-3">
                <p className="truncate text-xs font-semibold tracking-wider text-gray-400 uppercase">
                  {menu.label}
                </p>
              </div>
            )}
            {menu.label && !shouldExpand && <div className="mb-2 h-px bg-gray-200" />}
            <div className="space-y-1">{menu.items.map(item => renderMenuItem(item))}</div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      {shouldExpand && (
        <div className="border-t border-gray-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600">
              <span className="text-sm font-semibold text-white">U</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">User Name</p>
              <p className="mt-0.5 truncate text-xs text-gray-500">Marketing Staff</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
