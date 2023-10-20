"use client";
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Promo } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { RecentSales } from './recent-sales';
import { Button } from "@/components/ui/button";
import { useAuth } from '@clerk/nextjs';
import { PromoForm } from './promo-form';
import { redirect } from 'next/navigation';

const PromoPage = ({
  initialData,
  userRole,
}: {
  userRole: string;
  initialData: Promo[];
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const { userId } = useAuth();
  if(!userId) return redirect('/sign-up')

  return (
    <div>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle>Promo Code </CardTitle>
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a Promo
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
      {isCreating && (
        <PromoForm setIsCreating={setIsCreating} />
      )}
      {!isCreating && (
        <RecentSales promos={initialData} userRole={userRole}/>
      )}
      </CardContent>
    </div>
  )
}

export default PromoPage