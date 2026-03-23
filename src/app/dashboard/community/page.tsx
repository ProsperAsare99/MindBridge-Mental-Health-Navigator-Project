import CommunityHub from "@/components/social/CommunityHub";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Community | MindBridge',
    description: 'Connect with your peers in a safe and anonymous space.',
};

export default function CommunityPage() {
    return (
        <div className="container py-6">
            <CommunityHub />
        </div>
    );
}
