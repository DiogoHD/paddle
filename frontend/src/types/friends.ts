export interface FriendshipRequest {
    public_id: string;
    from_user: string;
    from_user_name: string;
    from_user_img_src: string | null;
    to_user: string;
    to_user_name: string;
    to_user_img_src: string | null;
    user_public_id: string;
    status: "pending" | "accepted" | "rejected";
    created_at: string;
}