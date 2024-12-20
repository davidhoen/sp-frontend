import { ReactNode } from 'react';

// These tags are available
type Tag = 'user' | 'skill';

type Props = {
    children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode
};

export default function RichText({ children }: Props) {
    return (
        <div className="prose">
            {children({
                user: (chunks: ReactNode) => <b className="font-semibold">{chunks}</b>,
                skill: (chunks: ReactNode) => <b className="font-semibold text-primary">{chunks}</b>,
            })}
        </div>
    );
}