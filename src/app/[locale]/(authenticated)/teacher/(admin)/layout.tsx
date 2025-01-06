import { auth } from "@/lib/auth/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
    const { user } = await auth()

    if (!user || !user.is_admin)
        notFound()

    return <>
        {children}
    </>

};

export default AdminLayout
