"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

interface Address {
  id: string;
  label: string;
  address: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: "addr-1",
    label: "Home",
    address: "House 12, Road 5, Banani, Dhaka 1213",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Office",
    address: "Level 5, ABC Building, Gulshan 1, Dhaka 1212",
    isDefault: false,
  },
];

export function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newAddress, setNewAddress] = useState("");

  function handleAdd() {
    if (!newLabel.trim() || !newAddress.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setAddresses((prev) => [
      ...prev,
      {
        id: `addr-${Date.now()}`,
        label: newLabel.trim(),
        address: newAddress.trim(),
        isDefault: false,
      },
    ]);
    setNewLabel("");
    setNewAddress("");
    setShowForm(false);
    toast.success("Address added");
  }

  function handleDelete(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  }

  function handleSetDefault(id: string) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id })),
    );
  }

  return (
    <div className="space-y-4">
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="flex items-start justify-between rounded-lg border border-rule bg-muted/50 p-4"
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-ink">{addr.label}</p>
              {addr.isDefault && (
                <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
                  Default
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{addr.address}</p>
            {!addr.isDefault && (
              <button
                onClick={() => handleSetDefault(addr.id)}
                className="mt-2 text-xs text-teal hover:underline"
              >
                Set as default
              </button>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => handleDelete(addr.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      {showForm ? (
        <div className="rounded-lg border border-rule bg-card p-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="addr-label">Label</Label>
            <Input
              id="addr-label"
              placeholder="e.g. Home, Office"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="addr-text">Address</Label>
            <Input
              id="addr-text"
              placeholder="Full address"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="bg-teal text-white hover:bg-teal-light" onClick={handleAdd}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          className="w-full border-dashed border-rule"
          onClick={() => setShowForm(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Address
        </Button>
      )}
    </div>
  );
}
