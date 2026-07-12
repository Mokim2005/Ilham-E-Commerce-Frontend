"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSummary } from "@/components/dashboard/dashboard-summary";
import { ProfileForm } from "@/components/dashboard/profile-form";
import { ChangePasswordForm } from "@/components/dashboard/change-password-form";
import { SavedAddresses } from "@/components/dashboard/saved-addresses";
import { currentUser } from "@/lib/mock-data/current-user";

export default function DashboardPage() {
  return (
    <section className="bg-paper py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 lg:px-8">
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-teal">
            My Account
          </p>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Welcome, {currentUser.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {currentUser.email}
          </p>
        </div>

        <DashboardSummary />

        <div className="mt-8">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6 h-auto w-full justify-start gap-1 rounded-full border border-rule bg-transparent p-1 sm:w-auto">
              <TabsTrigger
                value="profile"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
              >
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                value="addresses"
                className="rounded-full px-5 py-2 text-sm font-medium data-[state=active]:bg-ink data-[state=active]:text-white"
              >
                Addresses
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="rounded-xl border border-rule bg-card p-6">
                <h2 className="mb-4 font-serif text-lg font-bold text-ink">
                  Profile Information
                </h2>
                <ProfileForm />
              </div>
            </TabsContent>

            <TabsContent value="password">
              <div className="rounded-xl border border-rule bg-card p-6">
                <h2 className="mb-4 font-serif text-lg font-bold text-ink">
                  Change Password
                </h2>
                <ChangePasswordForm />
              </div>
            </TabsContent>

            <TabsContent value="addresses">
              <div className="rounded-xl border border-rule bg-card p-6">
                <h2 className="mb-4 font-serif text-lg font-bold text-ink">
                  Saved Addresses
                </h2>
                <SavedAddresses />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
