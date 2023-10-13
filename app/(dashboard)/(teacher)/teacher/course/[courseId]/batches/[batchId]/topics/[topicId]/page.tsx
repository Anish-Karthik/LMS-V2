import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, FileIcon, LayoutDashboard, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { TopicTitleForm } from "./_components/topic-title-form";
import { TopicDescriptionForm } from "./_components/topic-description-form";
import { TopicAccessForm } from "./_components/topic-access-form";
import { TopicVideoForm } from "./_components/topic-video-form";
import { TopicActions } from "./_components/topic-actions";
import { AttachmentForm } from "./_components/attachment-form";

const topicIdPage = async ({
  params
}: {
  params: { courseId: string; batchId:string; topicId: string; }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const topic = await db.topic.findUnique({
    where: {
      id: params.topicId,
    },
    include: {
      muxData: true,
    },
  });
  const topicWithAttachments = await db.topic.findUnique({
    where: {
      id: params.topicId,
    },
    include: {
      attachments: true,
    },
  });


  if (!topic || !topicWithAttachments) {
    return redirect("/")
  }

  const requiredFields = [
    topic.title,
    topic.description,
    topic.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!topic.isPublished && (
        <Banner
          variant="warning"
          label="This topic is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/teacher/course/${params.courseId}/batches/${params.batchId}/`}
              className="mb-6 flex items-center text-sm transition hover:opacity-75"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to batch setup
            </Link>
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Topic Creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <TopicActions
                disabled={!isComplete}
                batchId={params.batchId}
                topicId={params.topicId}
                courseId={params.courseId}
                isPublished={topic.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your Topic
                </h2>
              </div>
              <TopicTitleForm
                initialData={topic}
                batchId={params.batchId}
                topicId={params.topicId}
              />
              <TopicDescriptionForm
                initialData={topic}
                batchId={params.batchId}
                topicId={params.topicId}
              />
            </div>
            {/* <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Access Settings
                </h2>
              </div>
              <TopicAccessForm
                initialData={topic}
                batchId={params.batchId}
                topicId={params.topicId}
              />
            </div> */}
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={FileIcon} />
                <h2 className="text-xl">
                  Resources & Attachments
                </h2>
              </div>
              <AttachmentForm
                initialData={topicWithAttachments}
                topicId={topic.id}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Add a video
              </h2>
            </div>
            <TopicVideoForm
              initialData={topic}
              topicId={params.topicId}
              batchId={params.batchId}
            />
          </div>
          
        </div>
      </div>
    </>
   );
}
 
export default topicIdPage;