export interface Friend {
    public_id: string;
    img_src: string;
    name: string;
}

export interface FriendRequest {
    public_id: string;
    from_user: string;
    from_user_name: string;
    to_user: string;
    to_user_name: string;
    status: "pending" | "accepted" | "rejected";
    created_at: string;
}