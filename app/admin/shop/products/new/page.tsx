import { ProductForm } from '../../product-form';

export const metadata = { title: 'New product' };

export default function NewProductPage() {
  return (
    <div className="min-h-screen max-w-3xl mx-auto px-6 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight mb-2">New product</h1>
      <p className="text-sm text-muted mb-8">Create a product. You can edit prices and fulfillment after.</p>
      <ProductForm />
    </div>
  );
}
