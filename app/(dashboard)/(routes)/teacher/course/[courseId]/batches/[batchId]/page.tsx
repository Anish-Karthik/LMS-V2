import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import UserCard from '@/components/card/user-card';
import { getDefaultBatch } from "@/lib/actions/course.actions";

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
  const defaultBatchId = (await getDefaultBatch(courseId))?.id;

  if (!userId) {
    return redirect("/");
  }
  
  return (<>hi</>);
}
 
export default CourseIdPage;