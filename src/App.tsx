import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  Scan,
  MessageCircle,
  X,
  Minus,
  Plus,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Car,
  Clipboard,
  Share2,
  Settings2,
  User,
  Phone,
  Clock,
  Check,
  ShieldCheck,
  LayoutDashboard,
  ShoppingBag,
} from "lucide-react";
import { AUTO_PARTS_DATA } from "./data/stockData";
import { PartItem, Inquiry } from "./types";

// --- Components ---

const DenseRow: React.FC<{
  part: PartItem;
  onClick: (part: PartItem) => void;
}> = ({ part, onClick }) => {
  const isInStock = part.status === "In Stock";

  return (
    <div
      onClick={() => onClick(part)}
      className="flex items-center h-[60px] px-4 border-b border-slate-100 active:bg-slate-50 cursor-pointer transition-colors bg-white"
    >
      {/* Thumbnail */}
      <div className="w-10 h-10 rounded bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
        <img
          src={part.images[0]}
          alt={part.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Info */}
      <div className="flex-grow ml-3 min-w-0">
        <div className="flex items-center gap-1.5">
          <h3 className="text-sm font-bold text-slate-900 truncate">
            {part.name}
          </h3>
          <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded font-bold uppercase tracking-tight">
            {part.brand}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-indigo-600 font-bold">
            {part.oem}
          </span>
          <span className="text-[10px] text-slate-400 truncate">
            {part.category}
          </span>
        </div>
      </div>

      {/* Price & Status */}
      <div className="text-right flex-shrink-0 ml-2">
        <div className="text-sm font-bold text-slate-900">
          ${part.price.toFixed(2)}
        </div>
        <div
          className={`text-[10px] font-bold flex items-center justify-end gap-1 ${isInStock ? "text-emerald-600" : "text-rose-500"}`}
        >
          {isInStock ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
          {isInStock ? "IN STOCK" : "OUT"}
        </div>
      </div>

      <ChevronRight size={16} className="text-slate-300 ml-2" />
    </div>
  );
};

const BottomSheet: React.FC<{
  part: PartItem | null;
  onClose: () => void;
  onInquirySubmit: (
    inquiry: Omit<Inquiry, "id" | "timestamp" | "status">,
  ) => void;
}> = ({ part, onClose, onInquirySubmit }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    if (part) {
      setQuantity(1);
      setActiveImage(0);
      setShowForm(false);
      setCustomerName("");
      setCustomerPhone("");
    }
  }, [part]);

  if (!part) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    onInquirySubmit({
      partId: part.id,
      partName: part.name,
      brand: part.brand,
      oem: part.oem,
      quantity,
      customerName,
      customerPhone,
    });

    // Generate WhatsApp link
    const businessName = "AutoPart Pro Wholesale";
    const message =
      `*📦 NEW INQUIRY - ${businessName}*\n` +
      `----------------------------------\n` +
      `*Part:* ${part.name}\n` +
      `*OEM:* ${part.oem}\n` +
      `*Brand:* ${part.brand}\n` +
      `*Qty:* ${quantity} units\n` +
      `*Fitment:* ${part.fitment}\n\n` +
      `*👤 CUSTOMER DETAILS*\n` +
      `*Name:* ${customerName}\n` +
      `*Phone:* ${customerPhone}\n` +
      `----------------------------------\n` +
      `_Please confirm availability and wholesale pricing._`;

    const url = `https://wa.me/+971505715704?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {part && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[60] max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            {/* Handle */}
            <div className="w-full flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-slate-200 rounded-full" />
            </div>

            <div className="px-6 pb-8">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded uppercase tracking-wider">
                      {part.brand}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      OEM: {part.oem}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                    {part.name}
                  </h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 bg-slate-100 rounded-full text-slate-500 active:scale-90 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>

              {!showForm ? (
                <>
                  {/* Gallery */}
                  <div className="mb-6">
                    <div className="aspect-video rounded-2xl bg-slate-100 overflow-hidden mb-3 border border-slate-100">
                      <img
                        src={
                          part.images[activeImage] ||
                          "https://picsum.photos/seed/placeholder/800/600"
                        }
                        alt={part.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                      {part.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImage(idx)}
                          className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                            activeImage === idx
                              ? "border-indigo-600"
                              : "border-transparent opacity-60"
                          }`}
                        >
                          <img
                            src={img}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-6 mb-8">
                    <section>
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                        <Car size={14} /> Vehicle Compatibility
                      </h3>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-700 font-medium leading-relaxed">
                        {part.fitment}
                      </div>
                    </section>

                    <div className="grid grid-cols-2 gap-4">
                      <section>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Cross-Reference
                        </h3>
                        <div className="space-y-1">
                          {part.crossReference.map((ref) => (
                            <div
                              key={ref}
                              className="text-xs font-mono text-slate-600 flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100"
                            >
                              {ref}{" "}
                              <Clipboard size={10} className="text-slate-300" />
                            </div>
                          ))}
                        </div>
                      </section>
                      <section>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                          Category
                        </h3>
                        <div className="p-2 bg-indigo-50 text-indigo-700 text-xs font-bold rounded border border-indigo-100 text-center">
                          {part.category}
                        </div>
                      </section>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-100 flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Wholesale Price
                      </span>
                      <span className="text-2xl font-bold text-slate-900">
                        ${part.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex-grow flex items-center gap-3">
                      <div className="flex items-center bg-slate-100 rounded-xl p-1">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-90 transition-transform"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm active:scale-90 transition-transform"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          const text = `Check out this part: ${part.name} (OEM: ${part.oem}) at AutoPart Pro!`;
                          navigator.clipboard.writeText(text);
                          alert("Link copied to clipboard!");
                        }}
                        className="p-3.5 bg-slate-100 text-slate-600 rounded-xl active:scale-90 transition-transform"
                        title="Share to Colleague"
                      >
                        <Share2 size={18} />
                      </button>

                      <button
                        onClick={() => setShowForm(true)}
                        className="flex-grow flex items-center justify-center gap-2 bg-emerald-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                      >
                        <MessageCircle size={18} />
                        Request
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Requesting: {part.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Quantity: {quantity} units • Total: $
                      {(part.price * quantity).toFixed(2)}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          required
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                        WhatsApp Number
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                          size={18}
                        />
                        <input
                          required
                          type="tel"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="+971 XX XXX XXXX"
                          className="w-full pl-10 pr-4 py-3 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-grow py-4 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm active:scale-95 transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                    >
                      <MessageCircle size={18} />
                      Send Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AdminDashboard: React.FC<{
  inquiries: Inquiry[];
  onUpdateStatus: (id: string, status: Inquiry["status"]) => void;
}> = ({ inquiries, onUpdateStatus }) => {
  const handleReply = (inquiry: Inquiry) => {
    const message =
      `*✅ ORDER ACCEPTED - AutoPart Pro*\n` +
      `----------------------------------\n` +
      `Hello *${inquiry.customerName}*,\n\n` +
      `We have accepted your request for:\n` +
      `*Item:* ${inquiry.partName}\n` +
      `*OEM:* ${inquiry.oem}\n` +
      `*Quantity:* ${inquiry.quantity} units\n\n` +
      `Our team is preparing the invoice. We will share the payment details shortly.\n\n` +
      `*Thank you for choosing AutoPart Pro!*`;

    const url = `https://wa.me/${inquiry.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onUpdateStatus(inquiry.id, "accepted");
  };

  const handleReject = (inquiry: Inquiry) => {
    const message =
      `*❌ INQUIRY UPDATE - AutoPart Pro*\n` +
      `----------------------------------\n` +
      `Hello *${inquiry.customerName}*,\n\n` +
      `Regarding your request for *${inquiry.partName}*,\n` +
      `Unfortunately, this item is currently out of stock or unavailable.\n\n` +
      `We will notify you once it becomes available. Sorry for the inconvenience.`;

    const url = `https://wa.me/${inquiry.customerPhone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    onUpdateStatus(inquiry.id, "rejected");
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Inquiry Manager
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage wholesale requests and WhatsApp replies
          </p>
        </div>
        <div className="flex flex-col items-end">
          <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-full shadow-lg shadow-indigo-200">
            {inquiries.length} REQUESTS
          </span>
        </div>
      </div>

      {inquiries.length === 0 ? (
        <div className="py-32 flex flex-col items-center justify-center text-slate-300 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Clock size={40} className="opacity-20" />
          </div>
          <p className="text-sm font-bold text-slate-400">
            No pending inquiries
          </p>
          <p className="text-[10px] uppercase tracking-widest mt-1">
            Waiting for customers...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries
            .sort((a, b) => b.timestamp - a.timestamp)
            .map((inquiry) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={inquiry.id}
                className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Status Bar */}
                <div
                  className={`h-1.5 w-full ${
                    inquiry.status === "accepted"
                      ? "bg-emerald-500"
                      : inquiry.status === "rejected"
                        ? "bg-rose-500"
                        : "bg-amber-400"
                  }`}
                />

                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-tighter">
                          {inquiry.brand}
                        </span>
                        <span className="text-[10px] font-mono text-indigo-600 font-bold">
                          {inquiry.oem}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base truncate">
                        {inquiry.partName}
                      </h3>
                    </div>
                    <div
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        inquiry.status === "accepted"
                          ? "bg-emerald-50 text-emerald-600"
                          : inquiry.status === "rejected"
                            ? "bg-rose-50 text-rose-600"
                            : "bg-amber-50 text-amber-600"
                      }`}
                    >
                      {inquiry.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="space-y-1">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Customer
                      </span>
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-slate-400" />
                        <p className="text-xs font-bold text-slate-700 truncate">
                          {inquiry.customerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={12} className="text-slate-400" />
                        <p className="text-[11px] text-slate-500 font-medium">
                          {inquiry.customerPhone}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Order Details
                      </span>
                      <div className="flex items-center gap-2">
                        <ShoppingBag size={12} className="text-slate-400" />
                        <p className="text-xs font-bold text-slate-700">
                          Qty: {inquiry.quantity} Units
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={12} className="text-slate-400" />
                        <p className="text-[10px] text-slate-500 font-medium">
                          {new Date(inquiry.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          • {new Date(inquiry.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const text = `Order Details:\nPart: ${inquiry.partName}\nOEM: ${inquiry.oem}\nQty: ${inquiry.quantity}\nCustomer: ${inquiry.customerName}\nPhone: ${inquiry.customerPhone}`;
                        navigator.clipboard.writeText(text);
                      }}
                      className="p-3 bg-slate-100 text-slate-500 rounded-xl active:scale-95 transition-all"
                      title="Copy Details"
                    >
                      <Clipboard size={16} />
                    </button>
                    <button
                      onClick={() => handleReply(inquiry)}
                      className="flex-[2] flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 rounded-xl text-xs font-black shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                    >
                      <Check size={16} />
                      Accept & Reply
                    </button>
                    <button
                      onClick={() => handleReject(inquiry)}
                      className="flex-grow flex items-center justify-center gap-2 bg-slate-100 text-slate-500 py-3 rounded-xl text-xs font-bold active:scale-95 transition-all"
                    >
                      <X size={16} />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [search, setSearch] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartItem | null>(null);
  const [viewMode, setViewMode] = useState<"user" | "admin">("user");
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load inquiries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("autopart_inquiries");
    if (saved) {
      setInquiries(JSON.parse(saved));
    }
  }, []);

  // Save inquiries to localStorage
  const saveInquiries = (newInquiries: Inquiry[]) => {
    setInquiries(newInquiries);
    localStorage.setItem("autopart_inquiries", JSON.stringify(newInquiries));
  };

  const handleInquirySubmit = (
    data: Omit<Inquiry, "id" | "timestamp" | "status">,
  ) => {
    const newInquiry: Inquiry = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      status: "pending",
    };
    saveInquiries([...inquiries, newInquiry]);
  };

  const handleUpdateStatus = (id: string, status: Inquiry["status"]) => {
    const updated = inquiries.map((iq) =>
      iq.id === id ? { ...iq, status } : iq,
    );
    saveInquiries(updated);
  };

  const filteredParts = useMemo(() => {
    return AUTO_PARTS_DATA.filter((part) => {
      const matchesSearch =
        part.name.toLowerCase().includes(search.toLowerCase()) ||
        part.oem.toLowerCase().includes(search.toLowerCase()) ||
        part.brand.toLowerCase().includes(search.toLowerCase());

      const matchesStock = !inStockOnly || part.status === "In Stock";

      return matchesSearch && matchesStock;
    });
  }, [search, inStockOnly]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Settings2 size={18} />
              </div>
              <h1 className="text-lg font-extrabold tracking-tight">
                AutoPart Pro
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setViewMode(viewMode === "user" ? "admin" : "user")
                }
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                  viewMode === "admin"
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {viewMode === "admin" ? (
                  <ShieldCheck size={14} />
                ) : (
                  <LayoutDashboard size={14} />
                )}
                {viewMode === "admin" ? "ADMIN MODE" : "ADMIN LOGIN"}
              </button>
            </div>
          </div>

          {viewMode === "user" && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Part Name or OEM #..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 font-medium"
                  />
                </div>
                <button className="px-4 bg-white border border-slate-200 rounded-xl text-slate-600 flex items-center gap-2 text-sm font-bold shadow-sm active:scale-95 transition-all">
                  <Filter size={16} />
                  <span className="hidden sm:inline">Vehicle</span>
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-grow">
                  <Scan
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={14}
                  />
                  <input
                    type="text"
                    disabled
                    placeholder="Search by VIN (Scan coming soon)"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-[11px] text-slate-400 cursor-not-allowed italic"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    In Stock
                  </span>
                  <button
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${inStockOnly ? "bg-emerald-500" : "bg-slate-200"}`}
                  >
                    <motion.div
                      animate={{ x: inStockOnly ? 22 : 2 }}
                      className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        {viewMode === "user" ? (
          <div className="bg-white">
            {filteredParts.length > 0 ? (
              filteredParts.map((part) => (
                <DenseRow key={part.id} part={part} onClick={setSelectedPart} />
              ))
            ) : (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400 px-6 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-slate-900 font-bold mb-1">
                  No parts found
                </h3>
                <p className="text-xs">
                  Try searching for a different OEM number or brand.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setInStockOnly(false);
                  }}
                  className="mt-4 text-indigo-600 text-xs font-bold"
                >
                  Clear all filters
                </button>
              </div>
            )}
            <div className="p-4 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Showing {filteredParts.length} of {AUTO_PARTS_DATA.length} items
              </p>
            </div>
          </div>
        ) : (
          <AdminDashboard
            inquiries={inquiries}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>

      {/* Item Detail Sheet */}
      <BottomSheet
        part={selectedPart}
        onClose={() => setSelectedPart(null)}
        onInquirySubmit={handleInquirySubmit}
      />

      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 px-6 py-3 flex justify-between items-center z-40">
        {[
          {
            icon: ShoppingBag,
            label: "Store",
            active: viewMode === "user",
            onClick: () => setViewMode("user"),
          },
          {
            icon: LayoutDashboard,
            label: "Admin",
            active: viewMode === "admin",
            onClick: () => setViewMode("admin"),
          },
          {
            icon: MessageCircle,
            label: "Orders",
            active: false,
            onClick: () => {},
          },
          { icon: User, label: "Profile", active: false, onClick: () => {} },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={item.onClick}
            className={`flex flex-col items-center gap-1 transition-colors ${item.active ? "text-indigo-600" : "text-slate-400"}`}
          >
            <item.icon size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
