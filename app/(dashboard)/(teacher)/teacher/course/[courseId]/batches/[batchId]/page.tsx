import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UserCard from '@/components/card/user-card';
import { getDefaultBatch } from "@/lib/actions/course.actions";
import { getBatchById, swapUserBatch } from "@/lib/actions/batch.action";
import UsersList from "./_components/users-list";
import Image from "next/image";
import { IconBadge } from "@/components/icon-badge";
import { ChaptersForm } from "./_components/chapters-form";
import { ListChecks } from "lucide-react";
import { getChaptersByBatchId } from "@/lib/actions/chapter.action";

const batchTabs = [
  { value: "students", label: "Students", icon: "/assets/members.svg" },
  { value: "teachers", label: "Teachers", icon: "/assets/members.svg" },
  { value: "details", label: "Details", icon: "/assets/edit.svg" },
];

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string, batchId: string }
}) => {
  const { userId } = auth();
  const { courseId, batchId } = params;
  const defaultBatch = await getDefaultBatch(courseId);
  const currentBatch = await getBatchById(batchId);
  if (!userId || !defaultBatch || !currentBatch) {
    return redirect("/");
  }
  const initialData = await getChaptersByBatchId(batchId);
  return (<>
    
    <Tabs defaultValue={`${batchTabs[0].value}`} className='w-full'>
      <TabsList className='tab'>
        {batchTabs.map((tab) => (
          <TabsTrigger key={tab.label} value={tab.value} className='tab' >
            <Image
              src={tab.icon}
              alt={tab.label}
              width={24}
              height={24}
              className='object-contain'
            />
            <p className='max-sm:hidden'>{tab.label}</p>

            {/* <p className='bg-light-4 !text-tiny-medium text-light-2 ml-1 rounded-sm px-2 py-1'>{userInfo[tab.value]?.length}</p> */}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent key={batchTabs[0].label} value={batchTabs[0].value} className='w-full'>
        {/* @ts-ignore */}
        <UsersList defaultBatch={defaultBatch} currentBatch={currentBatch} switchBatch={swapUserBatch} />
      </TabsContent>
      <TabsContent key={batchTabs[1].label} value={batchTabs[1].value} className='w-full'>
        {/* @ts-ignore */}
        {/* <UsersList defaultBatch={defaultBatch} currentBatch={currentBatch} switchBatch={swapUserBatch} /> */}
      </TabsContent>
      <TabsContent key={batchTabs[2].label} value={batchTabs[2].value} className='w-full'>
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={ListChecks} />
            <h2 className="text-xl">
              Course chapters
            </h2>
          </div>
          <ChaptersForm
            initialData={initialData}
            batchId={batchId}
            courseId={courseId}
          />
        </div>
      </TabsContent>
    </Tabs>
  </>);
}
 
export default CourseIdPage;


