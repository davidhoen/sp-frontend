import { isTeacherUser, shortStringToUuid } from "@/lib";
import { auth } from "@/lib/auth/server";
import { getGroup } from "@/lib/queries/server/queries";
import { notFound, redirect } from 'next/navigation'

export default async function GroupQRCode(props: { params: Promise<{ hash: string }> }) {
    const params = await props.params;
    const { user } = await auth()

    const uuid = shortStringToUuid(params.hash);

    const group = await getGroup(uuid);
    if (!group)
        notFound()

    if (!user) {
        return redirect(`/login?redirect=/qr/g/${params.hash}`)
    }

    if (isTeacherUser(user))
        return redirect(`/teacher/groups/${uuid}`)
    else
        return redirect(`/student/groups/${uuid}`)
}
