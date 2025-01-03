import { redirect } from 'next/navigation'

export default function RequestsPage() {
    // Nothing to display on this page, so redirect to the feedbacks page
    redirect('/teacher/requests/feedbacks')
}

