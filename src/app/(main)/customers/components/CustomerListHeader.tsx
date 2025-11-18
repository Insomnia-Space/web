interface CustomerListHeaderProps {
  title?: string;
  description?: string;
}

export function CustomerListHeader({
  title = 'Customer List View',
  description = 'Manage and view all customer information',
}: CustomerListHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}
