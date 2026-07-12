"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const deliverySchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(11, "Valid phone number required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  deliveryOption: z.enum(["standard", "express"]),
});

export type DeliveryFormData = z.infer<typeof deliverySchema>;

interface DeliveryFormProps {
  onChange: (data: DeliveryFormData) => void;
}

export function DeliveryForm({ onChange }: DeliveryFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<DeliveryFormData>({
    resolver: zodResolver(deliverySchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "Dhaka",
      deliveryOption: "standard",
    },
    mode: "onChange",
  });

  // Watch all fields and notify parent on change
  const watchAll = watch();
  const prevRef = { current: "" };
  const current = JSON.stringify(watchAll);
  if (current !== prevRef.current) {
    prevRef.current = current;
    const result = deliverySchema.safeParse(watchAll);
    if (result.success) {
      onChange(result.data);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="font-serif text-lg font-bold text-ink">Delivery Details</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="del-name">Full Name</Label>
          <Input id="del-name" placeholder="Tanvir Hasan" {...register("name")} />
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="del-phone">Phone Number</Label>
          <Input id="del-phone" placeholder="01712345678" {...register("phone")} />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="del-address">Delivery Address</Label>
        <Input id="del-address" placeholder="House 12, Road 5, Banani" {...register("address")} />
        {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="del-city">City</Label>
        <Input id="del-city" placeholder="Dhaka" {...register("city")} />
        {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Delivery Option</Label>
        <RadioGroup defaultValue="standard" className="flex gap-4" onValueChange={(v) => {
          // Trigger re-render by updating the form
          const event = new Event("input", { bubbles: true });
          document.querySelector('input[name="deliveryOption"][value="' + v + '"]')?.dispatchEvent(event);
        }}>
          <label className="flex items-center gap-2 rounded-lg border border-rule bg-card px-4 py-3 cursor-pointer has-[:checked]:border-teal has-[:checked]:bg-teal/5">
            <RadioGroupItem value="standard" id="del-standard" />
            <div>
              <p className="text-sm font-medium text-ink">Standard (3–5 days)</p>
              <p className="text-xs text-muted-foreground">৳60 — Free over ৳2,000</p>
            </div>
          </label>
          <label className="flex items-center gap-2 rounded-lg border border-rule bg-card px-4 py-3 cursor-pointer has-[:checked]:border-teal has-[:checked]:bg-teal/5">
            <RadioGroupItem value="express" id="del-express" />
            <div>
              <p className="text-sm font-medium text-ink">Express (1–2 days)</p>
              <p className="text-xs text-muted-foreground">৳120</p>
            </div>
          </label>
        </RadioGroup>
        <input type="hidden" {...register("deliveryOption")} />
      </div>
    </div>
  );
}
