import { DashboardPage } from "@/components/dashboard-page"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { PlusIcon } from "lucide-react"
import { redirect } from "next/navigation"
import React from "react"
import DashboardPageContent from "./dashboard-page-content"
import { CreateEventCategoryModal } from "@/components/create-event-category-modal"

export default async function Page() {
  const auth = await currentUser()
  if (!auth) {
    redirect("/sign-in")
  }
  const user = await db.user.findUnique({
    where: {
      externalId: auth.id,
    },
  })

  if (!user) {
    redirect("/welcome")
  }
  return (
    <>
      <DashboardPage
        cta={
            <CreateEventCategoryModal>
              <Button className="w-full sm:w-fit">
                <PlusIcon className="size-4 mr-2" />
                Add Category
              </Button>
            </CreateEventCategoryModal>
          }
          title="Dashboard"
       
      >
        <DashboardPageContent/>

      </DashboardPage>
    </>
  )
}
